import { atomWithStorage } from 'jotai/utils';
import Crypto from '../cryptoJS/crypto';

export const isAuthenticatedAtom = atomWithStorage(
  'isAuthenticated',
  Crypto.encodeByAES256('false')
);
