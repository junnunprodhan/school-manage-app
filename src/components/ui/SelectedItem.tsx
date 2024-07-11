import { BiX } from "react-icons/bi";

interface ISelectedItem {
  name: string;
  header?: { id: any; name: string; value: any }[];
  footer?: { id: any; name: string; value: any }[];
  onDelete?: () => void;
}

export default function SelectedItem(props: ISelectedItem) {
  return (
    <div className="px-4 py-2 flex items-center justify-between bg-white/30 border-2 border-white/20 shadow-md rounded-md cursor-pointer select-none">
      <div className="flex flex-col justify-center">
        <h3 className="font-semibold">{props.name}</h3>

        {props.header && (
          <div className="mt-1 grid grid-cols-3 gap-4">
            {props.header?.map((item) => (
              <div className="" key={item.id}>
                <span className="text-xs font-semibold">{item.name}</span>
                <span className="text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {props.footer && (
          <div className="mt-2 text-sm grid grid-cols-2 gap-4">
            {props.footer?.map((item) => (
              <div className="" key={item.id}>
                <span className="text-xs font-semibold">{item.name}</span>
                <span className="text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="button" className="w-6 h-6 grid place-items-center bg-red-500/50 rounded-full hover:bg-red-500/75" onClick={props.onDelete}>
        <BiX />
      </button>
    </div>
  );
}
