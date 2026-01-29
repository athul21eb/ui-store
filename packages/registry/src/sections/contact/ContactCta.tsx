import React, { useState, FormEvent } from "react";
import type { ContactCtaProps, FormField } from "./types";

const defaultQuickFields: FormField[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
    required: true,
  },
];

export const ContactCta: React.FC<ContactCtaProps> = ({
  title,
  description,
  ctaText,
  ctaButtonLabel,
  ctaButtonHref,
  onCtaClick,
  contactMethods,
  showQuickForm = false,
  quickFormFields = defaultQuickFields,
  onQuickFormSubmit,
  className = "",
  theme = "light",
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const themeClasses = {
    light: "bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900",
    dark: "bg-gradient-to-br from-gray-900 to-gray-800 text-white",
  };

  const handleQuickFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    quickFormFields.forEach((field) => {
      const value = formData[field.name] || "";
      if (field.required && !value.trim()) {
        newErrors[field.name] = "This field is required";
      }
      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Invalid email";
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (onQuickFormSubmit) {
        await onQuickFormSubmit(formData);
      }
      setSubmitted(true);
      setFormData({});
    } catch (error) {
      console.error("Quick form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`py-20 px-6 ${themeClasses[theme]} ${className}`}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-12 text-center border border-current/10">
          <p className="text-2xl md:text-3xl font-semibold mb-8">{ctaText}</p>

          {ctaButtonHref ? (
            <a
              href={ctaButtonHref}
              className="inline-block px-10 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
            >
              {ctaButtonLabel}
            </a>
          ) : (
            <button
              onClick={onCtaClick}
              className="inline-block px-10 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
            >
              {ctaButtonLabel}
            </button>
          )}
        </div>

        {/* Quick Form */}
        {showQuickForm && !submitted && (
          <div className="max-w-md mx-auto mb-12">
            <form onSubmit={handleQuickFormSubmit} className="flex gap-3">
              {quickFormFields.map((field) => (
                <div key={field.name} className="flex-1">
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }));
                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors[field.name];
                        return newErrors;
                      });
                    }}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    aria-label={field.label}
                  />
                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "..." : "Submit"}
              </button>
            </form>
          </div>
        )}

        {submitted && (
          <div className="text-center mb-12 text-green-600 font-medium">
            ✓ Thanks! We'll be in touch soon.
          </div>
        )}

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-current/10 hover:border-current/20 transition-all"
            >
              {method.icon && (
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-600/10 text-blue-600 text-2xl">
                  {method.icon}
                </div>
              )}
              <div className="font-semibold mb-2">{method.label}</div>
              {method.href ? (
                <a
                  href={method.href}
                  className="text-blue-600 hover:underline break-all"
                >
                  {method.value}
                </a>
              ) : (
                <div className="opacity-80 break-all">{method.value}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
