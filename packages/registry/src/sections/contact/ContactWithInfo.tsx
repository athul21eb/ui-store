import React, { useState, FormEvent } from 'react';
import type { ContactWithInfoProps, FormField } from './types';

const defaultFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'John Doe', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com', required: true },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Your message...', required: true, rows: 5 },
];

export const ContactWithInfo: React.FC<ContactWithInfoProps> = ({
  title,
  description,
  fields = defaultFields,
  submitLabel = 'Send Message',
  onSubmit,
  successMessage = 'Thank you! We\'ll get back to you soon.',
  contactInfo,
  companyName,
  companyDescription,
  className = '',
  theme = 'light',
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const themeClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
  };

  const inputTheme = {
    light: 'bg-white border-gray-300 focus:border-blue-600 text-gray-900',
    dark: 'bg-gray-800 border-gray-600 focus:border-blue-400 text-white',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const value = formData[field.name] || '';

      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = 'Please enter a valid email address';
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
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`py-20 px-6 ${themeClasses[theme]} ${className}`}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            {companyName && (
              <div>
                <h3 className="text-2xl font-semibold mb-3">{companyName}</h3>
                {companyDescription && (
                  <p className="opacity-80 leading-relaxed">
                    {companyDescription}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  {info.icon && (
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 text-xl shrink-0">
                      {info.icon}
                    </div>
                  )}
                  <div>
                    <div className="font-medium mb-1">{info.label}</div>
                    {info.href ? (
                        <a
                        href={info.href}
                        className="text-blue-600 hover:underline"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="opacity-80">{info.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Message Sent!</h3>
                <p className="text-lg opacity-80 mb-8">{successMessage}</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {fields.map(field => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium mb-2"
                    >
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={field.rows || 4}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${inputTheme[theme]} ${
                          errors[field.name] ? 'border-red-500' : ''
                        }`}
                        aria-invalid={!!errors[field.name]}
                        aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                      />
                    ) : (
                      <input
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${inputTheme[theme]} ${
                          errors[field.name] ? 'border-red-500' : ''
                        }`}
                        aria-invalid={!!errors[field.name]}
                        aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
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
                  {isSubmitting ? 'Sending...' : submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};