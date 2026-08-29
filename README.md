# Keepsake 

**Keepsake** is a lightweight, single-file web application built for people who want to track special dates (birthdays, anniversaries, Onam, Vishu) and custom tasks without ever missing them. It features a built-in redemption score, countdown timers, panic alerts for upcoming dates, and automated AI-powered gift suggestions and greeting message generation.

## Features

- **Countdown & Hero Tracker:** Instantly view how many days are left until your next important milestone.
- **Redemption Score & Streak:** Earn points for planning ahead and keeping your streak alive.
- **Panic Alert System:** Highlights urgent events happening today or tomorrow so you can act quickly.
- **Secure AI Integration:**Uses Vercel Serverless Functions (/api/gemini) to securely query Google's Gemini 1.5 Flash model for custom gift ideas and WhatsApp greeting drafts without exposing API keys to the browser..
- **Zero Framework Bloat:** Built with plain HTML, Tailwind CSS, and vanilla JavaScript.

## Project Structure

keepsake-app/
├── index.html
└── api/
    └── gemini.js
