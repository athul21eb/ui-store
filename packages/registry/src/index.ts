// Export all types
export * from './types';

// Export Hero section
export * from './sections/hero';
export { heroRegistry, heroMeta } from './sections/hero/registry';

// Export About section
export * from './sections/about';
export { aboutRegistry, aboutMeta } from './sections/about/registry';

// Export Contact section
export * from './sections/contact';
export { contactRegistry, contactMeta } from './sections/contact/registry';

// Export Booking section
export * from './sections/booking';
export { bookingRegistry, bookingMeta } from './sections/booking/registry';

// Registry map
import { heroRegistry } from './sections/hero/registry';
import { aboutRegistry } from './sections/about/registry';
import { contactRegistry } from './sections/contact/registry';
import { bookingRegistry } from './sections/booking/registry';

export const registry = {
  hero: heroRegistry,
  about: aboutRegistry,
  contact: contactRegistry,
  booking: bookingRegistry,
  // footer: footerRegistry,    // Coming next!
};

// Helper function to get all sections
export const getAllSections = () => Object.keys(registry);

// Helper function to get variants for a section
export const getSectionVariants = (section: keyof typeof registry) => {
  return Object.keys(registry[section]);
};

// Helper function to get registry item
export const getRegistryItem = (
  section: keyof typeof registry,
  variant: string
) => {
  return registry[section][variant as keyof typeof registry[typeof section]];
};