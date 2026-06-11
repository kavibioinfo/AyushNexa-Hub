"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import RazorpayButton from "@/components/RazorpayButton";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  monthKey: string;
}

const CATEGORIES = [
  { value: "किराणा / अन्न", label: "🛒 किराणा / जेवण" },
  { value: "बिल / लाईट", label: "💡 लाईट / पाणी बिल" },
  { value: "शिक्षण / फी", label: "🎒 मुलांची फी" },
  { value: "पगार / उत्पन्न", label: "💵 पगार / उत्पन्न" },
  { value: "वैद्यकीय / औषधे", label: "💊 औषधे / डॉक्टर" },
  { value: "कपडे", label: "👗 कपडे / चप्पल" },
  { value: "इतर खर्च", label: "📦 इतर खर्च" },
];

const MONTHS_LIST = [
  { key: "2026-06", label: "जून २०२६" },
  { key: "2026-05", label: "मे २०२६" },
  { key: "2026-04", label: "एप्रिल २०२६" },
  { key: "2026-03", label: "मार्च २०२६" },
];

// Colors for pie chart categories
const COLORS = ["#FF6B35", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#06B6D4"];

export default function ExpenseTracker() {
  const [isMounted, setIsMounted] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState("2026-06");
  const [openingBalance, setOpeningBalance] = useState<number>(25000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [title, setTitle] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [error, setError] = useState("");

  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTx = localStorage.getItem("ayushnexa_ledger_data");
    const savedOpening = localStorage.getItem("ayushnexa_opening_balance");
    const savedPremium = localStorage.getItem("expense_tracker_premium");

    if (savedPremium === "true") {
      setIsPremiumUnlocked(true);
    }

    if (savedTx) {
      setTransactions(JSON.parse(savedTx));
    } else {
      setTransactions([
        {
          id: 1,
          title: "college fees",
          amount: 10000,
          type: "expense",
          category: "शिक्षण / फी",
          date: "3/6/2026",
          monthKey: "2026-06",
        },
        {
          id: 2,
          title: "payment",
          amount: 35000,
          type: "income",
          category: "किराणा / अन्न",
          date: "3/6/2026",
          monthKey: "2026-06",
        },
      ]);
    }

    if (savedOpening !== null) {
      setOpeningBalance(Number(savedOpening));
    } else {
      setOpeningBalance(0);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("ayushnexa_ledger_data", JSON.stringify(transactions));
    }
  }, [transactions, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("ayushnexa_opening_balance", openingBalance.toString());
    }
  }, [openingBalance, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("expense_tracker_premium", isPremiumUnlocked.toString());
    }
  }, [isPremiumUnlocked, isMounted]);

  const evaluateExpression = (input: string): number => {
    const sanitized = input.replace(/[^0-9+\-*/.]/g, "");
    try {
      const result = new Function(`return ${sanitized}`)();
      return typeof result === "number" && !isNaN(result) ? result : 0;
    } catch {
      return 0;
    }
  };

  const currentMonthTx = transactions.filter((t) => t.monthKey === selectedMonth);
  const totalIncome = currentMonthTx
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = currentMonthTx
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const netBalance = openingBalance + totalIncome - totalExpense;

  // Prepare data for pie chart (expense by category)
  const expenseByCategory = currentMonthTx
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expenseByCategory).map(([cat, amt]) => ({
    name: cat,
    value: amt,
  }));

  // Prepare data for monthly trend (last 4 months)
  const monthlyTrend = MONTHS_LIST.map((month) => {
    const monthTx = transactions.filter((t) => t.monthKey === month.key);
    const income = monthTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = monthTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return {
      month: month.label,
      उत्पन्न: income,
      खर्च: expense,
    };
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("तपशील लिहा (उदा. भाजीपाला)");
      return;
    }

    const finalAmount = evaluateExpression(amountInput);
    if (finalAmount <= 0) {
      setError("कृपया योग्य रक्कम किंवा बेरीज लिहा");
      return;
    }
    setError("");

    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    const newTx: Transaction = {
      id: Date.now(),
      title: title.trim(),
      amount: finalAmount,
      type,
      category,
      date: formattedDate,
      monthKey: selectedMonth,
    };

    setTransactions([newTx, ...transactions]);
    setTitle("");
    setAmountInput("");
  };

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleClearAll = () => {
    if (confirm("तुम्हाला या महिन्याचा संपूर्ण जुना हिशोब साफ करायचा आहे का?")) {
      setTransactions(transactions.filter((t) => t.monthKey !== selectedMonth));
    }
  };

  const handlePaymentSuccess = () => {
    setIsPremiumUnlocked(true);
    setShowPaywall(false);
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-[#FFF8F0]" />;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#1A1A1A] antialiased print:bg-white pb-12">
      <div className="print:hidden">
        <Header />
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Header (unchanged) */}
        <div className="bg-[#FF6B35] text-white p-5 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="font-sans text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
              🪙 घरगुती हिशोब वही
            </h1>
            <p className="text-white/90 text-base sm:text-lg mt-1">
              मोबाईल मेमरी आणि कॅल्क्युलेटर लॉक आहे.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={handleClearAll}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition-all"
            >
              🧹 डेटा साफ करा
            </button>
            <button
              type="button"
              onClick={() => (isPremiumUnlocked ? window.print() : setShowPaywall(true))}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-[#10B981] text-white font-bold text-base shadow hover:bg-[#10B981]/90 transition-all"
            >
              {isPremiumUnlocked ? "📥 Download" : "Unlock Full App 🔒"}
            </button>
          </div>
        </div>

        {/* Months selector (unchanged) */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-5 scrollbar-none print:hidden">
          {MONTHS_LIST.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setSelectedMonth(m.key)}
              className={`px-6 py-3 rounded-full text-base font-bold transition-all shrink-0 border ${
                selectedMonth === m.key
                  ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow"
                  : "bg-white text-[#64748B] border-[#E2E8F0]"
              }`}
            >
              📅 {m.label}
            </button>
          ))}
        </div>

        {/* Metrics cards (unchanged) */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="bg-white border border-[#FF6B35]/20 rounded-xl p-4 shadow-sm flex flex-col justify-center">
            <label className="block text-sm font-black uppercase text-[#64748B] tracking-wider mb-1">
              🏦 मुख्य शिल्लक
            </label>
            <input
              type="number"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg text-xl font-black text-[#0F172A] outline-none focus:border-[#FF6B35]"
              value={openingBalance}
              onChange={(e) => setOpeningBalance(Number(e.target.value))}
            />
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center flex flex-col justify-center">
            <span className="text-sm font-black uppercase text-emerald-700">📈 एकूण जमा</span>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-800 mt-1">+₹{totalIncome.toLocaleString("en-IN")}</h3>
          </div>
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center flex flex-col justify-center">
            <span className="text-sm font-black uppercase text-red-700">📉 एकूण खर्च</span>
            <h3 className="text-2xl sm:text-3xl font-black text-red-800 mt-1">-₹{totalExpense.toLocaleString("en-IN")}</h3>
          </div>
          <div
            className={`p-4 rounded-xl text-center text-white flex flex-col justify-center ${
              netBalance >= 0 ? "bg-[#1A1A2E]" : "bg-red-900"
            }`}
          >
            <span className="text-sm font-black uppercase opacity-80">👛 निव्वळ शिल्लक</span>
            <h3 className="text-2xl sm:text-3xl font-black mt-1">₹{netBalance.toLocaleString("en-IN")}</h3>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Input form (unchanged) */}
          <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm h-fit print:hidden">
            <h3 className="text-xl font-black text-[#FF6B35] border-b border-[#E2E8F0] pb-2 mb-4">✏️ नवीन नोंद जोडा</h3>
            <form onSubmit={handleAdd} className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType("expense")}
                  className={`py-4 rounded-xl border-2 font-bold text-base transition-all ${
                    type === "expense" ? "bg-red-50 text-red-700 border-red-500" : "bg-[#F8FAFC] text-gray-500 border-gray-200"
                  }`}
                >
                  📉 खर्च केला
                </button>
                <button
                  type="button"
                  onClick={() => setType("income")}
                  className={`py-4 rounded-xl border-2 font-bold text-base transition-all ${
                    type === "income" ? "bg-emerald-50 text-emerald-700 border-emerald-500" : "bg-[#F8FAFC] text-gray-500 border-gray-200"
                  }`}
                >
                  📈 पैसे आले
                </button>
              </div>
              <div>
                <label className="block text-base font-black text-[#64748B] mb-1">कशासाठी खर्च/जमा केला?</label>
                <input
                  type="text"
                  placeholder="उदा. किराणा, भाजीपाला, दूध"
                  className="w-full rounded-lg border border-[#E2E8F0] p-3 text-base outline-none focus:border-[#FF6B35]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-base font-black text-[#64748B]">किती रुपये? (₹)</label>
                  {amountInput && evaluateExpression(amountInput) > 0 && (
                    <span className="text-sm bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                      = ₹{evaluateExpression(amountInput).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="उदा. 3551+1990"
                  className="w-full rounded-lg border border-[#E2E8F0] p-3 text-lg outline-none focus:border-[#FF6B35] font-mono font-bold"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-base font-black text-[#64748B] mb-1">वर्ग निवडा</label>
                <select
                  className="w-full rounded-lg border border-[#E2E8F0] p-3 text-base bg-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              {error && <p className="text-base font-bold text-red-600">⚠️ {error}</p>}
              <button
                type="submit"
                className="w-full py-4 bg-[#FF6B35] text-white font-black text-lg rounded-xl shadow-md hover:bg-[#FF6B35]/90 transition-all"
              >
                ✅ नोंद सुरक्षित करा
              </button>
            </form>
          </div>

          {/* LEDGER & PREMIUM ANALYTICS */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transactions list (unchanged) */}
            <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm">
              <h3 className="text-xl font-black text-[#1A1A1A] border-b border-[#E2E8F0] pb-2 mb-4 flex justify-between items-center flex-wrap gap-2">
                <span>📋 हिशोब वही ({MONTHS_LIST.find((m) => m.key === selectedMonth)?.label})</span>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-bold">
                  {currentMonthTx.length} नोंदी
                </span>
              </h3>
              <div className="space-y-3">
                {currentMonthTx.map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center text-xl shrink-0 ${tx.type === "income" ? "bg-emerald-50" : "bg-red-50"}`}>
                        {tx.type === "income" ? "💵" : "💸"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-lg font-black text-[#1A1A1A] break-words">{tx.title}</h4>
                        <span className="text-sm font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded mt-0.5 inline-block">
                          {CATEGORIES.find((c) => c.value === tx.category)?.label.split(" ")[1] ?? tx.category} · {tx.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-lg sm:text-xl font-black font-mono ${tx.type === "income" ? "text-emerald-700" : "text-red-700"}`}>
                        {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
                      </span>
                      <button onClick={() => handleDelete(tx.id)} className="h-10 w-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center text-base print:hidden">
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upsell (if not premium) */}
              {!isPremiumUnlocked && (
                <div className="mt-6 border-2 border-dashed border-purple-200 bg-purple-50/40 p-5 rounded-2xl text-center print:hidden">
                  <h4 className="text-base font-black text-purple-950 uppercase tracking-wider">📊 Full Asset Balance Sheet Framework</h4>
                  <p className="text-base text-gray-600 mt-1">
                    वन-टाईम फक्त ₹९९ देऊन पूर्ण वर्षाचा रिपोर्ट, प्रिमियम पाई-चार्ट्स आणि थेट एक्सेल/पीडीएफ बॅलन्स शीट डाऊनलोडचा ॲक्सेस मिळवा.
                  </p>
                  <RazorpayButton
                    productId="expense_tracker"
                    amount={99}
                    productName="Expense Tracker Premium"
                    label="₹९९ मध्ये अनलॉक करा 🔒"
                    onSuccess={handlePaymentSuccess}
                  />
                </div>
              )}
            </div>

            {/* PREMIUM ANALYTICS SECTION (only shown after unlock) */}
            {isPremiumUnlocked && (
              <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-sm space-y-6 print:hidden">
                <h3 className="text-xl font-black text-[#1A1A1A] border-b border-[#E2E8F0] pb-2 mb-4 flex items-center gap-2">
                  📊 प्रिमियम विश्लेषण (Premium Analytics)
                </h3>

                {/* Pie chart: expense by category */}
                {pieData.length > 0 ? (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-sm mb-3 text-center">📈 महिन्यातील खर्चाचे प्रमाण (वर्गानुसार)</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">या महिन्यात अद्याप कोणताही खर्च नोंदवलेला नाही.</p>
                )}

                {/* Bar chart: monthly trend */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-bold text-sm mb-3 text-center">📅 गेल्या ४ महिन्यांची उत्पन्न vs खर्च तुलना</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                      <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
                      <Legend />
                      <Bar dataKey="उत्पन्न" fill="#10B981" />
                      <Bar dataKey="खर्च" fill="#FF6B35" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Additional insights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-emerald-50 p-3 rounded-lg">
                    <p className="font-bold text-emerald-800">💡 सर्वाधिक खर्च कोणत्या वर्गात?</p>
                    <p className="text-gray-700 mt-1">
                      {pieData.length > 0
                        ? pieData.reduce((a, b) => (a.value > b.value ? a : b)).name
                        : "अद्याप खर्च नाही"}
                    </p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="font-bold text-amber-800">🎯 सरासरी मासिक बचत</p>
                    <p className="text-gray-700 mt-1">
                      ₹
                      {Math.round(
                        monthlyTrend.reduce((acc, m) => acc + (m.उत्पन्न - m.खर्च), 0) /
                          Math.max(monthlyTrend.filter((m) => m.उत्पन्न > 0 || m.खर्च > 0).length, 1)
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Paywall modal (unchanged) */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center">
            <span className="inline-block bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full font-bold mb-3">
              👑 Upgrade Ledger
            </span>
            <h3 className="text-xl font-black text-[#1A1A1A]">प्रिमियम हिशोब वही फीचर्स</h3>
            <p className="text-base text-gray-500 mt-2 leading-relaxed">
              पूर्ण बॅलन्स शीट, महिनावार पाई-चार्ट्स आणि डाऊनलोड करण्यासाठीचा अधिकृत सुरक्षित ॲक्सेस मिळवा.
            </p>
            <div className="mt-5 space-y-2">
              <RazorpayButton
                productId="expense_tracker"
                amount={99}
                productName="Expense Tracker Premium"
                label="Pay ₹99 & Unlock"
                onSuccess={handlePaymentSuccess}
              />
              <button onClick={() => setShowPaywall(false)} className="w-full py-3 bg-white border border-gray-200 text-base text-gray-500 font-bold rounded-xl">
                मागे जा
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}