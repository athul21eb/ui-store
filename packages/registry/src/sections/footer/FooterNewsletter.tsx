import React, { useState, FormEvent } from 'react';
import type { FooterNewsletterProps } from './types';

export const FooterNewsletter: React.FC<FooterNewsletterProps> = ({
  companyName = 'Company',
  copyrightText,
  newsletterTitle = 'Subscribe to our newsletter',
  newsletterDescription = 'Get the latest updates and news delivered to your inbox.',
  onNewsletterSubmit,
  newsletterSuccessMessage = 'Thank you for subscribing!',
  columns = [],
  socialLinks = [],
  description,
  className = '',
  theme = 'light',
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const themeClasses = {
    light: 'bg-gray-50 text-gray-900 border-gray-200',
    dark: 'bg-gray-900 text-white border-gray-800',
  };

  const inputTheme = {
    light: 'bg-white border-gray-300 focus:border-blue-600 text-gray-900',
    dark: 'bg-gray-800 border-gray-600 focus:border-blue-400 text-white',
  };

  const currentYear = new Date().getFullYear();
  const copyright = copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);

    try {
      if (onNewsletterSubmit) {
        await onNewsletterSubmit(email);
      }
      setSubmitted(true);
      setEmail('');
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={`py-16 px-6 border-t ${themeClasses[theme]} ${className}`}>
      <div className="container mx-auto max-w-7xl">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-current/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                {newsletterTitle}
              </h3>
              <p className="opacity-80">
                {newsletterDescription}
              </p>
            </div>
            <div>
              {submitted ? (
                <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{newsletterSuccessMessage}</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-3" noValidate>
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${inputTheme[theme]} ${
                        error ? 'border-red-500' : ''
                      }`}
                      aria-label="Email address"
                      aria-invalid={!!error}
                      aria-describedby={error ? 'email-error' : undefined}
                    />
                    {error && (
                      <p id="email-error" className="mt-2 text-sm text-red-500" role="alert">
                        {error}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="font-bold text-2xl mb-4">{companyName}</div>
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
        <div className="pt-8 border-t border-current/10 text-center md:text-left">
          <div className="text-sm opacity-70">
            {copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};