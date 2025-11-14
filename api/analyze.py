"""
Vercel Serverless Function for Spending Analysis
"""
from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Import agent from same directory
from agent import ImpulsiveSpendingAgent

# Initialize agent once (cached across function calls)
agent = None

def get_agent():
    global agent
    if agent is None:
        agent = ImpulsiveSpendingAgent()
    return agent


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """Handle CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        """Handle POST request"""
        try:
            # Read request body
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body)

            # Validate input
            if 'actual_spent' not in data or 'spending_reason' not in data:
                self.send_error(400, "Missing required fields")
                return

            # Run analysis
            agent = get_agent()
            result = agent.analyze(
                budget_amount=0,
                actual_spent=float(data['actual_spent']),
                spending_reason=data['spending_reason'],
                spending_category=data.get('spending_category', 'general')
            )

            # Send response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            error_response = {
                "error": str(e),
                "detail": "Error analyzing spending"
            }
            self.wfile.write(json.dumps(error_response).encode())
