import {IconType} from "react-icons";

export interface IStatusCard {
  name: string,
  icon: IconType,
  style: string,
  value: number,
}

export default function StatusCard(props: IStatusCard) {
  return (
    <div className={`h-32 px-4 py-4 flex items-center justify-between border-2 ${props.style} rounded-md shadow-lg cursor-pointer transition-all hover:scale-110`}>
      <div className="">
        <h3 className="mb-2 font-semibold">{props.name}</h3>
        <span className="text-4xl">{props.value}</span>
      </div>
      <div className="pr-4">
        <props.icon className="text-6xl"/>
      </div>
    </div>
  )
}