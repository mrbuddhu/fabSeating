'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          * { box-sizing: border-box; }
          body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f0f7f7; font-family: system-ui, sans-serif; padding: 24px; }
          .box { max-width: 400px; text-align: center; }
          h1 { font-size: 1.5rem; font-weight: 700; color: #1a2c2d; margin-bottom: 8px; }
          p { color: #2d5859; margin-bottom: 24px; }
          button { padding: 12px 24px; background: #326c6d; color: #fff; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; }
        `}</style>
      </head>
      <body>
        <div className="box">
          <h1>Something went wrong</h1>
          <p>The page could not load. Please try again.</p>
          <button type="button" onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  )
}
