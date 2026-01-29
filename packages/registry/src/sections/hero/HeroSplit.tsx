import React from "react";
import type { HeroSplitProps } from "./types";

export const HeroSplit: React.FC<HeroSplitProps> = ({
  heading,
  subheading,
  ctas = [],
  imageUrl,
  imageAlt,
  imagePosition = "right",
  className = "",
  theme = "light",
}) => {
  const themeClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
  };

  // Use imagePosition to determine layout order
  const contentOrder = imagePosition === "right" ? "order-1" : "order-2";
  const imageOrder = imagePosition === "right" ? "order-2" : "order-1";

  return (
    <section className={`min-h-screen ${themeClasses[theme]} ${className}`}>
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-150">
          {/* Content Column */}
          <div className={`flex flex-col gap-6 ${contentOrder}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {heading}
            </h1>

            {subheading && (
              <p className="text-lg md:text-xl opacity-90">{subheading}</p>
            )}

            {ctas.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {ctas.map((cta, index) => (
                  <a
                    key={index}
                    href={cta.href}
                    onClick={cta.onClick}
                    className={`
                      px-8 py-3 rounded-lg font-semibold transition-all
                      ${
                        cta.variant === "primary"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : cta.variant === "secondary"
                            ? "bg-gray-600 text-white hover:bg-gray-700"
                            : "border-2 border-current hover:bg-white/10"
                      }
                    `}
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Image Column */}
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
