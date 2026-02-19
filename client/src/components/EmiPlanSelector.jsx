import { useMemo, useState } from "react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);

const toNumber = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  return 0;
};

export default function EmiPlanSelector({ plans = [], onProceed }) {
  const [selectedId, setSelectedId] = useState(plans[0]?.id ?? null);

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedId) ?? null,
    [plans, selectedId]
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Choose your EMI plan</h3>
          <p className="mt-1 text-sm text-slate-600">
            Flexible tenures with 0% interest options and cashback benefits.
          </p>
        </div>
        {selectedPlan && (
          <div className="rounded-xl bg-slate-50 px-4 py-2 text-right">
            <p className="text-xs font-medium text-slate-500">Selected EMI</p>
            <p className="text-lg font-semibold text-slate-900">
              {formatCurrency(toNumber(selectedPlan.monthlyAmount))}
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 space-y-3">
        {plans.map((plan) => {
          const isSelected = plan.id === selectedId;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedId(plan.id)}
              className={`w-full rounded-2xl border px-4 py-4 text-left transition sm:px-5 ${
                isSelected
                  ? "border-blue-600 bg-blue-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-blue-200"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {plan.tenureMonths} months EMI
                  </p>
                  <p className="text-xs text-slate-500">
                    {plan.interestRate}% interest · Cashback {formatCurrency(toNumber(plan.cashback))}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-slate-900">
                    {formatCurrency(toNumber(plan.monthlyAmount))}
                  </p>
                  <p className="text-xs text-slate-500">per month</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onProceed?.(selectedPlan)}
        className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
      >
        Proceed
      </button>
    </div>
  );
}
