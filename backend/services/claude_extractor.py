import anthropic
import json
import os
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

EXTRACTION_PROMPT = """
You are a financial data extraction specialist. You will be given text from a Kenya 
Auditor-General (OAG) Popular Report on National Government.

Extract the following structured data and return it as a valid JSON object.
If a value is not found in the text, use null.
All monetary values should be in Kenya Shillings (numbers only, no currency symbols).
Amounts in Trillions: multiply by 1,000,000,000,000
Amounts in Billions: multiply by 1,000,000,000
Amounts in Millions: multiply by 1,000,000

Return ONLY the JSON object, no other text.

Extract this structure:
{
  "report_info": {
    "title": "string",
    "financial_year": "string (e.g. 2023/2024)",
    "year": integer
  },
  "budget_figures": [
    {
      "financial_year": "string",
      "estimated_expenditure": number or null,
      "actual_expenditure": number or null,
      "under_expenditure": number or null,
      "under_expenditure_pct": number or null,
      "recurrent_spending": number or null,
      "development_spending": number or null,
      "consolidated_fund_services": number or null
    }
  ],
  "revenue_figures": [
    {
      "financial_year": "string",
      "budgeted_revenue": number or null,
      "actual_revenue": number or null,
      "surplus_shortfall": number or null,
      "surplus_shortfall_pct": number or null
    }
  ],
  "debt_figures": [
    {
      "financial_year": "string",
      "total_debt": number or null,
      "debt_ceiling": number or null,
      "ceiling_breached": boolean or null,
      "cbk_overdraft": number or null,
      "commitment_fees": number or null,
      "debt_expenditure": number or null
    }
  ],
  "audit_opinions": [
    {
      "entity_type": "string",
      "unmodified": integer or null,
      "qualified": integer or null,
      "adverse": integer or null,
      "disclaimer": integer or null,
      "total": integer or null
    }
  ],
  "pending_bills": {
    "total": number or null,
    "mda_total": number or null,
    "donor_total": number or null,
    "highest_mda_name": "string or null",
    "highest_mda_amount": number or null
  },
  "key_findings": [
    "string"
  ],
  "recommendations": [
    {
      "text": "string",
      "category": "string"
    }
  ]
}

Here is the report text to extract from:

{report_text}
"""

def extract_structured_data(report_text: str) -> dict:
    """
    Use Claude to extract structured financial data from report text.
    Returns parsed JSON dict.
    """
    # Truncate text if too long (Claude has context limits)
    max_chars = 150000
    if len(report_text) > max_chars:
        report_text = report_text[:max_chars] + "\n\n[Text truncated for processing]"

    prompt = EXTRACTION_PROMPT.replace("{report_text}", report_text)

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4000,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    response_text = message.content[0].text.strip()

    # Clean up response if wrapped in markdown
    if response_text.startswith("```"):
        lines = response_text.split("\n")
        response_text = "\n".join(lines[1:-1])

    try:
        return json.loads(response_text)
    except json.JSONDecodeError as e:
        raise ValueError(f"Claude returned invalid JSON: {e}\nResponse: {response_text[:500]}")


def extract_with_retry(report_text: str, max_retries: int = 2) -> dict:
    """
    Extract with retry logic on failure.
    """
    last_error = None
    for attempt in range(max_retries + 1):
        try:
            return extract_structured_data(report_text)
        except Exception as e:
            last_error = e
            if attempt < max_retries:
                print(f"Extraction attempt {attempt + 1} failed: {e}. Retrying...")
    raise last_error
