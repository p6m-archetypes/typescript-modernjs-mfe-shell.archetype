import '../styles/globals.css';

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to {{ project-title }}
          </h1>
          <h3 className="text-2xl font-bold tracking-tight sm:text-4xl">
            {{ project-name }}
          </h3>
          <p className="text-lg text-foreground/80 max-w-lg mx-auto">
            A Modern.js micro-frontend shell with Tailwind CSS, ready for hosting multiple applications.
          </p>
          <div className="flex gap-4 justify-center">
            <div className="px-4 py-2 bg-foreground text-background rounded-lg font-medium">
              Shell Ready
            </div>
            <div className="px-4 py-2 border border-foreground/20 rounded-lg font-medium">
              Add Micro-Frontends
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
