import { atomWithStorage } from 'jotai/utils';
import Crypto from '../cryptoJS/crypto';

/**
 * @example
 * {
 * email: 'test',
 * name: 'test testtest',
 * point : 1234,
 * role: 'admin',
 * }
 */
export const userAtom = atomWithStorage('userStatus', Crypto.encodeByAES256(''));
