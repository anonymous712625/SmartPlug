# SmartPlug — Landing page with WhatsApp + Buy Now (orders delivered to Telegram)

A single static page (`index.html`) with two actions:

- **Contact on WhatsApp** — opens a chat with your number.
- **Purchase Now** — opens an order form (full name, Lebanese mobile number, city, street). When a customer submits, the order is sent as a message to **your Telegram bot**, so you get every order instantly even when your laptop is off.

It is designed to run **100% on GitHub Pages** — no server needed.

---

## ⚠️ Two things you MUST do before it works

### 1. Enter your real Telegram chat ID (very important)

The **bot ID is NOT your chat ID.** `7574027479` is the bot itself — it cannot receive the order messages. You need **your personal numeric chat ID**. Here is the 30-second way to get it:

1. Open the bot on Telegram: `https://t.me/SmartPlugOrderBot` (or search your bot by username).
2. Press **Start** and send it any message, e.g. `hi`.
3. Open this in your browser, replacing `TOKEN` with your bot token:
   ```
   https://api.telegram.org/bot8761769012:AAFMKjMBj4H26Wc15HUVcgil0Qgz4DZZ3Jc/getUpdates
   ```
4. In the JSON result, look for `"chat":{"id":123456789,...}` — **copy that number** (the `id`).
5. In `index.html`, find this line and replace the value:
   ```js
   TELEGRAM_CHAT_ID: "YOUR_CHAT_ID_HERE",
   ```
   with your number, e.g.:
   ```js
   TELEGRAM_CHAT_ID: "123456789",
   ```

### 2. Enter your WhatsApp number

In `index.html`, find:
```js
WHATSAPP_NUMBER: "96170000000",
```
Replace with your number in international format **without `+` or spaces**, e.g. `96171234567`.

> You can also change `PRODUCT_NAME` and `PRODUCT_PRICE` on the same lines.

---

## How to put it live on GitHub Pages (no server, no workflows)

1. Put `index.html` on your `main` branch (rename it to `index.html` if it's still called `2 (5).html`).
2. On GitHub, open your repo → **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Set the branch to **`main`** and the folder to **`/` (root)**, then **Save**.
5. Your site goes live at `https://<your-username>.github.io/SmartPlug/` in about a minute.

That's it. GitHub Pages keeps running even when your laptop is off.

---

## 🔒 Important security note

Because this is a **fully static** GitHub Pages site, the Telegram **bot token is visible in the page source** to anyone who opens the site. That is the trade-off for "no server". If the token ever leaks or is misused:

- Open **BotFather** → `/revoke` → generate a new token.
- Replace the new token in `index.html` and re-push.

The order form itself does **not** store data anywhere — each order is sent directly to your Telegram chat and then forgotten.

---

## How the Telegram sending works

A browser cannot call the Telegram API directly from a static page (CORS blocks it). Instead, the page submits a hidden `<form>` (a plain HTML form POST) into a hidden `<iframe>` targeting `api.telegram.org/bot<TOKEN>/sendMessage`. Plain form submissions are not blocked by CORS, so the message reaches your bot — this is what makes it work with only GitHub Pages.

- Sends `chat_id` = your chat ID, `text` = the full order (name, phone, city, street, time).
- Because the cross-origin response can't be read on a static page, the site shows "Order sent!" immediately after submitting.

## Project layout

```
index.html  → the landing page + order form (edit CONFIG here)
README.md   → this file
```
