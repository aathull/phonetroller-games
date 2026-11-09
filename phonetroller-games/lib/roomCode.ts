// Letters only, skipping I and O so they aren't confused with 1 and 0.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ";
export const ROOM_CODE_LENGTH = 4;

const VALID_CODE = new RegExp(`^[${ALPHABET}]{${ROOM_CODE_LENGTH}}$`);

export function generateRoomCode(length = ROOM_CODE_LENGTH): string {
  const bytes = crypto.getRandomValues(new Uint32Array(length));
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

// Uppercases and strips anything that can't appear in a code (spaces, I, O, digits...).
export function normalizeRoomCode(input: string): string {
  return input
    .toUpperCase()
    .split("")
    .filter((ch) => ALPHABET.includes(ch))
    .join("")
    .slice(0, ROOM_CODE_LENGTH);
}

export function isValidRoomCode(code: string): boolean {
  return VALID_CODE.test(code);
}
