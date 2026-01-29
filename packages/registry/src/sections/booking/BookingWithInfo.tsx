import React, { useState, FormEvent } from "react";
import type { BookingWithInfoProps, BookingFormField } from "./types";

const defaultFields: BookingFormField[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "+1 (555) 123-4567",
    required: true,
  },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "time", label: "Time", type: "time", required: true },
  {
    name: "guests",
    label: "Guests",
    type: "number",
    required: true,
    min: 1,
    max: 20,
    placeholder: "2",
  },
  {
    name: "notes",
    label: "Special Requests",
    type: "text",
    placeholder: "Any special requirements?",
    required: false,
  },
];

export const BookingWithInfo: React.FC<BookingWithInfoProps> = ({
  title,
  description,
  fields = defaultFields,
  submitLabel = "Complete Booking",
  onSubmit,
  successMessage = "Your booking has been confirmed! Check your email for details.",
  bookingInfo,
  policiesText,
  className = "",
  theme = "light",
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const themeClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
  };

  const inputTheme = {
    light: "bg-white border-gray-300 focus:border-blue-600 text-gray-900",
    dark: "bg-gray-800 border-gray-600 focus:border-blue-400 text-white",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formData[field.name] || "";

      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Please enter a valid email";
        }
      }

      if (field.type === "date" && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          newErrors[field.name] = "Please select a future date";
        }
      }

      if (field.type === "number" && value) {
        const numValue = parseInt(value);
        if (field.min !== undefined && numValue < Number(field.min)) {
          newErrors[field.name] = `Minimum value is ${field.min}`;
        }
        if (field.max !== undefined && numValue > Number(field.max)) {
          newErrors[field.name] = `Maximum value is ${field.max}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setSubmitted(true);
      setFormData({});
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className={`py-20 px-6 ${themeClasses[theme]} ${className}`}>
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-4">Booking Successful!</h3>
          <p className="text-lg opacity-80 mb-8">{successMessage}</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Make Another Booking
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 px-6 ${themeClasses[theme]} ${className}`}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Booking Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Important Information
              </h3>
              <div className="space-y-6">
                {bookingInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-current/10"
                  >
                    {info.icon && (
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 text-2xl shrink-0">
                        {info.icon}
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold mb-2">{info.title}</h4>
                      <p className="opacity-80 text-sm leading-relaxed">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            {policiesText && (
              <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-blue-600">📋</span>
                  Booking Policies
                </h4>
                <p className="text-sm opacity-90 leading-relaxed whitespace-pre-line">
                  {policiesText}
                </p>
              </div>
            )}
          </div>

          {/* Booking Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium mb-2"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>

                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      required={field.required}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${inputTheme[theme]} ${
                        errors[field.name] ? "border-red-500" : ""
                      }`}
                      aria-invalid={!!errors[field.name]}
                      aria-describedby={
                        errors[field.name] ? `${field.name}-error` : undefined
                      }
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      required={field.required}
                      min={field.min}
                      max={field.max}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${inputTheme[theme]} ${
                        errors[field.name] ? "border-red-500" : ""
                      }`}
                      aria-invalid={!!errors[field.name]}
                      aria-describedby={
                        errors[field.name] ? `${field.name}-error` : undefined
                      }
                    />
                  )}

                  {errors[field.name] && (
                    <p
                      id={`${field.name}-error`}
                      className="mt-2 text-sm text-red-500"
                      role="alert"
                    >
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                {isSubmitting ? "Processing..." : submitLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
