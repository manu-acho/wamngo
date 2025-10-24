"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Wallet, Zap, ChevronDown, Heart, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

const navigationItems = [
  { href: "/", label: "Home", icon: null },
  { href: "/about", label: "About", icon: null },
  { href: "/projects", label: "Projects", icon: null },
  { href: "/token-sale", label: "Token Sale", icon: Zap, isWeb3: true },
  { href: "/governance", label: "DAO", icon: null, isWeb3: true },
];

const moreItems = [
  { href: "/donation", label: "Donation", icon: Heart },
  { href: "/fashion-for-hope", label: "Fashion For Hope", icon: Heart },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const isMoreActive = moreItems.some(item => isActive(item.href));

  return (
    <nav className="wam-card sticky top-0 z-50 mx-2 mt-2 rounded-2xl border-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative px-5 py-3 text-sm font-medium transition-all duration-300 group rounded-xl
                      ${active 
                        ? item.isWeb3 
                          ? 'text-purple-600 wam-nav-active' 
                          : 'text-blue-600 wam-nav-active'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50'
                      }
                    `}
                  >
                    <span className="flex items-center gap-2 relative z-10">
                      {Icon && <Icon className="w-4 h-4" />}
                      {item.label}
                    </span>
                    
                    {/* Web3 glow background */}
                    {item.isWeb3 && active && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-teal-500/10 wam-pulse" />
                    )}
                    
                    {/* Hover shimmer effect */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </div>
                  </Link>
                );
              })}
              
              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`
                    flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-300 rounded-xl
                    ${isMoreActive 
                      ? 'text-blue-600 wam-nav-active' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50'
                    }
                  `}
                >
                  More
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isMoreOpen && (
                  <div className="absolute right-0 mt-3 w-64 wam-card p-1 z-50">
                    {moreItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMoreOpen(false)}
                          className={`
                            flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200 group
                            ${active 
                              ? 'text-purple-600 bg-gradient-to-r from-purple-50 to-pink-50' 
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50'
                            }
                          `}
                        >
                          <Icon className={`w-4 h-4 ${active ? 'text-purple-500' : 'text-gray-500 group-hover:text-purple-500'}`} />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Connect Wallet Button (Desktop) */}
            <div className="hidden lg:block">
              {pathname === '/token-sale' || pathname === '/governance' ? (
                <Button 
                  size="sm" 
                  className="wam-btn-primary text-white font-medium px-6 py-2 wam-float"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              ) : null}
            </div>
            
            {/* Language Selector */}
            <Button variant="ghost" size="sm" className="hidden sm:flex text-gray-600 hover:text-gray-900">
              <Globe className="h-4 w-4 mr-1" />
              EN
            </Button>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200/50">
            <div className="px-3 pt-3 pb-4 space-y-1">
              {/* Main Navigation */}
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                      ${active 
                        ? item.isWeb3
                          ? 'text-purple-600 bg-gradient-to-r from-purple-50 to-pink-50' 
                          : 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    {item.label}
                    {item.isWeb3 && active && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" />
                    )}
                  </Link>
                );
              })}
              
              {/* More Items */}
              <div className="pt-2 mt-2 border-t border-gray-200/50">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
                  More
                </div>
                {moreItems.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200
                        ${active 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              
              {/* Mobile Wallet Connect */}
              {(pathname === '/token-sale' || pathname === '/governance') && (
                <div className="pt-3 mt-3 border-t border-gray-200/50">
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
