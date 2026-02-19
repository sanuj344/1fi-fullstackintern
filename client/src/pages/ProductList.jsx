import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

export default function ProductList() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${apiUrl}/api/products`);
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        const data = await response.json();
        if (!isActive) return;
        setProducts(data.data || []);
      } catch (err) {
        if (!isActive) return;
        setError(err.message || "Something went wrong");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isActive = false;
    };
  }, [apiUrl]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Product EMI Platform
            </p>
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Explore Products
            </h1>
          </div>
          <span className="text-xs text-slate-500">API: {apiUrl}</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-72 animate-pulse rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="h-40 rounded-xl bg-slate-200" />
                <div className="mt-4 h-4 w-2/3 rounded-full bg-slate-200" />
                <div className="mt-2 h-3 w-1/2 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold text-red-600">Unable to load products</p>
            <p className="mt-2 text-sm text-slate-600">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
            No products available yet. Please check back soon.
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="group rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="h-44 overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <h2 className="text-base font-semibold text-slate-900">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(toNumber(product.price))}
                    </span>
                    <span className="text-slate-400 line-through">
                      {formatCurrency(toNumber(product.mrp))}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
