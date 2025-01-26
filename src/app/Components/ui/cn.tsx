type ClassValue = 
  | string 
  | number 
  | boolean 
  | undefined 
  | null 
  | Record<string, unknown>;

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .filter(Boolean)
    .map(input => {
      if (typeof input === 'object' && input !== null) {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ');
      }
      return String(input);
    })
    .join(' ');
}