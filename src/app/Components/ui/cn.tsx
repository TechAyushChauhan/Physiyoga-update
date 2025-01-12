type ClassValue = string | number | boolean | undefined | null | { [key: string]: any }

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ")
}