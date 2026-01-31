import Dashboard from "./pages/home/page";

export default function Home() {
  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Manage your time,
            <span className="block text-blue-600">effortlessly.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A beautiful calendar app designed to help you organize your
            schedule, track your events, and make the most of every day.
          </p>
        </div>
      </section>
      <Dashboard />
    </main>
  );
}
