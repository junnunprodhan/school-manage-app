import { useState } from "react";
import { Header, Navigation, Sidebar } from "../common";

interface IMainLayout {
  name?: string;
  back?: any;
  renderRight?: () => React.ReactNode;
  hideNavigation?: boolean;
  children?: React.ReactNode;
}

export default function MainLayout({ name, back, renderRight, hideNavigation, children }: IMainLayout) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleSidebarToggle = () => setIsSidebarOpen((pre) => !pre);

  return (
    <>
      <Header showSidebar={isSidebarOpen} toggleSidebar={handleSidebarToggle} />
      <section className="main-wrapper">
        <Sidebar showSidebar={isSidebarOpen} toggleSidebar={handleSidebarToggle} />
        <main className="main scroll-y">
          {!hideNavigation && <Navigation name={name} back={back} renderRight={renderRight} />}

          <div className="py-4 container flex flex-col gap-4 md:gap-8">{children}</div>
        </main>
      </section>
    </>
  );
}
