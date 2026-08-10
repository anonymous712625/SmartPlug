# SmartPlug site — order form + Telegram notifications

Your page now has two options in the pricing section (and the nav "Purchase" button):

- **Chat on WhatsApp** — opens WhatsApp like before.
- **Purchase Now** — opens a form (Full Name, Lebanese phone, City, Street). On submit, it
  sends the order straight to a Telegram chat using your bot, so you get it as a message
  instantly — even if your laptop is off — as long as the site itself is online somewhere
  (that's what GitHub Pages is for, see below).

There's no server involved: the page talks to Telegram directly from the visitor's browser.
That's what makes "always on" possible without you running anything, but it also means your
bot token lives in the page's source code (more on that in **Security note** below).

## 1. Get your Telegram Chat ID (one-time setup)

The bot token is already in the code. You still need the **chat ID** — the destination the
orders get sent to.

1. Open Telegram and search for your bot (the one tied to the token you gave me — you can
   confirm it's yours by messaging `/start` to it, or find it via @BotFather → *My Bots*).
2. Send it any message, e.g. `hi`.
3. In your browser, go to:
   `https://api.telegram.org/bot8761769012:AAFMKjMBj4H26Wc15HUVcgil0Qgz4DZZ3Jc/getUpdates`
4. You'll see JSON like this — look for `"chat":{"id":123456789, ...}`:
   ```json
   "message": { "chat": { "id": 123456789, "first_name": "You", ... } }
   ```
   That number (`123456789` in this example) is your **chat ID**.
   - If you want orders sent to a **group** instead of your personal chat, add the bot to
     the group first, send a message in the group, then repeat step 3 — group chat IDs are
     negative numbers (e.g. `-1001234567890`).
5. Open `index.html`, find this line near the bottom:
   ```js
   const TELEGRAM_CHAT_ID = "PASTE_YOUR_CHAT_ID_HERE"; // <-- replace this
   ```
   Replace `PASTE_YOUR_CHAT_ID_HERE` with the number from step 4, in quotes, e.g.
   `const TELEGRAM_CHAT_ID = "123456789";`

Until you do this, the "Purchase Now" button will still work but will show a message asking
the customer to use WhatsApp instead, so you won't lose orders in the meantime.

## 2. Put it on GitHub Pages (so it works even with your laptop off)

1. Create a new repository on GitHub (e.g. `smartplug-site`), and don't initialize it with a
   README (you already have one).
2. Upload `index.html` (and this `README.md`) to the repo — easiest way is drag-and-drop on
   the GitHub website ("Add file" → "Upload files"), or via git:
   ```bash
   git init
   git add index.html README.md
   git commit -m "SmartPlug site with Telegram orders"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/smartplug-site.git
   git push -u origin main
   ```
3. On GitHub, go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`,
   folder `/ (root)`, then **Save**.
5. After a minute or two, GitHub gives you a URL like:
   `https://YOUR_USERNAME.github.io/smartplug-site/`
6. That's your live site. Share that link (or connect a custom domain in the same Pages
   settings) — it's hosted by GitHub, not your computer, so orders keep coming in to
   Telegram whether your laptop is on or off.

Any time you edit `index.html` and push the change, GitHub Pages updates automatically
within a minute or two.

## 3. Testing it

1. Open the live GitHub Pages link (or just open `index.html` locally in a browser).
2. Click **Purchase Now**, fill in a test order, submit.
3. You should get a Telegram message within a second or two.
4. If nothing arrives: double-check `TELEGRAM_CHAT_ID`, and make sure you've actually
   messaged the bot at least once (Telegram won't deliver to a chat it has no record of).

## Security note (please read)

Because everything runs in the visitor's browser, your bot token is visible to anyone who
views the page source. In practice, the realistic risk is: someone could extract the token
and use it to send junk messages to your chat, or attach the bot elsewhere and message
chats it already knows about. They can't read your other Telegram chats or take over your
account.

For a small storefront like this, that's a reasonable, commonly-used tradeoff for the
simplicity of "no server to maintain." If it ever bothers you or you notice spam:

- Regenerate the token anytime via **@BotFather → /mybots → your bot → API Token → Revoke
  current token**, then update `TELEGRAM_BOT_TOKEN` in `index.html`.
- If you want the token fully hidden later, the standard fix is adding a small serverless
  function (e.g. a Cloudflare Worker or Vercel/Netlify function) that holds the token and
  the page calls that instead of Telegram directly — happy to help set that up if you want
  it down the line.
