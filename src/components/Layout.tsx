import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl text-primary">
              My Blog
            </Link>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-primary">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-primary">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
