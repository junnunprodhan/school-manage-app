import { Link } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";
import "./Header.scss";
import { ButtonIcon } from "../../ui";

interface IHeader {
  showSidebar?: boolean;
  toggleSidebar?: () => void;
}

export default function Header({ showSidebar, toggleSidebar }: IHeader) {
  return (
    <header className="header">
      <div className="header-container container">
        <div className="header-section">
          <ButtonIcon className="md:hidden z-30" icon={showSidebar ? BiX : BiMenu} variant="white" onClick={toggleSidebar} />

          <Link className="header-logo" to="/">
            <img src="/icon.svg" alt="" />
            <span>SchoolMange</span>
          </Link>
        </div>

        <div className="header-section"></div>
      </div>
    </header>
  );
}