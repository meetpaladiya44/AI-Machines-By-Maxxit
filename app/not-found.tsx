import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm">
        404
        <span className="h-1 w-1 rounded-full bg-zinc-300" />
        Page not found
      </div>
      <h1 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
        This page doesn’t exist.
      </h1>
      <p className="mt-3 max-w-xl text-balance text-sm text-zinc-600 sm:text-base">
        The link may be broken, or the page may have moved. Use the homepage to
        continue exploring.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800"
        >
          Go to homepage
        </Link>
        <Link
          href="#features"
          className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50"
        >
          View features
        </Link>
      </div>
    </main>
  );
}

