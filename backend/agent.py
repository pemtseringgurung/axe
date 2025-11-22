"""
LangGraph Agent for Analyzing Impulsive Spending Behavior

This agent analyzes user spending patterns to identify behavioral and 
illogical spending habits rather than just mathematical overspending.
"""

from typing import TypedDict, Annotated, List, Dict
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
import operator
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env.local'))


class SpendingState(TypedDict):
    """State for the spending analysis agent"""
    budget_amount: float
    actual_spent: float
    spending_reason: str
    spending_category: str
    analysis_results: Annotated[List[Dict], operator.add]
    underlying_reason: str  # Deep psychological reason
    behavioral_triggers: List[str]
    recommendations: List[str]


class ImpulsiveSpendingAgent:
    """
    Agent that identifies impulsive and behavioral spending patterns.
    
    Problem: People overspend due to behavioral issues (lack of self-control,
    social pressure, emotional triggers) rather than logical budgeting failures.
    
    Solution: Analyze spending reasons to identify behavioral patterns and
    provide insights that address the root psychological causes.
    """
    
    def __init__(self, model_name: str = None):
        # Determine which API to use
        api_provider = os.getenv("API_PROVIDER", "google").lower()
        
        if model_name is None:
            model_name = os.getenv("MODEL_NAME", "gemini-1.5-flash")
        
        if api_provider == "google":
            # Use Google Gemini
            from langchain_google_genai import ChatGoogleGenerativeAI
            self.llm = ChatGoogleGenerativeAI(
                model=model_name,
                temperature=0.7,
                google_api_key=os.getenv("GOOGLE_API_KEY")
            )
        else:
            # Use OpenRouter
            self.llm = ChatOpenAI(
                model=model_name,
                temperature=0.7,
                openai_api_base="https://openrouter.ai/api/v1",
                openai_api_key=os.getenv("OPENROUTER_API_KEY"),
                default_headers={
                    "HTTP-Referer": "https://axe-budget.app",
                    "X-Title": "Axe Behavioral Spending Analyzer"
                }
            )
        
        self.graph = self._build_graph()
    
    def _build_graph(self) -> StateGraph:
        """Build the LangGraph workflow"""
        workflow = StateGraph(SpendingState)
        
        # Add nodes
        workflow.add_node("analyze_and_recommend", self.analyze_and_recommend)
        
        # Define the flow
        workflow.set_entry_point("analyze_and_recommend")
        workflow.add_edge("analyze_and_recommend", END)
        
        return workflow.compile()
    
    def analyze_and_recommend(self, state: SpendingState) -> SpendingState:
        """
        Combined step: Analyze spending, identify triggers, AND generate recommendations in one go.
        """
        system_prompt = """You are a behavioral psychologist mixed with a caring friend who sees through bullshit.

Your expertise: Consumer psychology, behavioral economics, cognitive biases, emotional triggers, social dynamics.

MISSION: Analyze this spending event to uncover the truth AND provide solutions.

Output a SINGLE JSON object with these fields:
1. "underlying_reason": ONE clear sentence explaining the DEEP psychological reason (be specific, not generic).
2. "triggers": Array of 2-3 specific behavioral triggers (e.g., "Social pressure", "FOMO", "Instant gratification").
3. "recommendations": Array of 3-4 objects, each with:
    - "action": A SPECIFIC, ACTIONABLE technique (from CBT, behavioral economics, habit formation).
    - "why": Brief explanation of the psychology behind why it works.

Think about:
- What psychological need were they trying to fill?
- What cognitive bias was at play?
- How far over budget is this?

Example Output:
{
  "underlying_reason": "You're using purchases as a quick dopamine hit to cope with work stress.",
  "triggers": ["Stress relief seeking", "Instant gratification"],
  "recommendations": [
    {
      "action": "Set a 48-hour rule: Save items in cart, wait 2 days before buying.",
      "why": "Dopamine spike fades after 48 hours, letting rational brain catch up."
    },
    {
      "action": "Replace the habit: When stressed, do 5 minutes of breathing instead.",
      "why": "Addresses the physiological stress response without spending."
    }
  ]
}

Be REAL. Be SPECIFIC. No generic BS."""

        user_message = f"""
Budget: ${state['budget_amount']}
Spent: ${state['actual_spent']}
Overspent by: ${state['actual_spent'] - state['budget_amount']}
What they said: "{state['spending_reason']}"
Category: {state['spending_category']}

Analyze this and give recommendations. Return JSON only.
"""

        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_message)
        ]
        
        response = self.llm.invoke(messages)
        
        # Parse JSON response
        content = response.content.strip()
        if content.startswith('```'):
            content = content.split('```')[1]
            if content.startswith('json'):
                content = content[4:]
            content = content.strip()
        
        try:
            analysis = json.loads(content)
            
            # Extract fields with fallbacks
            underlying_reason = analysis.get("underlying_reason", "You might be spending to fill an emotional need.")
            triggers = analysis.get("triggers", ["Emotional spending"])
            recommendations = analysis.get("recommendations", [])
            
            # Ensure types
            if not isinstance(triggers, list): triggers = [str(triggers)]
            if not isinstance(recommendations, list): recommendations = []
            
            # Fallback for recommendations if empty or malformed
            if not recommendations:
                recommendations = [
                    {"action": "Set a 24-hour wait rule before purchases", "why": "Gives your rational brain time to catch up"},
                    {"action": "Track what triggers your spending urges", "why": "Awareness is the first step to change"},
                    {"action": "Find a healthier dopamine source", "why": "Address the need without spending"}
                ]
            
        except Exception as e:
            print(f"JSON parse error: {e}")
            # Fallback
            underlying_reason = "You might be spending to fill an emotional need - let's look deeper at this pattern."
            triggers = ["Emotional spending", "Impulse control"]
            recommendations = [
                {"action": "Set a 24-hour wait rule before purchases", "why": "Gives your rational brain time to catch up"},
                {"action": "Track what triggers your spending urges", "why": "Awareness is the first step to change"}
            ]
        
        return {
            **state,
            "underlying_reason": underlying_reason,
            "behavioral_triggers": triggers[:3],
            "recommendations": recommendations[:4],
            "analysis_results": [{
                "step": "combined_analysis_and_recommendation",
                "content": response.content
            }]
        }
    
    def analyze(
        self,
        budget_amount: float,
        actual_spent: float,
        spending_reason: str,
        spending_category: str = "general"
    ) -> Dict:
        """
        Main entry point to analyze spending behavior.
        
        Args:
            budget_amount: The budgeted amount for this category
            actual_spent: The actual amount spent
            spending_reason: User's explanation for why they spent the money
            spending_category: Category of spending (food, entertainment, etc.)
        
        Returns:
            Dict with analysis results including triggers, score, and recommendations
        """
        initial_state = SpendingState(
            budget_amount=budget_amount,
            actual_spent=actual_spent,
            spending_reason=spending_reason,
            spending_category=spending_category,
            analysis_results=[],
            underlying_reason="",
            behavioral_triggers=[],
            recommendations=[]
        )
        
        final_state = self.graph.invoke(initial_state)
        
        return {
            "underlying_reason": final_state["underlying_reason"],
            "behavioral_triggers": final_state["behavioral_triggers"],
            "recommendations": final_state["recommendations"],
            "spending_reason": final_state["spending_reason"],
            "actual_spent": final_state["actual_spent"],
            "category": final_state["spending_category"]
        }


# Example usage
if __name__ == "__main__":
    agent = ImpulsiveSpendingAgent()
    
    # Example: User went out with friends
    result = agent.analyze(
        budget_amount=100.0,
        actual_spent=250.0,
        spending_reason="My friends wanted to go to this new restaurant and I didn't want to miss out. Everyone was ordering expensive cocktails and appetizers so I did too.",
        spending_category="dining"
    )
    
    print(json.dumps(result, indent=2))
