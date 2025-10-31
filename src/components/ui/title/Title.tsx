

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`${className}  `}>
      <h1 className="antialiased text-2xl font-bold text-primary">{title}</h1>

      {subtitle && <h2 className="antialiased font-semibold">{subtitle}</h2>}
    </div>
  )
}


