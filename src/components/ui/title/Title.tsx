

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className="antialiased text-2xl font-bold my-10 ">{title}</h1>


      {subtitle && <h2 className="antialiased font-semibold  ">{subtitle}</h2>}
    </div>
  )
}

export default Title
