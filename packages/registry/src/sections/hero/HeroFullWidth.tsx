import React from "react";
import type { HeroFullWidthProps } from "./types";

export const HeroFullWidth: React.FC<HeroFullWidthProps> = ({
  heading,
  subheading,
  ctas = [],
  backgroundImage,
  overlay = true,
  overlayOpacity = 0.5,
  className = "",
  theme = "light",
}) => {
  return (
    <section
      className={`relative min-h-screen flex items-center justify-center px-6 py-20 ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Parallax effect
      }}
    >
      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
          {heading}
        </h1>

        {subheading && (
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-95">
            {subheading}
          </p>
        )}

        {ctas.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            {ctas.map((cta, index) => (
              <a
                key={index}
                href={cta.href}
                onClick={cta.onClick}
                className={`
                  px-8 py-4 rounded-lg font-semibold transition-all text-lg
                  ${
                    cta.variant === "primary"
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                      : cta.variant === "secondary"
                        ? "bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
                        : "border-2 border-white text-white hover:bg-white hover:text-gray-900"
                  }
                `}
              >
                {cta.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
