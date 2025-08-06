export default function HomePage() {
  return (
     <div className="min-h-screen w-full bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {{ project-title }}
            </h1>
            <nav className="space-x-4">
              <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
              <a href="/app1" className="text-blue-600 hover:text-blue-800">App 1</a>
              <a href="/app2" className="text-blue-600 hover:text-blue-800">App 2</a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="mx-auto px-8">
        <div id="mf-container" className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-500">Microfrontend content will be rendered here</p>
          </div>
        </div>
      </main>
    </div>
  );
}