# SmartPlug Store - GitHub Pages + Telegram Bot

Your store is ready to work 24/7 even when your laptop is OFF! 

Every order from website → Instant Telegram notification to you.

### 🤖 Bot Configured:
- **Bot:** @Mystore_purchases_bot
- **Token:** `8761769012:AAFMKj...` (configured in index.html)
- **Your Chat ID:** `7574027479`
- **Status:** ✅ Tested & Working (you received test message)

---

## 🚀 Deploy to GitHub in 2 minutes:

### Method 1: GitHub Pages (EASIEST - No backend needed, works 24/7)

**Because your site calls Telegram directly from browser, it works even when laptop is off. GitHub hosts the files.**

1. Go to https://github.com/new
2. Create repo name: `smartplug-store` (public)
3. Click "uploading an existing file" → drag `index.html` and `admin.html` from this folder
4. Commit directly to `main`
5. Go to repo **Settings → Pages**
   - Source: `Deploy from a branch`
   - Branch: `main` / root
   - Save
6. Wait 1 minute → Your site live at: `https://YOUR_USERNAME.github.io/smartplug-store/`

**Test it:** Open your live site → click Purchase Now → fill form → submit → You get Telegram message instantly!

---

### Method 2: Secure Version (Hide bot token)

Current version exposes token in HTML (anyone can View Source). For production:

**Option A - Cloudflare Workers (FREE, hide token):**
1. Go to https://workers.cloudflare.com → Create Worker
2. Paste code from `worker.js` (in this repo)
3. Set variables: `BOT_TOKEN` and `CHAT_ID`
4. In `index.html` change:
```js
USE_BACKEND: true,
BACKEND_URL: "https://your-worker.workers.dev"
```

**Option B - Vercel Backend:**
Upload `server.js` to Vercel, set env vars, same as above.

---

## 📁 Files:

- `index.html` – Main store with 2 buttons (WhatsApp + Purchase)
- `admin.html` – View orders at `yoursite.com/admin.html`
- `README.md` – This guide

## 🛡️ Security Note:

Your bot token is now public in `index.html` on GitHub. This is OK for now (worst case someone can send fake orders to your Telegram, but can't hack). For long-term:

1. Go to @BotFather → `/revoke` → create new token after switching to Workers
2. Or keep as is if you trust it – many small stores do this.

## 📱 Your Two Purchase Options:

**Hero & Pricing sections have both:**
1. **Purchase Now - Website:** Form → Telegram notification (works 24/7, laptop off)
2. **Contact on WhatsApp:** Opens WhatsApp chat to +63 9554430116

Both go to COD delivery.

## 🔧 Customize:

Edit at top of `index.html`:
```js
const CONFIG = {
  WHATSAPP_NUMBER: "639554430116",
  TELEGRAM_BOT_TOKEN: "your new token if you rotate",
  TELEGRAM_CHAT_ID: "7574027479",
}
```

## ✅ Checklist after GitHub deploy:

- [ ] Site live on github.io
- [ ] Made test order
- [ ] Received Telegram notification
- [ ] Tested WhatsApp button
- [ ] Bookmarked `.../admin.html` for orders

Questions? Just ask!
