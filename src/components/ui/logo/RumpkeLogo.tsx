
import Image from "next/image";


export const RumpkeLogo = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const width = props.width ? Number(props.width) : 180;
  const height = props.height ? Number(props.height) : 45;
  return (
    <Image
      src="/imgs/logo-truncated.png"
      alt="Rumpke Immobilien Logo"
      width={width}
      height={height}
      style={props.style}
      className={props.className}
      priority
    />
  );
};
