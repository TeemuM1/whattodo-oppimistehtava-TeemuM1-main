export default function Dashboard() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
          {/* Header section */}
          <div className="w-full max-w-3xl bg-primary text-white rounded-lg shadow-lg p-8 text-center">
              <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
              <p className="text-lg">
                  Welcome to the dashboard!
              </p>
          </div>
      </div>
  );
}
