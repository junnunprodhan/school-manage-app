import { Link } from "react-router-dom";
import { SIDEBAR_MENUS } from "../../../constances";
import "./Sidebar.scss";

interface ISidebarItem {
  item: (typeof SIDEBAR_MENUS)[0];
  pathname: string;
  active?: boolean;
  onClick: (path: string) => void;
}

export default function SidebarItem({ item, pathname, active, onClick }: ISidebarItem) {
  return (
    <div className="sidebar-dropdown" key={item.name}>
      <div
        className={`sidebar-dropdown-head`}
        onClick={() => onClick(item.paths[0])}
      >
        <item.icon />
        <span>{item.name}</span>
      </div>

      {active && (
        <div className="sidebar-dropdown-content">
          <div className="sidebar-dropdown-content-indicator"></div>

          {item.menus.map((menu) => (
            <Link
              className={`sidebar-dropdown-item ${
                pathname === menu.path && "sidebar-dropdown-item-active"
              }`}
              to={menu.path}
              onClick={() => onClick(menu.path)}
              key={menu.name}
            >
              {menu.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
