import React from 'react';
import type { FooterMultiColumnProps } from './types';

export const FooterMultiColumn: React.FC<FooterMultiColumnProps> = ({
  companyName = 'Company',
  copyrightText,
  columns,
  socialLinks = [],
  description,
  logo,
  logoAlt,
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
    <footer className={`py-16 px-6 border-t ${themeClasses[theme]} ${className}`}>
      <div className="container mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            {logo ? (
              <img src={logo} alt={logoAlt || companyName} className="h-8 mb-4" />
            ) : (
              <div className="font-bold text-2xl mb-4">{companyName}</div>
            )}
            {description && (
              <p className="opacity-80 leading-relaxed mb-6 max-w-sm">
                {description}
              </p>
            )}
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
<a
                    key={index}
                    href={social.href}
                    aria-label={social.ariaLabel || `Visit our ${social.platform}`}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon || social.platform.charAt(0).toUpperCase()}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">
                {column.title}
              </h3>
              <nav className="space-y-3">
                {column.links.map((link, linkIndex) => (
<a
                    key={linkIndex}
                    href={link.href}
                    className="block text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-current/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm opacity-70">
            {copyright}
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm opacity-70">
            <a href="/privacy" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:opacity-100 transition-opacity">
              Terms of Service
            </a>
            <a href="/cookies" className="hover:opacity-100 transition-opacity">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};