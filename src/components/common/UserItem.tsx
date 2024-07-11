import { Link } from "react-router-dom";
import { Avater } from "../ui";

interface IUserItem {
  name: string;
  img?: string;
  href: any;
  children?: React.ReactNode;
}

export default function UserItem(props: IUserItem) {
  return (
    <Link className="flex items-center gap-2" to={props.href}>
      <Avater src={props.img} width={20} height={20} />
      <div className="">
        <span className="text-sm">{props.name}</span>
        {props.children}
      </div>
    </Link>
  );
}
