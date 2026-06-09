"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"

interface Transaction {
  id: number
  title: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  monthKey: string
}

const CATEGORIES = [
  { value: "किराणा / अन्न", label: "🛒 किराणा / जेवण" },
  { value: "बिल / लाईट", label: "💡 लाईट / पाणी बिल" },
  { value: "शिक्षण / फी", label: "🎒 मुलांची फी" },
  { value: "पगार / उत्पन्न", label: "💵 पगार / उत्पन्न" },
  { value: "वैद्यकीय / औषधे", label: "💊 औषधे / डॉक्टर" },
  { value: "कपडे", label: "👗 कपडे / चप्पल" },
  { value: "इतर खर्च", label: "📦 इतर खर्च" },
]

const MONTHS_LIST = [
  { key: "2026-06", label: "जून २०२६" },
  { key: "2026-05", label: "मे २०२६" },
  { key: "2026-04", label: "एप्रिल २०२६" },
  { key: "2026-03", label: "मार्च २०२६" }
]

export default function ExpenseTracker() {
  // 🛡️ ANTI-HYDRATION MOUNTED GUARD
  const [isMounted, setIsMounted] = useState(false)

  const [selectedMonth, setSelectedMonth] = useState("2026-06")
  const [openingBalance, setOpeningBalance] = useState<number>(25000)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // FORM INPUT STATES
  const [title, setTitle] = useState("")
  const [amountInput, setAmountInput] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [category, setCategory] = useState(CATEGORIES[0].value)
  const [error, setError] = useState("")

  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)

  // 💾 EFFECT 1: SAFE RUNTIME LOADING TO PREVENT ERRORS
  useEffect(() => {
    setIsMounted(true)
    const savedTx = localStorage.getItem("ayushnexa_ledger_data")
    const savedOpening = localStorage.getItem("ayushnexa_opening_balance")
    
    if (savedTx) {
      setTransactions(JSON.parse(savedTx))
    } else {
      setTransactions([
        { id: 1, title: "college fees", amount: 10000, type: "expense", category: "शिक्षण / फी", date: "3/6/2026", monthKey: "2026-06" },
        { id: 2, title: "payment", amount: 35000, type: "income", category: "किराणा / अन्न", date: "3/6/2026", monthKey: "2026-06" }
      ])
    }
    
    if (savedOpening !== null) {
      setOpeningBalance(Number(savedOpening))
    } else {
      setOpeningBalance(0) // Safe fallback to zero according to your plan
    }
  }, [])

  // 💾 EFFECT 2: DATA STORAGE SYNC
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("ayushnexa_ledger_data", JSON.stringify(transactions))
    }
  }, [transactions, isMounted])

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("ayushnexa_opening_balance", openingBalance.toString())
    }
  }, [openingBalance, isMounted])

  // 🧮 MATH EXPRESSION EVALUATOR
  const evaluateExpression = (input: string): number => {
    const sanitized = input.replace(/[^0-9+\-*/.]/g, "")
    try {
      const result = new Function(`return ${sanitized}`)()
      return typeof result === "number" && !isNaN(result) ? result : 0
    } catch {
      return 0
    }
  }

  const currentMonthTx = transactions.filter(t => t.monthKey === selectedMonth)
  const totalIncome = currentMonthTx.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0)
  const totalExpense = currentMonthTx.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0)
  const netBalance = openingBalance + totalIncome - totalExpense

  // ➕ ADD ENTRY
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { setError("तपशील लिहा (उदा. भाजीपाला)"); return }
    
    const finalAmount = evaluateExpression(amountInput)
    if (finalAmount <= 0) { setError("कृपया योग्य रक्कम किंवा बेरीज लिहा"); return }
    setError("")

    const today = new Date()
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

    const newTx: Transaction = {
      id: Date.now(),
      title: title.trim(),
      amount: finalAmount,
      type,
      category,
      date: formattedDate,
      monthKey: selectedMonth
    }

    setTransactions([newTx, ...transactions])
    setTitle("")
    setAmountInput("")
  }

  // 🗑️ DELETE ENTRY
  const handleDelete = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  // 🧹 CLEAR ALL FOR ACTIVE MONTH
  const handleClearAll = () => {
    if (confirm("तुम्हाला या महिन्याचा संपूर्ण जुना हिशोब साफ करायचा आहे का?")) {
      setTransactions(transactions.filter(t => t.monthKey !== selectedMonth))
    }
  }

  // 🛡️ Guard returns standard blank frame during server render to block error completely
  if (!isMounted) {
    return <div className="min-h-screen bg-[#FFF8F0]" />
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1A1A1A] antialiased print:bg-white pb-12">
      <div className="print:hidden">
        <Header />
      </div>

      <main className="max-w-5xl mx-auto px-3 sm:px-6 py-6">
        
        {/* BRANDING HUB HEADER */}
        <div className="bg-[#FF6B35] text-white p-5 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
          <div>
            <h1 className="font-sans text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">🪙 घरगुती हिशोब वही</h1>
            <p className="text-white/90 text-xs mt-0.5">मोबाईल मेमरी आणि कॅल्क्युलेटर लॉक आहे. हायड्रेशन एरर पूर्ण साफ केली आहे!</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <button type="button" onClick={handleClearAll} className="flex-1 md:flex-none px-3 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all">🧹 डेटा साफ करा</button>
            <button type="button" onClick={() => isPremiumUnlocked ? window.print() : setShowPaywall(true)} className="flex-1 md:flex-none px-3 h-9 rounded-xl bg-[#10B981] text-white font-bold text-xs shadow hover:bg-[#10B981]/90 transition-all">
              {isPremiumUnlocked ? "📥 Download" : "Unlock Full App 🔒"}
            </button>
          </div>
        </div>

        {/* MONTHS SCROLLER */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none print:hidden">
          {MONTHS_LIST.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setSelectedMonth(m.key)}
              className={`px-4 h-9 rounded-full text-xs font-bold transition-all shrink-0 border ${selectedMonth === m.key ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow" : "bg-white text-[#64748B] border-[#E2E8F0]"}`}
            >
              📅 {m.label}
            </button>
          ))}
        </div>

        {/* TOTAL METRICS SCOREBOARD */}
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 mb-5">
          <div className="bg-white border border-[#FF6B35]/20 rounded-xl p-3 shadow-sm col-span-2 md:col-span-1 flex flex-col justify-center">
            <label className="block text-[10px] font-black uppercase text-[#64748B] tracking-wider mb-0.5">🏦 मुख्य शिल्लक बॉक्स</label>
            <input 
              type="number" 
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] p-1.5 rounded-lg text-md font-bold text-[#0F172A] outline-none focus:border-[#FF6B35]" 
              value={openingBalance} 
              onChange={(e) => setOpeningBalance(Number(e.target.value))} 
            />
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-center flex flex-col justify-center">
            <span className="text-[10px] font-black uppercase text-emerald-700">📈 एकूण जमा</span>
            <h3 className="text-lg font-black text-emerald-800 mt-0.5">+₹{totalIncome.toLocaleString("en-IN")}</h3>
          </div>
          <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-center flex flex-col justify-center">
            <span className="text-[10px] font-black uppercase text-red-700">📉 एकूण खर्च</span>
            <h3 className="text-lg font-black text-red-800 mt-0.5">-₹{totalExpense.toLocaleString("en-IN")}</h3>
          </div>
          <div className={`p-3 rounded-xl text-center text-white flex flex-col justify-center col-span-2 md:col-span-1 ${netBalance >= 0 ? "bg-[#1A1A2E]" : "bg-red-900"}`}>
            <span className="text-[10px] font-black uppercase opacity-80">👛 निव्वळ शिल्लक</span>
            <h3 className="text-lg font-black mt-0.5">₹{netBalance.toLocaleString("en-IN")}</h3>
          </div>
        </div>

        {/* MAIN BODY GRID */}
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-3">
          
          {/* INPUT FORM BLOCK */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm h-fit print:hidden">
            <h3 className="text-sm font-bold text-[#FF6B35] border-b border-[#E2E8F0] pb-2 mb-3">✏️ नवीन नोंद जोडा</h3>
            
            <form onSubmit={handleAdd} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setType("expense")} className={`py-3 rounded-xl border-2 font-black text-xs transition-all ${type === "expense" ? "bg-red-50 text-red-700 border-red-500" : "bg-[#F8FAFC] text-gray-500 border-gray-200"}`}>📉 खर्च केला</button>
                <button type="button" onClick={() => setType("income")} className={`py-3 rounded-xl border-2 font-black text-xs transition-all ${type === "income" ? "bg-emerald-50 text-emerald-700 border-emerald-500" : "bg-[#F8FAFC] text-gray-500 border-gray-200"}`}>📈 पैसे आले</button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#64748B] mb-1">कशासाठी खर्च/जमा केला?</label>
                <input type="text" placeholder="उदा. किराणा, भाजीपाला, दूध" className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#FF6B35]" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-bold text-[#64748B]">किती रुपये? (₹)</label>
                  {amountInput && evaluateExpression(amountInput) > 0 && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                      = ₹{evaluateExpression(amountInput).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <input type="text" placeholder="उदा. 3551+1990" className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#FF6B35] font-mono font-bold" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#64748B] mb-1">वर्ग निवडा</label>
                <select className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm bg-white" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              {error && <p className="text-xs font-bold text-red-600">⚠️ {error}</p>}

              <button type="submit" className="w-full h-11 bg-[#FF6B35] text-white font-black text-sm rounded-xl shadow-md hover:bg-[#FF6B35]/90 transition-all">
                ✅ नोंद सुरक्षित करा
              </button>
            </form>
          </div>

          {/* LEDGER TRANSACTIONS LIST */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-sm min-h-[350px]">
            <h3 className="text-sm font-bold text-[#1A1A1A] border-b border-[#E2E8F0] pb-2 mb-3 flex justify-between items-center">
              <span>📋 हishob Vahi ({MONTHS_LIST.find(m => m.key === selectedMonth)?.label})</span>
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-bold">{currentMonthTx.length} नोंदी</span>
            </h3>

            <div className="space-y-2">
              {currentMonthTx.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl bg-white shadow-sm">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm shrink-0 ${tx.type === "income" ? "bg-emerald-50" : "bg-red-50"}`}>
                      {tx.type === "income" ? "💵" : "💸"}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#1A1A1A] truncate">{tx.title}</h4>
                      <span className="text-[9px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                        {CATEGORIES.find(c => c.value === tx.category)?.label.split(" ")[1] ?? tx.category} · {tx.date}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-black font-mono ${tx.type === "income" ? "text-emerald-700" : "text-red-700"}`}>
                      {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                    </span>
                    <button type="button" onClick={() => handleDelete(tx.id)} className="h-7 w-7 bg-red-50 text-red-600 rounded-lg flex items-center justify-center text-xs print:hidden">🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            {!isPremiumUnlocked && (
              <div className="mt-6 border-2 border-dashed border-purple-200 bg-purple-50/40 p-4 rounded-2xl text-center print:hidden">
                <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider">📊 Full Asset Balance Sheet Framework</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">वन-टाईम फक्त ₹९९ देऊन पूर्ण वर्षाचा रिपोर्ट, प्रिमियम पाई-चार्ट्स आणि थेट एक्सेल/पीडीएफ बॅलन्स शीट डाऊनलोडचा ॲक्सेस मिळवा.</p>
                <button type="button" onClick={() => setShowPaywall(true)} className="mt-2.5 h-8 px-4 bg-purple-700 text-white font-bold text-xs rounded-xl shadow">₹९९ मध्ये अनलॉक करा 🔒</button>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* PAYWALL */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center">
            <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-bold mb-3">👑 Upgrade Ledger</span>
            <h3 className="text-lg font-black text-[#1A1A1A]">प्रिमियम हिशोब वही फीचर्स</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">पूर्ण बॅलन्स शीट, महिनावार पाई-चार्ट्स आणि डाऊनलोड करण्यासाठीचा अधिकृत सुरक्षित ॲक्सेस मिळवा.</p>
            <div className="mt-5 space-y-2">
              <button type="button" onClick={() => { setIsPremiumUnlocked(true); setShowPaywall(false); }} className="w-full h-10 bg-purple-700 text-white font-bold text-xs rounded-xl shadow">Simulate Payment (Pay ₹99)</button>
              <button type="button" onClick={() => setShowPaywall(false)} className="w-full h-10 bg-white border border-gray-200 text-xs text-gray-500 font-bold rounded-xl">मागे जा</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}