import { IconType } from "react-icons";
import ImageBase64 from "./ImageBase64";

interface IAvater extends React.ImgHTMLAttributes<HTMLImageElement> {
  icon?: IconType,
  variant?: "sm" | "big";
}

export default function Avater({ variant, ...props }: IAvater) {
  return (
    <div
      className={`grid bg-white/30 border-2 border-white/20 rounded-full overflow-hidden ${
        variant === "big" ? "w-20 h-20" : "w-8 h-8"
      } ${props.icon ? "place-items-center": ""}`}
    >
      {props.icon ? <props.icon/> : <ImageBase64 className="w-full h-full" {...props} />}
    </div>
  );
}
