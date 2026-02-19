export default function App() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

  return (
    <main className="app">
      <header className="app__header">
        <h1>Product EMI Platform</h1>
        <p>Frontend is ready. API base: {apiUrl}</p>
      </header>
      <section className="app__content">
        <div className="card">
          <h2>Next steps</h2>
          <ul>
            <li>Connect product catalog</li>
            <li>Configure EMI plan calculations</li>
            <li>Integrate checkout and approvals</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
