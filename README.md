# Axe

Axe is a behavioral spending analysis tool designed to uncover the psychological drivers behind financial decisions. Unlike traditional budgeting apps that track *what* you spend, Axe explains *why*, using AI to identify behavioral triggers and provide actionable insights.

## Overview

The application moves beyond simple expense tracking by focusing on qualitative analysis. It replaces arbitrary "impulsivity scores" with detailed psychological profiling, helping users understand their spending patterns without judgment.

## Technical Architecture

The system consists of a modern web frontend and an intelligent agentic backend:

*   **Frontend:** Next.js (React) for a responsive, high-performance UI.
*   **Backend:** Python (Flask) serving as the API layer.
*   **AI Agent:** Built with **LangChain** and **LangGraph** to orchestrate complex reasoning workflows.
*   **Model:** Powered by **Google Gemini** (`gemini-2.5-flash`) for deep semantic analysis.

## Getting Started

### Prerequisites
*   Node.js & npm
*   Python 3.13+
*   Google Gemini API Key

### Installation

1.  **Frontend Setup**
    ```bash
    npm install
    npm run dev
    ```
    The application will run on `http://localhost:3001`.

2.  **Backend Setup**
    ```bash
    pip install -r backend/requirements.txt
    python3 run_dev.py
    ```
    The API will run on `http://localhost:8000`.

### Configuration

Create a `.env.local` file in the root directory with the following credentials:

```env
GOOGLE_API_KEY=your_api_key_here
API_PROVIDER=google
MODEL_NAME=gemini-2.5-flash
```

## License

MIT
