// Cloudflare Worker - Secure Telegram Proxy (hides token)
// Deploy on https://workers.cloudflare.com (FREE)
// Set env vars: BOT_TOKEN and CHAT_ID in dashboard

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Use POST method', { status: 405, headers: corsHeaders });
    }

    try {
      const data = await request.json();
      const { telegramMessage, orderId, fullName, phone, city } = data;

      if (!telegramMessage) {
        return new Response(JSON.stringify({ ok: false, error: 'No message' }), 
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      // Your secrets from env
      const BOT_TOKEN = env.BOT_TOKEN || "8761769012:AAFMKjMBj4H26Wc15HUVcgil0Qgz4DZZ3Jc";
      const CHAT_ID = env.CHAT_ID || "7574027479";

      const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown'
        })
      });

      const tgData = await tgRes.json();

      if (!tgData.ok) {
        return new Response(JSON.stringify({ ok: false, telegram_error: tgData }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify({ ok: true, orderId, result: tgData.result.message_id }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    } catch (err) {
      return new Response(JSON.stringify({ ok: false, error: err.message }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
  }
}
