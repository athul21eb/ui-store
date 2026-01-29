import React from 'react';
import type { AboutImageFocusedProps } from './types';

export const AboutImageFocused: React.FC<AboutImageFocusedProps> = ({
  title,
  description,
  content,
  imageUrl,
  imageAlt,
  imagePosition = 'right',
  highlights = [],
  className = '',
  theme = 'light',
}) => {
  const themeClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
  };

  const contentOrder = imagePosition === 'left' ? 'order-2' : 'order-1';
  const imageOrder = imagePosition === 'left' ? 'order-1' : 'order-2';

  return (
    <section className={`py-20 px-6 ${themeClasses[theme]} ${className}`}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl mb-16 mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-xl opacity-80 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className={`${contentOrder} space-y-8`}>
            <p className="text-lg leading-relaxed opacity-90 whitespace-pre-line">
              {content}
            </p>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <p className="text-base opacity-90">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image */}
          <div className={`${imageOrder}`}>
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};