import Image from "next/image";

export default function Home() {
  return (
    <main>
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Manage your time,
              <span className="block text-blue-600">effortlessly.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A beautiful calendar app designed to help you organize your schedule,
              track your events, and make the most of every day.
            </p>
          </div>

          {/* <div className="max-w-3xl mx-auto mb-20">
            <EventCard events={sampleEvents} />
          </div> */}

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div> */}
        </section>
      </main>
  );
}
