import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar, { MobileDrawer } from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import Navbar from '../components/Navbar';
import InstallPrompt from '../components/InstallPrompt';

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="min-h-screen min-h-dvh w-full flex bg-bg dark:bg-slate-900 text-ink dark:text-primary-50">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar onMenu={() => setMenuOpen(true)} menuOpen={menuOpen} />
        <main className="flex-1 min-w-0 px-3 xs:px-4 sm:px-6 lg:px-8 py-5 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-8 max-w-5xl xl:max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
        <BottomNav />
      </div>
      <MobileDrawer open={menuOpen} onClose={closeMenu} />
      <InstallPrompt />
    </div>
  );
}
