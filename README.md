# Keepsake (ഓർമ്മപ്പെട്ടി — Ormappetti)

**Keepsake** is a culturally-rooted, single-file web application designed to help you stay ahead of special dates, family birthdays, and Kerala festivals without the last-minute scramble. Featuring a traditional Kasavu-and-brass aesthetic, it combines gamified accountability, festive checklists, emergency action banners, and Google Gemini-powered gifting and greeting suggestions.

---

## Core Features

* **Countdown & Hero Tracker:** Real-time countdown displaying days remaining until your next upcoming milestone.
* **Emergency Mode (Panic Alert):** Automatically surfaces high-priority alerts for events within 24 hours, equipped with 1-click local flower/cake delivery search and automated WhatsApp family broadcast coordination.
* **Kerala Festival Pack & Nakshatram Support:** 1-click calendar sync for major Kerala celebrations (Thiruvonam, Vishu, Attukal Pongala, Thrissur Pooram, Christmas, Eid) with Malayalam birth star (*Nakshatram*) selection from Aswathi to Revathi.
* **Sadhya & Festival Prep Checklist:** Built-in interactive checklist covering essential traditional preparations (clean plantain banana leaves, payasam ingredients, fresh mullapoo, pressed kasavu attire, and polished nilavilakku).
* **Budget Dashboard & Redemption System:** Tracks planned gift budgets across all events while awarding points on a gamified "Redemption Score" tier (*Sleeping on Sofa* → *Good Husband* → *Mahabali Level*) with streak tracking.
* **Tone-Adaptive Wishes:** Drafts context-aware greetings in *Casual / Nadan*, *Respectful / Elders*, or *Playful / Teasing* tones with 1-tap WhatsApp sharing.
* **Data Privacy & Offline PWA:** Complete local data ownership with 1-click JSON backup export/restore and a lightweight Service Worker (`sw.js`) for fast offline loading.

---

## ⚠️ AI Setup & Free Quota Notice

The AI gift and greeting features rely on Google's Gemini free-tier API (`gemini-3.6-flash`), which comes with a few constraints:

* **Requires an API Key:** If you fork or self-host this project, the AI **will not work** out-of-the-box. You must add `GEMINI_API_KEY` to your Vercel Environment Variables.
* **Free Tier Rate Limits (429):** Google enforces a limit of **15 requests per minute** on free keys. Rapid spam-clicking will trigger rate limits.
* **Capacity Overload (503):** During periods of high server demand, Google may drop requests temporarily.
* **Fail-Safe Fallbacks:** When the Gemini API is rate-limited, unreachable, or missing, Keepsake automatically catches the error and serves built-in curated Kerala cultural recommendations instead of breaking.

---

## Tech Stack

* **Frontend:** Vanilla JavaScript (ES6+), HTML5, Tailwind CSS
* **Design & Typography:** Kerala Kasavu borders, deep forest green and warm brass palette, Fraunces serif and Inter typefaces
* **Backend:** Vercel Serverless Functions (Node.js `/api/gemini.js`)
* **AI Provider:** Google Gemini API (`gemini-3.6-flash`)
* **Live Deployment:** [keepsakekerala.vercel.app](https://keepsakekerala.vercel.app)

## Structure
keepsake/
├── keepsake-app/
│   ├── index.html      ← Replace with downloaded file
│   ├── sw.js           ← Replace with downloaded file
│   ├── manifest.json   ← Replace with downloaded file
│   ├── package.json    ← Replace with downloaded file
│   └── api/
│       └── gemini.js   ← Replace with downloaded file
└── README.md
