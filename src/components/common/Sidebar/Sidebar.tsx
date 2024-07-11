import { useState } from "react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { SIDEBAR_MENUS } from "../../../constances";
import "./Sidebar.scss";
import { Avater } from "../../ui";
import { BiUser } from "react-icons/bi";
import { useAuth } from "../../../contexts/AuthContext";


interface ISidebar {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar(props: ISidebar) {
  const auth = useAuth();
  const [pathname, setPathname] = useState(useLocation().pathname);

  return (
    <aside className="sidebar">
      <div
        className={`sidebar-container scroll-y ${
          props.showSidebar ? "sidebar-show" : "sidebar-hide"
        }`}
      >
        <div className="sidebar-user">
          <Avater icon={BiUser} />

          <div className="sidebar-user-info">
            <h3 className="sidebar-user-name">{auth.data.name}</h3>
            <span className="sidebar-user-id">ID: {auth.data.school_id}</span>
          </div>
        </div>

        {SIDEBAR_MENUS.map((item) => (
          <SidebarItem
          item={item}
          pathname={pathname}
          active={item.paths.some((path) => pathname === path)}
          onClick={(path: string) => setPathname(path)}
          key={item.name}
          />
        ))}
      </div>

      {props.showSidebar && <div className="sidebar-overlay" onClick={props.toggleSidebar}></div>}
    </aside>
  );
};
