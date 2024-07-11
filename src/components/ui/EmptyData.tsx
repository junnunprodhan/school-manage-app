import { IconType } from "react-icons";

interface IEmptyData {
  name: string;
  describtion?: string;
  icon?: IconType;
  children?: React.ReactNode;
}

export default function EmptyData({ children, ...props }: IEmptyData) {
  return (
    <div className="h-72 flex flex-col items-center justify-center gap-6">
      {props.icon && (
        <props.icon className="text-center text-2xl text-gray-600" />
      )}

      <div className="text-center">
        <h2 className="mb-1 text-2xl font-semibold text-white/50">{props.name}</h2>
        {props.describtion && (
          <span className="text-sm text-white/50">{props.describtion}</span>
        )}
      </div>

      {children && (
        <div className="flex items-center justify-center gap-4">{children}</div>
      )}
    </div>
  );
}
