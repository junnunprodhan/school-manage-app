import { BiChevronLeft } from "react-icons/bi";
import { ButtonIcon } from "../../ui";

interface INavigation {
  name?: string;
  back?: string;
  renderRight?: () => React.ReactNode;
  children?: React.ReactNode;
}

export default function Navigation(props: INavigation) {
  return (
    <div className="backdrop-blur-xl bg-white/10 border-b-2 border-b-gray-300 select-none">
      <div className="container h-12 flex items-center justify-between gap-4">
        <div className="flex-none flex items-center gap-4">
          {props.back && <ButtonIcon icon={BiChevronLeft} to={props.back} />}
          <h3 className="text-sm font-semibold cursor-default">{props.name}</h3>
        </div>

        <div className="flex-grow">{props.children}</div>

        <div className="flex-none flex items-center gap-4">{props.renderRight && props.renderRight()}</div>
      </div>
    </div>
  );
}
