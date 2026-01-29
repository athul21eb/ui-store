import React, { useState, FormEvent } from 'react';
import type { BookingDateFocusedProps, TimeSlot, BookingFormField } from './types';

const defaultTimeSlots: TimeSlot[] = [
  { time: '09:00', available: true, label: '9:00 AM' },
  { time: '10:00', available: true, label: '10:00 AM' },
  { time: '11:00', available: true, label: '11:00 AM' },
  { time: '12:00', available: false, label: '12:00 PM' },
  { time: '13:00', available: true, label: '1:00 PM' },
  { time: '14:00', available: true, label: '2:00 PM' },
  { time: '15:00', available: true, label: '3:00 PM' },
  { time: '16:00', available: false, label: '4:00 PM' },
  { time: '17:00', available: true, label: '5:00 PM' },
  { time: '18:00', available: true, label: '6:00 PM' },
];

export const BookingDateFocused: React.FC<BookingDateFocusedProps> = ({
  title,
  description,
  timeSlots = defaultTimeSlots,
  guestCountOptions = [1, 2, 3, 4, 5, 6, 7, 8],
  additionalFields = [],
  submitLabel = 'Confirm Booking',
  onSubmit,
  successMessage = 'Your reservation has been confirmed!',
  minDate,
  maxDate,
  className = '',
  theme = 'light',
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedTime, setSelectedTime] = useState<string>('');
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

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!selectedTime) {
      newErrors.time = 'Please select a time';
    }

    if (!formData.guests) {
      newErrors.guests = 'Please select number of guests';
    }

    additionalFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = { ...formData, time: selectedTime };
      if (onSubmit) {
        await onSubmit(bookingData);
      }
      setSubmitted(true);
      setFormData({});
      setSelectedTime('');
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className={`py-20 px-6 ${themeClasses[theme]} ${className}`}>
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-4">Reservation Confirmed!</h3>
          <p className="text-lg opacity-80 mb-8">{successMessage}</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Make Another Reservation
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 px-6 ${themeClasses[theme]} ${className}`}>
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg opacity-80">
              {description}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Date Selection */}
          <div>
            <label className="block text-lg font-semibold mb-4">
              Select Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date || ''}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, date: e.target.value }));
                if (errors.date) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.date;
                    return newErrors;
                  });
                }
              }}
              min={minDate || getTodayDate()}
              max={maxDate}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${inputTheme[theme]} ${
                errors.date ? 'border-red-500' : ''
              }`}
              aria-invalid={!!errors.date}
            />
            {errors.date && (
              <p className="mt-2 text-sm text-red-500" role="alert">{errors.date}</p>
            )}
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-lg font-semibold mb-4">
              Select Time <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => {
                    if (slot.available) {
                      setSelectedTime(slot.time);
                      if (errors.time) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.time;
                          return newErrors;
                        });
                      }
                    }
                  }}
                  disabled={!slot.available}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedTime === slot.time
                      ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                      : slot.available
                      ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent'
                      : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  {slot.label || slot.time}
                </button>
              ))}
            </div>
            {errors.time && (
              <p className="mt-2 text-sm text-red-500" role="alert">{errors.time}</p>
            )}
          </div>

          {/* Guest Count */}
          <div>
            <label className="block text-lg font-semibold mb-4">
              Number of Guests <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {guestCountOptions.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, guests: count.toString() }));
                    if (errors.guests) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.guests;
                        return newErrors;
                      });
                    }
                  }}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    formData.guests === count.toString()
                      ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
            {errors.guests && (
              <p className="mt-2 text-sm text-red-500" role="alert">{errors.guests}</p>
            )}
          </div>

          {/* Additional Fields */}
          {additionalFields.length > 0 && (
            <div className="space-y-6 pt-4 border-t border-current/10">
              {additionalFields.map(field => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-sm font-medium mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, [field.name]: e.target.value }));
                      if (errors[field.name]) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors[field.name];
                          return newErrors;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${inputTheme[theme]}`}
                  />
                  {errors[field.name] && (
                    <p className="mt-2 text-sm text-red-500" role="alert">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            {isSubmitting ? 'Processing...' : submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
};