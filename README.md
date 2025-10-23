
# Gibberish Guesser on Base

A funny, AI-powered word puzzle game simulating an on-chain experience on the Base network. Guess the real phrase from the gibberish!

**A Game by Zuobai**

---

![Gibberish Guesser Screenshot]([https://storage.googleapis.com/aistudio-hosting/generative-ai-app-builder/6a5f7e7d-7b24-4f1b-8b1b-88a9f24e9b73/gibberish-guesser-screenshot.png](https://i.postimg.cc/s24sCyRq/Screenshot-2025-10-23-112616.png))

## 📖 How to Play

**Gibberish Guesser** is a word puzzle game where you decipher a nonsensical phrase to find the real phrase it sounds like.

1.  **Connect Your Wallet:** Start by connecting your (simulated) wallet to get on the "Base network".
2.  **Read the Gibberish:** You'll be given a "gibberish" phrase. Read it out loud to hear what it sounds like.
3.  **Guess the Phrase:** Type your guess for the real phrase into the input box and hit submit.
    *   **Example:** The gibberish _"aisle of ewe"_ sounds like the real phrase _"I love you"_.
4.  **Use Your Wits (and Hints):** If you're stuck, you can use a hint or, as a last resort, reveal the answer.
5.  **Score and Streak:** Correct answers increase your score and your winning streak. Keep playing to set a new high score!

## ✨ Features

*   **🧠 AI-Powered Puzzles:** Infinite, unique puzzles generated in real-time by the Google Gemini API.
*   **🎚️ Dynamic Difficulty:** Use the slider to choose between **Easy**, **Medium**, and **Hard** puzzles. The game adapts instantly.
*   **🎨 Multiple Themes:** Select from **General**, **Movies**, **Science**, or **History** to tailor the puzzles to your interests.
*   **✍️ Create Your Own:** Feeling creative? Use the "Create Your Own Puzzle" feature to challenge yourself or your friends.
*   **📊 Stat Tracking:** The game tracks your games played, win percentage, high score, and current/longest streaks.
*   **🔊 Sound & Music:** An optional, retro-chiptune soundtrack adds to the "on-chain" vibe.
*   **📱 Fully Responsive:** Play on any device, from a desktop to a mobile phone.

## 🛠️ Developer Setup

To get this project running locally, follow these steps:

**1. Clone the Repository**

```bash
git clone <repository-url>
cd gibberish-guesser-on-base
```

**2. Install Dependencies**

This project uses `npm` to manage packages.

```bash
npm install
```

**3. Set Up Environment Variables**

The game requires a Google Gemini API key to function.

*   Create a file named `.env` in the root of the project.
*   Copy the contents of `.env.example` into your new `.env` file.
*   Replace `<YOUR_API_KEY>` with your actual Google Gemini API key.

Your `.env` file should look like this:

```
API_KEY=your_actual_google_gemini_api_key_here
```

**4. Run the Development Server**

```bash
npm start
```

This will start a local server, and you can view the application in your browser at `http://localhost:8080` (or another port if 8080 is in use).

## 💻 Tech Stack

*   **Frontend:** React, TypeScript
*   **Styling:** Tailwind CSS
*   **AI:** Google Gemini API
*   **Audio:** Web Audio API

## 📂 Project Structure

```
/
├── components/         # Reusable React components
├── services/           # Modules for external APIs (Gemini, Sound)
├── public/             # Static assets (if any)
├── App.tsx             # Main application component and state management
├── index.tsx           # Entry point for the React application
├── types.ts            # TypeScript type definitions
├── index.html          # Main HTML file
└── package.json        # Project dependencies and scripts
```
