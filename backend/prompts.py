from typing import Any


def generate_prompt(data: Any) -> str:
    # data is expected to have attributes matching BusinessInput fields
    return f"""
You are an expert McKinsey-style business consultant and venture capital analyst.
Analyze the following business concept and provide a comprehensive, deep-dive strategic report.

BUSINESS DETAILS:
- Idea: {data.idea}
- Target Audience: {data.target_audience}
- Budget: ${data.budget}
- Location: {data.location}
- Industry: {data.industry}

Provide a high-level professional report in a STRICT JSON format. Ensure the analysis is insightful, data-driven, and actionable.

The JSON should have the following structure:
{{
  "summary": "A 2-sentence executive summary",
  "swot": {{
    "strengths": ["list of 4-5 points"],
    "weaknesses": ["list of 4-5 points"],
    "opportunities": ["list of 4-5 points"],
    "threats": ["list of 4-5 points"]
  }},
  "revenue_model": {{
    "primary_stream": "Description",
    "secondary_streams": ["Stream 1", "Stream 2"],
    "pricing_strategy": "Details"
  }},
  "marketing_plan": {{
    "channels": ["Channel 1", "Channel 2"],
    "customer_acquisition_cost_strategy": "Details",
    "brand_positioning": "Details"
  }},
  "risk_analysis": [
    {{ "risk": "Risk name", "mitigation": "Mitigation strategy", "impact": "High/Medium/Low" }}
  ],
  "financial_projection": {{
    "year_1": {{ "revenue": 0, "expenses": 0, "profit": 0 }},
    "year_2": {{ "revenue": 0, "expenses": 0, "profit": 0 }},
    "year_3": {{ "revenue": 0, "expenses": 0, "profit": 0 }}
  }},
  "investor_readiness": {{
    "score": 85,
    "feedback": "Why this score?",
    "key_improvement_areas": ["Area 1", "Area 2"]
  }}
}}

Respond ONLY with the JSON object. Do not include any introductory or concluding text.
"""
