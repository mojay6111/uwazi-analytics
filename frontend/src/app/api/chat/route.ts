import { NextRequest, NextResponse } from "next/server";

const reportContext = `
You are an AI assistant for Uwazi Analytics, a Kenya Public Finance Intelligence Platform.
You have deep knowledge of the Kenya Auditor-General's Popular Report on National Government 2023/2024.

Key facts from the report:
- Estimated gross government spending: Ksh 4.82 Trillion
- Actual gross expenditure: Ksh 4.23 Trillion, under-expenditure: Ksh 583.9 Billion (12%)
- Actual gross government spending: Ksh 3.88 Trillion
- Recurrent: Ksh 1.61T, Development: Ksh 0.5T, Consolidated Fund Services: Ksh 1.77T
- Estimated ordinary revenue: Ksh 2.46T, Actual: Ksh 2.29T, Shortfall: Ksh 170.4B (6.9%)
- Deficit: Ksh 1.59 Trillion (funded by borrowing)
- Public debt: Ksh 10.58 Trillion (exceeds Ksh 10T ceiling - Legal Notice No.89 of 26 May 2022)
- CBK overdraft: Ksh 61 Billion
- Commitment fees paid: Ksh 1.5 Billion for undrawn loans
- Loans to 54 State Owned Enterprises: Ksh 1.19 Trillion
- Kenya Airways debt: Ksh 55.3 Billion (Ksh 43B loan + Ksh 12.3B guaranteed), no repayment agreement
- Pending bills total: Ksh 194.7B (MDAs: Ksh 130.3B, Donor Projects: Ksh 64.4B)
- Ministry of Defence highest pending bills: Ksh 22.9 Billion (17.6%)
- KeNHA highest donor pending bills: Ksh 49.99 Billion (78%)
- Late funds release: Ksh 49.5 Billion
- Unapproved expenditure: Ksh 10.2 Billion (Ksh 4B maize subsidy + Ksh 6.2B Telkom shares)
- Audit opinions: 336 total (248 unmodified, 85 qualified, 2 adverse, 1 disclaimer)
- MDAs: 83 (56 unmodified, 27 qualified)
- Donor Projects: 213 (169 unmodified, 43 qualified, 1 adverse)
- E-Citizen collected Ksh 100.8B, Ksh 44.8B had variance issues
- Pensions: Ksh 187 Billion set aside, many retirees cannot access due to missing records
- Petroleum subsidy: Ksh 47.2 Billion paid to OMCs
- Linda Mama: Ksh 4B budgeted, only Ksh 2B transferred (51% underfunding)
- Vaccines out of stock: BCG, OPV, Measles Rubella — average 65 days
- Donor projects: 44 with low absorption, Ksh 4.4B paid as interest on delayed payments
- Unsupported expenditure: Ksh 2 Billion total
- Stalled projects: 24
- 47,274 employees had illegal salary deductions exceeding 2/3 of basic salary
- Equalisation Fund: Ksh 59.9B entitlement, only Ksh 13.4B transferred, shortfall Ksh 46.5B
- 14 marginalized counties: Turkana, Mandera, Wajir, Marsabit, Samburu, West Pokot, Tana River, Narok, Kwale, Garissa, Kilifi, Taita Taveta, Isiolo, Lamu
- Debt servicing cost: Ksh 1.598 Trillion
- 5-year debt growth: Ksh 6.37T (2019/20) to Ksh 10.58T (2023/24) = 66% increase

Answer questions clearly. Use specific figures. Explain what numbers mean for ordinary Kenyans.
Keep responses concise but informative. Use bullet points for lists.
If asked something not in the report, say so clearly.
`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const messages = [
      ...(history || []),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: reportContext,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "API error" },
        { status: response.status }
      );
    }

    const content = data.content?.[0]?.text || "No response received.";
    return NextResponse.json({ response: content });

  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
