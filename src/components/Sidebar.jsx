import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, CalendarClock, ListChecks, Target, Heart, BarChart3,
  Trophy, Moon, User, Database, Settings as SettingsIcon, X,
} from 'lucide-react';
import Logo from './Logo';

export const NAV_ITEMS = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/routine', label: 'Routine', icon: CalendarClock },
  { to: '/tasks', label: 'Tasks', icon: ListChecks },
  { to: '/goals', label: 'Goals', icon: Target },
  { to: '/together', label: 'Together', icon: Heart },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
  { to: '/achievements', label: 'Achievements', icon: Trophy },
  { to: '/reflection', label: 'Reflection', icon: Moon },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/data-backup', label: 'Data & Backup', icon: Database },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
];

// Shared by the desktop sidebar and the mobile drawer so both always show every link.
function SidebarContent({ onNavigate, onClose }) {
  return (
    <>
      <div className="flex items-center gap-2 px-6 py-6">
        <Logo size={34} />
        <div className="min-w-0 flex-1">
          <p className="font-display font-bold text-lg text-ink dark:text-white leading-none">GrowTogether</p>
          <p className="text-[11px] text-muted mt-0.5">Grow together. ❤️</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -mr-3 rounded-full text-muted hover:bg-primary-50 dark:hover:bg-slate-800 flex-shrink-0"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <nav className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 space-y-1" aria-label="Main">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-soft'
                  : 'text-ink/80 dark:text-primary-100/80 hover:bg-primary-50 dark:hover:bg-slate-800'
              }`
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 text-[11px] text-muted text-center">
        🔒 Your data stays on this device.
      </div>
    </>
  );
}

// Desktop / tablet sidebar (unchanged look)
export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-56 lg:w-64 flex-shrink-0 h-screen h-dvh sticky top-0 border-r border-primary-50 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur">
      <SidebarContent />
    </aside>
  );
}

// Mobile slide-out drawer (opened from the hamburger in the header)
export function MobileDrawer({ open, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector('a')?.focus();

    // If the window grows to desktop width, the drawer is no longer needed
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => { if (e.matches) onClose(); };
    mq.addEventListener('change', onChange);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      mq.removeEventListener('change', onChange);
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="md:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            ref={panelRef}
            className="absolute inset-y-0 left-0 flex flex-col w-[85%] max-w-xs bg-white dark:bg-slate-900 border-r border-primary-50 dark:border-slate-800 shadow-soft pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          >
            <SidebarContent onNavigate={onClose} onClose={onClose} />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
