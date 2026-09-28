import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu } from 'lucide-react';
import Logo from './Logo';
import Avatar from './Avatar';
import UserSwitcher from './UserSwitcher';
import { useApp } from '../context/AppContext';

export default function Navbar({ onMenu, menuOpen = false }) {
  const { activeUser } = useApp();
  const navigate = useNavigate();
  const [switcherOpen, setSwitcherOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-bg/90 dark:bg-slate-900/90 backdrop-blur border-b border-primary-50 dark:border-slate-800 px-3 xs:px-4 sm:px-6 py-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] flex items-center justify-between gap-2">
      <div className="flex items-center gap-1 xs:gap-2 md:hidden min-w-0">
        <button
          onClick={onMenu}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className="p-2 -ml-1.5 rounded-full text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-slate-800 flex-shrink-0"
        >
          <Menu size={22} />
        </button>
        <Logo size={30} className="flex-shrink-0" />
        <span className="font-display font-bold text-ink dark:text-white truncate">GrowTogether</span>
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
        <button
          onClick={() => setSwitcherOpen(true)}
          className="text-xs font-medium px-2.5 py-2 rounded-full bg-primary-50 dark:bg-slate-800 text-primary-700 dark:text-primary-200 hover:bg-primary-100 transition-colors"
        >
          Switch
        </button>
        <button
          aria-label="Notifications"
          className="p-2 rounded-full hover:bg-primary-50 dark:hover:bg-slate-800 text-muted relative"
          onClick={() => navigate('/settings')}
        >
          <Bell size={19} />
        </button>
        <button aria-label="Profile" onClick={() => navigate('/profile')}>
          <Avatar emoji={activeUser?.avatar || '🌸'} size="sm" ring />
        </button>
      </div>
      <UserSwitcher open={switcherOpen} onClose={() => setSwitcherOpen(false)} />
    </header>
  );
}
