export default function App() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const emiPlans = [
    { tenure: 3, interest: 0, monthly: 10833, cashback: 500 },
    { tenure: 6, interest: 0, monthly: 5625, cashback: 750 },
    { tenure: 12, interest: 10.5, monthly: 3575, cashback: 1000 },
    { tenure: 18, interest: 10.5, monthly: 2550, cashback: 1500 }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Product EMI Platform
            </p>
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Nova X1 5G
            </h1>
          </div>
          <span className="text-xs text-slate-500">API: {apiUrl}</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100">
              <img
                src="https://images.example.com/phones/nova-x1-5g.jpg"
                alt="Nova X1 5G"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Nova X1 5G - 256GB
              </h2>
              <p className="text-sm text-slate-600">
                6.6-inch AMOLED, 120Hz, 50MP triple camera, 5000mAh battery.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-semibold text-slate-900">₹38,999</span>
                <span className="text-sm text-slate-400 line-through">₹44,999</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Save ₹6,000
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                  256GB
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                  Arctic Blue
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                  5G Ready
                </span>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Choose your EMI plan</h3>
              <p className="mt-1 text-sm text-slate-600">
                Flexible tenures with 0% interest options and cashback benefits.
              </p>

              <div className="mt-5 space-y-3">
                {emiPlans.map((plan) => (
                  <div
                    key={plan.tenure}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {plan.tenure} months EMI
                      </p>
                      <p className="text-xs text-slate-500">
                        {plan.interest}% interest · Cashback ₹{plan.cashback}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-900">₹{plan.monthly}</p>
                      <p className="text-xs text-slate-500">per month</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Why buy on EMI?</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Instant approval and flexible tenures.</li>
                <li>Zero upfront payment with select plans.</li>
                <li>Cashback and offers on select banks.</li>
              </ul>
              <button className="mt-5 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
                Continue with EMI
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
