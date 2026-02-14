import ShortUniqueId from 'short-unique-id';

const generator = new ShortUniqueId({ length: 6 });

export function generatePoolCode(): string {
  return String(generator()).toUpperCase();
}
