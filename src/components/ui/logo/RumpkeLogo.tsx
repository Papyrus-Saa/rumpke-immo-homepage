
import Image from "next/image";

export default function RumpkeLogo(props: { style?: React.CSSProperties; className?: string }) {
  return (
    <div style={{ position: 'relative', width: '280px', height: '170px' }}>
      <Image
        src="/imgs/logo-truncated.png"
        alt="Rumpke Immobilien Logo"
        fill
        sizes="(max-width: 768px) 160px, 320px"
        style={{ objectFit: 'cover', ...props.style }}
        className={props.className}
        priority
      />
    </div>
  );
};
