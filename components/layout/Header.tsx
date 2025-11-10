'use client';

import Link from 'next/link';
import { Microscope, Home, FlaskConical, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Trang chủ', icon: Home },
    { href: '/benedict-interactive', label: 'Benedict', icon: FlaskConical },
    { href: '/lugol-interactive', label: 'Lugol', icon: FlaskConical },
    { href: '/biuret-interactive', label: 'Biuret', icon: FlaskConical },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500">
            <Microscope className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-green-800">Phòng Thí Nghiệm Ảo</span>
            <span className="text-xs text-green-600">Sinh Học & Hóa Học</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-green-100 text-green-800 font-semibold'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-green-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-green-800" />
          ) : (
            <Menu className="h-6 w-6 text-green-800" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-green-200 bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-green-100 text-green-800 font-semibold'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

