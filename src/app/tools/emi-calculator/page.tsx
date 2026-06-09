"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"

export default function EMICalculator() {
  // 🔢 INPUT STATES
  const [loanAmount, setLoanAmount] = useState<number>(250000)
  const [interestRate, setInterestRate] = useState<number>(11)
  const [tenure, setTenure] = useState<number>(8)

  // 📊 OUTPUT STATES
  const [monthlyEMI, setMonthlyEMI] = useState<number>(0)
  const [computedInterest, setComputedInterest] = useState<number>(0)
  const [totalPayment, setTotalPayment] = useState<number>(0)

  // 🧮 MATHEMATICAL CALCULATION ENGINE
  useEffect(() => {
    const principal = loanAmount
    const monthlyRate = interestRate / 12 / 100
    const numberOfMonths = tenure * 12

    if (principal > 0 && interestRate > 0 && tenure > 0) {
      const emi = 
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / 
        (Math.pow(1 + monthlyRate, numberOfMonths) - 1)
      
      const totalPay = emi * numberOfMonths
      const totalInt = totalPay - principal

      setMonthlyEMI(Math.round(emi))
      setTotalPayment(Math.round(totalPay))
      setComputedInterest(Math.round(totalInt))
    } else {
      setMonthlyEMI(0)
      setTotalPayment(0)
      setComputedInterest(0)
    }
  }, [loanAmount, interestRate, tenure])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* BREADCRUMB */}
        <div className="text-sm text-[#64748B] mb-4">
          Tools &rarr; Personal &rarr; <span className="text-[#2563EB] font-medium">Easy Loan EMI Calculator</span>
        </div>

        {/* HEADLINE */}
        <div className="mb-10">
          <h1 className="font-sans text-3xl font-black tracking-tight sm:text-4xl">
            📊 Easy Loan EMI Calculator
          </h1>
          <p className="text-[#64748B] mt-2">Calculate your Home, Car, or Personal Loan EMI accurately with detailed principal and interest breakup sheets.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          
          {/* LEFT SIDE: INPUT PARAMETERS PANEL */}
          <div className="md:col-span-1 bg-white border border-[#E2E8F0] rounded-xl p-6 h-fit shadow-sm space-y-5">
            <h2 className="text-md font-bold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0] pb-2">Loan Parameters</h2>
            
            {/* LOAN AMOUNT */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase text-[#0F172A]">Loan Amount (₹)</label>
                <span className="text-xs font-bold text-[#2563EB] bg-[#2563EB]/5 px-2 py-0.5 rounded">₹{loanAmount.toLocaleString("en-IN")}</span>
              </div>
              <input 
                type="number" 
                className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB]"
                value={loanAmount || ""}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
            </div>

            {/* INTEREST RATE */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase text-[#0F172A]">Interest Rate (% P.A.)</label>
                <span className="text-xs font-bold text-[#2563EB] bg-[#2563EB]/5 px-2 py-0.5 rounded">{interestRate}%</span>
              </div>
              <input 
                type="number" 
                step="0.1"
                className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB]"
                value={interestRate || ""}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>

            {/* TENURE YEARS */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase text-[#0F172A]">Loan Tenure (Years)</label>
                <span className="text-xs font-bold text-[#2563EB] bg-[#2563EB]/5 px-2 py-0.5 rounded">{tenure} Yrs</span>
              </div>
              <input 
                type="number" 
                className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB]"
                value={tenure || ""}
                onChange={(e) => setTenure(Number(e.target.value))}
              />
            </div>
          </div>

          {/* RIGHT SIDE: REALTIME DISPLAY CARDS */}
          <div className="md:col-span-2 space-y-4">
            
            {/* MONTHLY EMI DISPLAY CARD */}
            <div className="bg-[#0F172A] text-white rounded-xl p-8 border border-[#0F172A] shadow-md flex flex-col justify-between items-center text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Your Estimated Monthly EMI</span>
              <h2 className="font-sans text-4xl sm:text-5xl font-black mt-3 text-white tracking-tight">
                ₹{monthlyEMI.toLocaleString("en-IN")} <span className="text-lg font-normal text-[#64748B]">/ Month</span>
              </h2>
            </div>

            {/* DETAILED STATS BREAKUP SHEET */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm grid grid-cols-2 gap-4">
              <div className="border-r border-[#E2E8F0] pr-2">
                <span className="text-xs font-bold uppercase text-[#64748B] block">Principal Amount</span>
                <span className="text-lg font-black text-[#0F172A] mt-1 block font-sans">₹{loanAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="pl-2">
                <span className="text-xs font-bold uppercase text-[#64748B] block">Total Interest Payable</span>
                <span className="text-lg font-black text-[#10B981] mt-1 block font-sans">₹{computedInterest.toLocaleString("en-IN")}</span>
              </div>
              <div className="col-span-2 border-t border-[#E2E8F0] pt-4 mt-2">
                <span className="text-xs font-bold uppercase text-[#64748B] block">Total Amount (Principal + Interest)</span>
                <span className="text-xl font-black text-[#0F172A] mt-1 block font-sans">₹{totalPayment.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#2563EB]/5 border border-[#2563EB]/20 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="font-sans font-bold text-sm text-[#0F172A]">Facing issues with Bank Loan Approvals?</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Get a free, hassle-free consultation from AyushNexa's financial advisory partners.</p>
              </div>
              <a 
                href="https://wa.me/91XXXXXXXXXX?text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-4 bg-[#0F172A] text-white text-xs font-bold rounded-lg flex items-center justify-center shadow"
              >
                Connect on WhatsApp &rarr;
              </a>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}