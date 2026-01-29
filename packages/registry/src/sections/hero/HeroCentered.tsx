import React from "react";
import type { HeroCenteredProps } from "./types";

export const HeroCentered: React.FC<HeroCenteredProps> = ({
  heading,
  subheading,
  ctas = [],
  alignment = "center",
  backgroundImage,
  className = "",
  theme = "light",
}) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const themeClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
  };

  return (
    <section
      className={`relative min-h-screen flex flex-col justify-center px-6 py-20 ${themeClasses[theme]} ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      )}

      <div
        className={`relative z-10 max-w-4xl mx-auto w-full flex flex-col ${alignmentClasses[alignment]} gap-6`}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          {heading}
        </h1>

        {subheading && (
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl">
            {subheading}
          </p>
        )}

        {ctas && ctas.length > 0 && (
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
    </section>
  );
};
