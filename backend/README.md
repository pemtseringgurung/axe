# Axe - Behavioral Spending Analysis Backend

This backend service uses LangGraph to analyze impulsive spending behavior based on behavioral economics principles.

## Problem Being Solved

Instead of traditional budgeting that uses logical/statistical approaches, this agent addresses the **real reason** people overspend:
- **Behavioral issues**: lack of self-control, social pressure, emotional triggers
- **Illogical spending situations**: FOMO, status seeking, stress shopping
- **Social dynamics**: peer pressure, keeping up appearances

The agent analyzes user spending reasons to identify behavioral patterns and provides actionable recommendations that address root psychological causes.

## Architecture

### LangGraph Agent Flow
1. **Analyze Spending Reason** - Understand the psychological context
2. **Identify Behavioral Triggers** - Detect social pressure, emotions, etc.
3. **Calculate Impulsivity Score** - Rate spending from 0-10 
4. **Generate Recommendations** - Provide behavioral interventions

### Key Features
- Identifies 10+ behavioral triggers (social pressure, FOMO, emotional compensation, etc.)
- Impulsivity scoring (0-10 scale)
- Personalized recommendations focused on behavioral change
- Batch analysis for pattern detection over time

## Setup

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your OpenRouter API key:
```
OPENROUTER_API_KEY=sk-or-v1-...
```

Get your FREE API key from: https://openrouter.ai/keys

**Why OpenRouter?** 
- Access to **Qwen3 Coder 480B** (480B MoE model, FREE!)
- 262K context window - perfect for analyzing multiple spending events
- Optimized for agentic workflows and reasoning
- Multiple free model options if you want to experiment

### 3. Run the API Server

```bash
python api.py
```

Or with uvicorn directly:
```bash
uvicorn api:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### `POST /analyze`

Analyze a single spending event.

**Request:**
```json
{
  "budget_amount": 100.0,
  "actual_spent": 250.0,
  "spending_reason": "My friends wanted to go to this new restaurant and I didn't want to miss out. Everyone was ordering expensive cocktails so I did too.",
  "spending_category": "dining"
}
```

**Response:**
```json
{
  "budget_amount": 100.0,
  "actual_spent": 250.0,
  "overspent_by": 150.0,
  "impulsivity_score": 8,
  "behavioral_triggers": [
    "Social pressure",
    "FOMO (fear of missing out)",
    "Peer influence"
  ],
  "recommendations": [
    "Before accepting social invitations, check your budget and set a spending limit",
    "Practice saying 'I'm on a budget' - true friends will understand",
    "Suggest alternative activities that align with your financial goals"
  ]
}
```

### `POST /analyze/batch`

Analyze multiple spending events to identify patterns.

### `GET /health`

Check API health and configuration status.

## Testing the Agent

### Command Line Test

```bash
cd backend
python agent.py
```

This runs the example in the agent code.

### API Test with curl

```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "budget_amount": 100,
    "actual_spent": 250,
    "spending_reason": "My friends wanted to go to this new restaurant and I did not want to miss out",
    "spending_category": "dining"
  }'
```

## Integration with Next.js Frontend

From your Next.js app, call the API:

```typescript
// Example: src/lib/analyze-spending.ts
export async function analyzeSpending(data: {
  budgetAmount: number;
  actualSpent: number;
  spendingReason: string;
  category?: string;
}) {
  const response = await fetch('http://localhost:8000/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      budget_amount: data.budgetAmount,
      actual_spent: data.actualSpent,
      spending_reason: data.spendingReason,
      spending_category: data.category || 'general'
    })
  });
  
  return response.json();
}
```

## Behavioral Triggers Detected

The agent can identify these behavioral patterns:
- **Social pressure** - Friends wanting to go out, keeping up with others
- **Emotional compensation** - Stress shopping, retail therapy
- **FOMO** - Fear of missing out
- **Instant gratification** - Can't wait, need it now
- **Lack of planning** - Spontaneous decisions
- **Environmental cues** - Sales, ads, proximity
- **Habit/routine** - Automatic behaviors
- **Status seeking** - Keeping up appearances
- **Boredom** - Shopping for entertainment
- **Reward/celebration** - Treating yourself

## Model: Qwen3 Coder 480B (FREE) 🚀

**Why this model is perfect for behavioral spending analysis:**

- **480B parameters** with MoE (35B active) - Exceptional reasoning quality
- **262K context window** - Analyze months of spending patterns at once
- **Optimized for agentic workflows** - Built for LangGraph applications
- **Function calling & tool use** - Native support for agent frameworks
- **FREE on OpenRouter** - No costs, unlimited usage
- **Long-context reasoning** - Maintains coherence across complex analysis

**Alternative free models available:**
- `qwen/qwen3:free` - 4B reasoning model
- `meta-llama/llama-3.2-3b-instruct:free` - 131K context
- `google/gemma-3-4b:free` - Multilingual support

Change model in `.env`:
```bash
MODEL_NAME=qwen/qwen3-coder:free
```

## Development

### Project Structure
```
backend/
├── agent.py          # LangGraph agent implementation
├── api.py            # FastAPI server
├── requirements.txt  # Python dependencies
├── .env              # Environment variables (create from .env.example)
└── README.md         # This file
```

### Next Steps
1. Add user authentication to track spending over time
2. Build pattern detection across multiple spending events
3. Create personalized trigger profiles for each user
4. Add visualization of spending patterns
5. Implement proactive alerts before impulsive spending

## License

Part of the Axe budgeting application.
