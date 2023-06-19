import { atomWithStorage } from 'jotai/utils';

/**
 * @example
 * {
 * email: 'test',
 * name: 'test testtest',
 * point : 1234,
 * role: 'admin',
 * }
 */
export const userAtom = atomWithStorage("userStatus",null);
