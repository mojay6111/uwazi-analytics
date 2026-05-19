"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Users, Lightbulb, AlertCircle } from "lucide-react";

type Language = "en" | "sw";

const content = {
  en: {
    title: "Civic Explainer",
    subtitle: "What the 2023/2024 OAG Report means for every Kenyan",
    sections: [
      {
        id: "budget",
        emoji: "💰",
        title: "The Budget — Did the Government Spend Wisely?",
        summary: "The government planned to spend Ksh 4.82 Trillion but only spent Ksh 4.23 Trillion. While spending less sounds good, it means many planned services were never delivered.",
        details: [
          "Think of it like a household that budgets for school fees, hospital bills and food — but only uses part of the money while the kids still don't go to school and the family still goes hungry.",
          "The government collected only Ksh 2.29 Trillion in taxes and other revenue, but spent Ksh 3.88 Trillion. The Ksh 1.59 Trillion gap was borrowed — money that future Kenyans will have to repay.",
          "Development spending — roads, hospitals, schools — was only Ksh 0.5 Trillion out of the total. Most money went to salaries and debt repayment.",
        ],
        impact: "Roads not built, hospitals not stocked, classrooms not completed.",
        severity: "high",
      },
      {
        id: "debt",
        emoji: "⛓️",
        title: "The Debt — Who Will Pay Ksh 10.58 Trillion?",
        summary: "Kenya's public debt hit Ksh 10.58 Trillion — exceeding the Ksh 10 Trillion ceiling set by Parliament. Every Kenyan — including children not yet born — owes a share of this debt.",
        details: [
          "If Kenya's population is 55 million people, every single Kenyan — from newborns to the elderly — owes approximately Ksh 192,000 as their share of the national debt.",
          "Parliament set a Ksh 10 Trillion limit on borrowing. The government exceeded this limit. There is currently no law that specifies what happens when this ceiling is broken.",
          "Kenya paid Ksh 1.5 Billion in commitment fees for loans it signed but never used. This is money paid for nothing — borrowed money that sat idle while Kenyans went without services.",
          "Debt repayment now costs Ksh 1.598 Trillion per year — more than Kenya collects from income tax and VAT combined.",
        ],
        impact: "Every shilling borrowed today is a shilling that tomorrow's Kenyan must repay with interest.",
        severity: "high",
      },
      {
        id: "pendingbills",
        emoji: "📄",
        title: "Pending Bills — The Government Owes Contractors Ksh 194.7 Billion",
        summary: "The government has not paid contractors and suppliers Ksh 194.7 Billion for work already done. This includes roads built, medicines supplied, and equipment delivered.",
        details: [
          "Imagine doing a month of work and your employer refuses to pay. Now multiply that by thousands of Kenyan businesses — some have been waiting years for payment.",
          "The Ministry of Defence alone owes Ksh 22.9 Billion — the highest of any single government entity.",
          "Kenya National Highways Authority owes Ksh 49.99 Billion to contractors of donor-funded road projects. These are roads that were built or partially built but payment has not been made.",
          "When businesses are not paid, they cannot pay their own workers. Workers cannot pay school fees. The ripple effect hits every household.",
        ],
        impact: "Small businesses close, workers lose jobs, taxes go uncollected — a ripple effect across the economy.",
        severity: "high",
      },
      {
        id: "health",
        emoji: "🏥",
        title: "Health Services — Vaccines Ran Out for 65 Days",
        summary: "Three critical vaccines — BCG, OPV and Measles Rubella — were out of stock for an average of 65 days. The Linda Mama free maternity programme was underfunded by 51%.",
        details: [
          "BCG protects newborns from tuberculosis. OPV protects children from polio. Measles Rubella prevents measles and rubella. All three were unavailable in government facilities for over two months.",
          "The Linda Mama programme was allocated Ksh 4 Billion to provide free maternity services to mothers. Only Ksh 2 Billion was actually transferred — meaning thousands of mothers had to pay out of pocket or go without care.",
          "This is not a resource problem alone — it is a prioritization and accountability problem. The money was budgeted but not released on time.",
        ],
        impact: "Children went unvaccinated. Mothers paid for care that was supposed to be free.",
        severity: "high",
      },
      {
        id: "ecitizen",
        emoji: "📱",
        title: "E-Citizen — Ksh 44.8 Billion in Questionable Digital Payments",
        summary: "The government collected Ksh 100.8 Billion through e-Citizen. But Ksh 44.8 Billion could not be properly verified — the numbers in the system didn't match the official records.",
        details: [
          "When you pay for a government service online, that money should immediately be tracked and accounted for. For Ksh 44.8 Billion, this tracking broke down.",
          "The government does not fully control its own digital payment system. Critical functions like onboarding new services and system configuration are handled by the private supplier — not government staff.",
          "This creates a dependency risk: if the supplier company has problems, Kenya's entire digital payment infrastructure could be affected.",
        ],
        impact: "Billions in revenue potentially unaccounted for. Citizens' payments may not be reaching government coffers.",
        severity: "medium",
      },
      {
        id: "equalisation",
        emoji: "🗺️",
        title: "Equalisation Fund — Marginalized Counties Shortchanged by Ksh 46.5 Billion",
        summary: "The Constitution created the Equalisation Fund to bring basic services to Kenya's most marginalized counties. Only Ksh 13.4 Billion of the Ksh 59.9 Billion entitlement was released.",
        details: [
          "Counties like Turkana, Mandera, Wajir, Marsabit, Samburu and others were identified as marginalized. The Constitution guarantees them extra funding for water, roads, health and electricity.",
          "Instead of the full Ksh 59.9 Billion they were entitled to, only Ksh 13.4 Billion was released — leaving a Ksh 46.5 Billion shortfall.",
          "This means communities already left behind by development continue to wait for clean water, paved roads, and functioning health facilities that the Constitution promised them.",
        ],
        impact: "14 marginalized counties denied constitutionally guaranteed development funds.",
        severity: "high",
      },
      {
        id: "pensions",
        emoji: "👴",
        title: "Pensions — Retired Civil Servants Cannot Access Ksh 187 Billion",
        summary: "The government set aside Ksh 187 Billion for civil servant and military pensions. But many retirees cannot access their money because of missing ID numbers and employee records.",
        details: [
          "Teachers, nurses, soldiers and civil servants who spent decades serving Kenya are now in retirement waiting for pension money they are owed.",
          "The problem is administrative: missing ID numbers, incorrect employee numbers, and outdated beneficiary records mean the system cannot process payments.",
          "Some pensioners have been waiting over ten years. This is not a funding problem — the money exists. It is a records management failure.",
        ],
        impact: "Elderly retirees denied money they earned through decades of public service.",
        severity: "medium",
      },
    ],
  },
  sw: {
    title: "Maelezo kwa Wananchi",
    subtitle: "Ripoti ya OAG 2023/2024 inamaanisha nini kwa Mkenya wa kawaida",
    sections: [
      {
        id: "budget",
        emoji: "💰",
        title: "Bajeti — Je, Serikali Ilitumia Pesa Vizuri?",
        summary: "Serikali ilipanga kutumia Shilingi Trilioni 4.82 lakini ilitumia Shilingi Trilioni 4.23 tu. Ingawa kutumia kidogo kunasikika vizuri, inamaanisha huduma nyingi zilizopangwa hazikutolewa.",
        details: [
          "Fikiria familia inayopanga bajeti ya ada za shule, bili za hospitali na chakula — lakini inatumia sehemu ya pesa tu huku watoto bado hawakwendi shule na familia bado ina njaa.",
          "Serikali ilikusanya Shilingi Trilioni 2.29 tu kwa kodi na mapato mengine, lakini ilitumia Shilingi Trilioni 3.88. Pengo la Shilingi Trilioni 1.59 lilikopwa — pesa ambayo Wakenya wa baadaye watastahili kulipa.",
          "Matumizi ya maendeleo — barabara, hospitali, shule — yalikuwa Shilingi Trilioni 0.5 tu. Pesa nyingi zilienda kwa mishahara na malipo ya madeni.",
        ],
        impact: "Barabara hazikujengwa, hospitali hazikustocked, madarasa hayakukamilika.",
        severity: "high",
      },
      {
        id: "debt",
        emoji: "⛓️",
        title: "Deni — Nani Atalipa Shilingi Trilioni 10.58?",
        summary: "Deni la umma la Kenya lilifikia Shilingi Trilioni 10.58 — kuzidi kikomo cha Shilingi Trilioni 10 kilichowekwa na Bunge. Kila Mkenya — pamoja na watoto ambao bado hawajazaliwa — ana sehemu ya deni hili.",
        details: [
          "Kama idadi ya watu wa Kenya ni milioni 55, kila Mkenya mmoja — kutoka watoto wachanga hadi wazee — ana deni la takriban Shilingi 192,000.",
          "Bunge liliweka kikomo cha Shilingi Trilioni 10 kwa kukopa. Serikali ilizidi kikomo hiki. Hivi sasa hakuna sheria inayobainisha kinachotokea kikomo hiki kinapovunjwa.",
        ],
        impact: "Kila shilingi inayokopwa leo ni shilingi ambayo Mkenya wa kesho atalazimika kulipa pamoja na riba.",
        severity: "high",
      },
    ],
  },
};

const severityConfig = {
  high: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.2)", label: "High Impact" },
  medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)", label: "Medium Impact" },
  low: { color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)", label: "Low Impact" },
};

export default function CivicPage() {
  const [lang, setLang] = useState<Language>("en");
  const [openSection, setOpenSection] = useState<string | null>("budget");
  const data = content[lang];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "800", color: "white", margin: 0 }}>
              {data.title}
            </h1>
            <div style={{ padding: "4px 10px", borderRadius: "20px", backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "600" }}>Plain Language</span>
            </div>
          </div>

          {/* Language toggle */}
          <div style={{ display: "flex", gap: "4px", backgroundColor: "#1a2744", borderRadius: "10px", padding: "4px" }}>
            {(["en", "sw"] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: "6px 16px", borderRadius: "7px", cursor: "pointer",
                  border: "none",
                  backgroundColor: lang === l ? "#10b981" : "transparent",
                  color: lang === l ? "white" : "#64748b",
                  fontSize: "12px", fontWeight: "700", transition: "all 0.15s",
                }}
              >
                {l === "en" ? "English" : "Kiswahili"}
              </button>
            ))}
          </div>
        </div>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>{data.subtitle}</p>
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginBottom: "24px" }}>
        {[
          { emoji: "🏛️", label: "Entities Audited", value: "336" },
          { emoji: "⚠️", label: "High Risk MDAs", value: "4" },
          { emoji: "💸", label: "Pending Bills", value: "Ksh 194.7B" },
          { emoji: "📈", label: "Public Debt", value: "Ksh 10.58T" },
          { emoji: "🏥", label: "Vaccine Stock-out", value: "65 Days" },
          { emoji: "🗺️", label: "Fund Shortfall", value: "Ksh 46.5B" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: "#0d1424", border: "1px solid #1a2744",
              borderRadius: "12px", padding: "16px", textAlign: "center",
            }}
          >
            <p style={{ fontSize: "24px", margin: "0 0 6px 0" }}>{stat.emoji}</p>
            <p style={{ color: "white", fontSize: "16px", fontWeight: "800", margin: "0 0 4px 0" }}>{stat.value}</p>
            <p style={{ color: "#64748b", fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Accordion sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
        {data.sections.map((section) => {
          const isOpen = openSection === section.id;
          const sev = severityConfig[section.severity as keyof typeof severityConfig];

          return (
            <div
              key={section.id}
              style={{
                backgroundColor: "#0d1424",
                border: `1px solid ${isOpen ? sev.color + "40" : "#1a2744"}`,
                borderRadius: "16px",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              {/* Accordion header */}
              <button
                onClick={() => setOpenSection(isOpen ? null : section.id)}
                style={{
                  width: "100%", padding: "20px 24px", cursor: "pointer",
                  backgroundColor: "transparent", border: "none",
                  display: "flex", alignItems: "center", gap: "16px",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "28px", flexShrink: 0 }}>{section.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                    <p style={{ color: "white", fontSize: "15px", fontWeight: "700", margin: 0 }}>
                      {section.title}
                    </p>
                    <span style={{ fontSize: "10px", fontWeight: "700", color: sev.color, backgroundColor: sev.bg, border: `1px solid ${sev.border}`, padding: "2px 8px", borderRadius: "10px" }}>
                      {sev.label}
                    </span>
                  </div>
                  <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>{section.summary}</p>
                </div>
                <div style={{ flexShrink: 0, color: "#64748b" }}>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {/* Accordion content */}
              {isOpen && (
                <div style={{ padding: "0 24px 24px 24px" }}>
                  <div style={{ width: "100%", height: "1px", backgroundColor: "#1a2744", marginBottom: "20px" }} />

                  {/* Detail points */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                    {section.details.map((detail, i) => (
                      <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#1a2744", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                          <span style={{ fontSize: "10px", fontWeight: "700", color: "#64748b" }}>{i + 1}</span>
                        </div>
                        <p style={{ color: "#cbd5e1", fontSize: "13px", lineHeight: "1.7", margin: 0 }}>{detail}</p>
                      </div>
                    ))}
                  </div>

                  {/* Impact box */}
                  <div style={{ padding: "14px 16px", borderRadius: "10px", backgroundColor: sev.bg, border: `1px solid ${sev.border}`, display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <AlertCircle size={16} color={sev.color} style={{ flexShrink: 0, marginTop: "1px" }} />
                    <div>
                      <p style={{ color: sev.color, fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 2px 0" }}>
                        Impact on You
                      </p>
                      <p style={{ color: "#cbd5e1", fontSize: "12px", margin: 0 }}>{section.impact}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* What can citizens do */}
      <div style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <Users size={20} color="#10b981" />
          <h3 style={{ color: "white", fontSize: "16px", fontWeight: "700", margin: 0 }}>
            What Can Citizens Do?
          </h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {[
            { emoji: "📖", title: "Read the Report", desc: "Download the full OAG report from oagkenya.go.ke and share key findings with your community." },
            { emoji: "🗣️", title: "Engage Your MP", desc: "Ask your Member of Parliament to question the government on audit findings in their constituency." },
            { emoji: "📱", title: "Report Misuse", desc: "Use e-Citizen or OAG channels to report suspected misuse of public funds in your area." },
            { emoji: "📊", title: "Track Spending", desc: "Monitor how your county and national government spend money through public budget documents." },
            { emoji: "🤝", title: "Join Forums", desc: "Participate in public participation forums on budgets to ensure your needs are prioritized." },
            { emoji: "📢", title: "Demand Accountability", desc: "Hold government officials accountable during public barazas and county assembly sessions." },
          ].map((action) => (
            <div key={action.title} style={{ padding: "16px", borderRadius: "12px", backgroundColor: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.1)" }}>
              <p style={{ fontSize: "22px", margin: "0 0 8px 0" }}>{action.emoji}</p>
              <p style={{ color: "#10b981", fontSize: "13px", fontWeight: "600", margin: "0 0 4px 0" }}>{action.title}</p>
              <p style={{ color: "#64748b", fontSize: "11px", lineHeight: "1.5", margin: 0 }}>{action.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key quote */}
      <div style={{ padding: "24px", borderRadius: "16px", backgroundColor: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", textAlign: "center" }}>
        <Lightbulb size={24} color="#10b981" style={{ marginBottom: "12px" }} />
        <p style={{ color: "white", fontSize: "16px", fontWeight: "600", lineHeight: "1.6", margin: "0 0 8px 0", fontStyle: "italic" }}>
          "Audit reports help us hold the government accountable. Reporting misappropriation is our civic duty."
        </p>
        <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>— OAG Kenya, 2023/2024 Popular Report</p>
      </div>
    </div>
  );
}
