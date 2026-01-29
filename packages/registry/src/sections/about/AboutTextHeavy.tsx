import React from 'react';
import type { AboutTextHeavyProps } from './types';

export const AboutTextHeavy: React.FC<AboutTextHeavyProps> = ({
  title,
  description,
  sections,
  stats = [],
  className = '',
  theme = 'light',
}) => {
  const themeClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
  };

  return (
    <section className={`py-20 px-6 ${themeClasses[theme]} ${className}`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-xl opacity-80 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Content Sections */}
        <div className="space-y-12 mb-16">
          {sections.map((section, index) => (
            <div key={index} className="max-w-4xl">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                {section.heading}
              </h3>
              <p className="text-lg opacity-90 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {stats.length > 0 && (
          <div className="border-t border-current/10 pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-blue-600">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base opacity-70 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};