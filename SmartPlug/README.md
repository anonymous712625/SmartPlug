# 🔌 SmartPlug — Smart Home, Smart Life

A modern, responsive product website for SmartPlug with:
- ✅ **Two CTAs**: WhatsApp contact + Purchase Now
- ✅ **Order form**: Name, Lebanese phone, city, street
- ✅ **Telegram bot notifications**: Get every order on your phone
- ✅ **Mobile-first responsive design**
- ✅ **Deploy on GitHub Pages** — works 24/7, no server needed

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Set Your WhatsApp Number

Open `index.html` and find this line near the bottom:

```javascript
const WHATSAPP_NUMBER = "961XXXXXXXX"; // ← Replace with your number
```

Replace `961XXXXXXXX` with your full WhatsApp number (country code + number, no `+` or spaces).
Example: `"96171123456"`

---

### Step 2: Get Your Telegram Chat ID

Your bot token is already configured. You just need your **Chat ID** so the bot knows where to send orders.

1. Open Telegram and search for your bot
2. **Send any message** to your bot (e.g. "hello")
3. Open this URL in your browser:
   ```
   https://api.telegram.org/bot8761769012:AAFMKjMBj4H26Wc15HUVcgil0Qgz4DZZ3Jc/getUpdates
   ```
4. You'll see JSON — find `"chat":{"id": 123456789}` — **copy that number**
5. In `index.html`, update this line:
   ```javascript
   const TELEGRAM_CHAT_ID = "123456789"; // ← Paste your Chat ID here
   ```

---

### Step 3: Deploy to GitHub Pages (Free, Always Online)

1. Push this code to your GitHub repository
2. Go to **Settings → Pages**
3. Set source to **"main" branch, root directory**
4. Your site will be live at: `https://yourusername.github.io/SmartPlug`

That's it! Your site is live 24/7, even when your laptop is off. 🎉

---

## 📱 Features

| Feature | Description |
|---------|-------------|
| 🟢 WhatsApp Button | Direct chat link with pre-filled message |
| 🛒 Purchase Form | Collects name, phone, city, street, quantity |
| 📱 Telegram Alerts | Instant notification for every order |
| 🇱🇧 Lebanese Focus | Lebanese cities, +961 phone format, $USD pricing |
| 📱 Responsive | Perfect on mobile, tablet, and desktop |
| ⚡ No Backend | Pure HTML/CSS/JS — works on GitHub Pages |
| 🎨 Modern Design | Clean, professional, animated |

---

## 🏗️ Local Development

```bash
cd SmartPlug
python3 -m http.server 8080
# Open http://localhost:8080
```

---

## 🔧 Customization

### Change Price
Search for `$25` in `index.html` and update all occurrences.

### Add/Remove Cities
Find the `<select id="city">` section and add/remove `<option>` tags.

### Change Colors
Edit the CSS variables at the top of the `<style>` block:
```css
:root {
    --primary: #2563eb;      /* Main blue */
    --accent: #10b981;       /* Green */
    --whatsapp: #25D366;     /* WhatsApp green */
}
```

### Change Product Images
Replace the plug icon section with an `<img>` tag pointing to your product photo.

---

## 📋 How Orders Work

1. Customer fills the form and clicks "Confirm Order"
2. The site sends the order details directly to Telegram via the Bot API
3. You receive a formatted message like:
   ```
   🛒 NEW ORDER — SmartPlug
   ━━━━━━━━━━━━━━━━━━
   👤 Name: Ahmad Khalil
   📱 Phone: +961 71 123 456
   🏙 City: Sidon (Saida)
   📍 Street: Main Street, near the mosque
   📦 Quantity: 2 unit(s)
   💰 Total: $50
   ━━━━━━━━━━━━━━━━━━
   🕐 8/10/2026, 3:45:00 PM
   ```
4. You contact the customer to confirm and arrange delivery

---

## 🔒 Security Note

The Telegram bot token is visible in the client-side code. For a small business website, this is acceptable — the worst someone could do is send messages to *your own bot*. If you're concerned:
- You can regenerate the bot token anytime via @BotFather
- For larger operations, consider adding a Cloudflare Worker as a proxy

---

## 📂 File Structure

```
SmartPlug/
├── index.html      ← The entire website (single file)
└── README.md       ← This file
```

Simple, clean, one file does everything.

---

## 🆘 Troubleshooting

**"Telegram messages not arriving"**
- Make sure you messaged the bot first
- Double-check your Chat ID
- Check browser console (F12) for errors

**"WhatsApp opens with wrong number"**
- Make sure the number format is: country code + number (no +, no spaces)
- Example: `96171123456` for a Lebanese number

**"Site looks wrong on mobile"**
- Make sure you're viewing the latest version
- Clear browser cache

---

Built with ❤️ for SmartPlug Lebanon
