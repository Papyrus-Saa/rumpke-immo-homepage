
export default function GlobalBorderColor() {

  return (
    <>
      <div
        className="fixed bottom-0 right-0 z-20 w-full h-px bg-primary dark:bg-primary-dark"
        style={{
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-dark), var(--color-primary))',
          backgroundSize: '200% 100%',
          WebkitTextFillColor: 'transparent',
          animation: 'rumpke-company-glow 8s linear infinite',
          fontWeight: 600,
          letterSpacing: '0.04em',
          borderRadius: '0.5em',
          display: 'inline-block',
        }}
      />
      <style>
        {`
          @keyframes rumpke-company-glow {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
        `}
      </style>
    </>
  );
}
