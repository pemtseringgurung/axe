# Axe – Personal Spending Insight Tool

A lightweight web app that helps you understand why you spend the way you do. It combines a Next.js front‑end with a Python backend that uses **LangChain** and **LangGraph** to orchestrate calls to Google Gemini.

## Features
- **Spend analysis** – Enter an amount and a short description; the AI returns the underlying reason and behavioral triggers.
- **No impulsivity score** – Focus on qualitative insights, not a numeric rating.
- **Responsive UI** – Clean, modern design that works on desktop and mobile.
- **Secure config** – Secrets live in `.env.local` (git‑ignored) and are set in Vercel for production.
- **Powered by LangChain & LangGraph** – backend agent uses LangChain’s workflow engine to manage LLM calls.

## Getting Started
1. **Clone the repo**
   ```bash
   git clone https://github.com/pemtseringgurung/axe.git
   cd axe
   ```
2. **Install dependencies**
   ```bash
   # Front‑end
   npm install
   # Backend (Python 3.13+)
   pip install -r backend/requirements.txt
   ```
3. **Configure environment variables**
   Create a `.env.local` in the project root:
   ```text
   GOOGLE_API_KEY=your-google-gemini-key
   API_PROVIDER=google
   MODEL_NAME=gemini-2.5-flash
   ```
4. **Run the app**
   ```bash
   # Terminal 1
   npm run dev   # Next.js (http://localhost:3001)
   # Terminal 2
   python3 run_dev.py   # Flask API (http://localhost:8000/api/analyze)
   ```

Open the front‑end URL in a browser and start analyzing your spending.

## Deploying to Vercel
- Push to GitHub, connect the repo in Vercel.
- Add the same environment variables in Vercel’s settings.
- Vercel builds the Next.js app; the Flask API runs as a serverless function.

## Contributing
Feel free to open issues or submit pull requests. Keep the UI minimal and the backend focused on clear, human‑readable analysis.

## License
MIT – see the `LICENSE` file.
