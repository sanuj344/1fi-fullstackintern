import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmiPlanSelector from "../components/EmiPlanSelector.jsx";

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

export default function ProductDetail() {
  const { slug } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [product, setProduct] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${apiUrl}/api/products/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to load product");
        }
        const data = await response.json();
        if (!isActive) return;
        setProduct(data.data);
        if (data.data?.variants?.length) {
          setSelectedVariantId(data.data.variants[0].id);
        }
      } catch (err) {
        if (!isActive) return;
        setError(err.message || "Something went wrong");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isActive = false;
    };
  }, [apiUrl, slug]);

  const selectedVariant = useMemo(() => {
    if (!product?.variants?.length) return null;
    return product.variants.find((variant) => variant.id === selectedVariantId);
  }, [product, selectedVariantId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <div className="space-y-2">
              <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
              <div className="h-6 w-48 animate-pulse rounded-full bg-slate-200" />
            </div>
            <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="aspect-[4/5] w-full animate-pulse rounded-2xl bg-slate-200" />
              <div className="mt-6 space-y-3">
                <div className="h-5 w-2/3 animate-pulse rounded-full bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
                <div className="flex gap-3">
                  <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="h-16 animate-pulse rounded-xl bg-slate-200" />
                  <div className="h-16 animate-pulse rounded-xl bg-slate-200" />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="h-5 w-40 animate-pulse rounded-full bg-slate-200" />
                <div className="mt-2 h-4 w-56 animate-pulse rounded-full bg-slate-200" />
                <div className="mt-5 space-y-3">
                  <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />
                  <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />
                  <div className="h-20 animate-pulse rounded-2xl bg-slate-200" />
                </div>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="h-5 w-32 animate-pulse rounded-full bg-slate-200" />
                <div className="mt-3 h-4 w-64 animate-pulse rounded-full bg-slate-200" />
                <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-slate-200" />
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-red-600">Unable to load product</p>
          <p className="mt-2 text-sm text-slate-600">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">No product data available.</p>
      </div>
    );
  }

  const mrp = toNumber(product.mrp);
  const price = toNumber(product.price);
  const savings = Math.max(mrp - price, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Product EMI Platform
            </p>
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              {product.name}
            </h1>
          </div>
          <span className="text-xs text-slate-500">API: {apiUrl}</span>
        </div>
        <div className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6">
          <Link
            to="/"
            className="text-xs font-semibold text-blue-700 hover:text-blue-800"
          >
            ← Back to products
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 space-y-3">
              <h2 className="text-lg font-semibold text-slate-900">
                {product.name}
                {selectedVariant?.storage ? ` - ${selectedVariant.storage}` : ""}
              </h2>
              <p className="text-sm text-slate-600">{product.description}</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-semibold text-slate-900">
                  {formatCurrency(price)}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  {formatCurrency(mrp)}
                </span>
                {savings > 0 && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Save {formatCurrency(savings)}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-slate-900">
                Select variant
              </h3>
              {product.variants?.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.variants.map((variant) => {
                    const isSelected = variant.id === selectedVariantId;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                          isSelected
                            ? "border-blue-600 bg-blue-50 text-blue-900"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
                        }`}
                      >
                        <p className="font-semibold">{variant.storage}</p>
                        <p className="text-xs text-slate-500">{variant.color}</p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Variants are not available for this product.
                </p>
              )}
            </div>
          </section>

          <section className="space-y-6">
            {product.emiPlans?.length ? (
              <EmiPlanSelector
                plans={product.emiPlans}
                onProceed={(plan) => {
                  if (!plan) return;
                  console.log("Proceed with plan", plan.id);
                }}
              />
            ) : (
              <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
                EMI plans are currently unavailable for this product.
              </div>
            )}

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
