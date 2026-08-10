/**
 * SmartPlug Order → Telegram Worker
 * Deploy this on Cloudflare Workers (free tier). It runs 24/7 in the cloud,
 * so orders reach your Telegram bot even if your laptop/computer is off.
 *
 * The bot token is NOT in this file — it's stored as an encrypted Worker
 * secret (set with `wrangler secret put BOT_TOKEN`), so it never appears
 * in your GitHub repo or in the page source.
 */

const CHAT_ID = "7574027479"; // your Telegram chat/user ID
const ALLOWED_ORIGIN = "*"; // after deploying, replace with your real site URL, e.g. "https://yourname.github.io"

// Lebanese mobile number check: optional +961/00961/0 prefix, then 3, 7x or 8x, then 6 digits
const LB_PHONE_REGEX = /^(?:\+961|00961|0)?(3\d{6}|7[01346789]\d{6}|8[1389]\d{6})$/;

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders() });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      });
    }

    const fullName = (data.fullName || "").toString().trim();
    const phone = (data.phone || "").toString().trim();
    const city = (data.city || "").toString().trim();
    const street = (data.street || "").toString().trim();

    // Basic validation
    if (!fullName || fullName.length < 2) {
      return jsonError("Please enter your full name.");
    }
    if (!LB_PHONE_REGEX.test(phone.replace(/[\s-]/g, ""))) {
      return jsonError("Please enter a valid Lebanese phone number.");
    }
    if (!city) {
      return jsonError("Please enter your city.");
    }
    if (!street) {
      return jsonError("Please enter your street/address.");
    }

    const orderTime = new Date().toISOString();

    const message =
      `🛒 <b>New SmartPlug Order</b>\n\n` +
      `👤 <b>Name:</b> ${escapeHtml(fullName)}\n` +
      `📱 <b>Phone:</b> ${escapeHtml(phone)}\n` +
      `🏙 <b>City:</b> ${escapeHtml(city)}\n` +
      `🏠 <b>Street:</b> ${escapeHtml(street)}\n` +
      `💵 <b>Price:</b> $10 (Cash on Delivery)\n` +
      `🕒 <b>Time (UTC):</b> ${orderTime}`;

    const tgUrl = `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`;

    const tgResp = await fetch(tgUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!tgResp.ok) {
      const errText = await tgResp.text();
      return new Response(
        JSON.stringify({ ok: false, error: "Failed to notify Telegram", detail: errText }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders() } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  },
};

function jsonError(msg) {
  return new Response(JSON.stringify({ ok: false, error: msg }), {
    status: 400,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}
