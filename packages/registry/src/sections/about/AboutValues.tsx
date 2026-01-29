import React from 'react';
import type { AboutValuesProps } from './types';

export const AboutValues: React.FC<AboutValuesProps> = ({
  title,
  description,
  content,
  values,
  columns = 3,
  className = '',
  theme = 'light',
}) => {
  const themeClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
  };

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={`py-20 px-6 ${themeClasses[theme]} ${className}`}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl mb-12 mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-xl opacity-80 leading-relaxed mb-8">
              {description}
            </p>
          )}
          <p className="text-lg opacity-90 leading-relaxed">
            {content}
          </p>
        </div>

        {/* Values Grid */}
        <div className={`grid ${gridCols[columns]} gap-8 lg:gap-12 mt-16`}>
          {values.map((value, index) => (
            <div
              key={index}
              className="relative p-8 rounded-xl border border-current/10 hover:border-current/20 transition-all hover:shadow-lg group"
            >
              {/* Icon */}
              {value.icon && (
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 text-2xl group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                {value.title}
              </h3>

              {/* Description */}
              <p className="opacity-80 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};