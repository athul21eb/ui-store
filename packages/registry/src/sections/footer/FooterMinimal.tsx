import React from 'react';
import type { FooterMinimalProps } from './types';

export const FooterMinimal: React.FC<FooterMinimalProps> = ({
  companyName = 'Company',
  copyrightText,
  links = [],
  socialLinks = [],
  tagline,
  className = '',
  theme = 'light',
}) => {
  const themeClasses = {
    light: 'bg-gray-50 text-gray-900 border-gray-200',
    dark: 'bg-gray-900 text-white border-gray-800',
  };

  const currentYear = new Date().getFullYear();
  const copyright = copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`;

  return (
    <footer className={`py-8 px-6 border-t ${themeClasses[theme]} ${className}`}>
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="font-semibold text-lg mb-1">{companyName}</div>
            {tagline && (
              <p className="text-sm opacity-70">{tagline}</p>
            )}
          </div>

          {/* Links */}
          {links.length > 0 && (
            <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer navigation">
              {links.map((link, index) => (
<a
                  key={index}
                  href={link.href}
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
<a
                  key={index}
                  href={social.href}
                  aria-label={social.ariaLabel || `Visit our ${social.platform}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon || social.platform.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-current/10 text-center text-sm opacity-70">
          {copyright}
        </div>
      </div>
    </footer>
  );
};