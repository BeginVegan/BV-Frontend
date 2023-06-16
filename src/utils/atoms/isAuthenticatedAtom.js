import { atomWithStorage } from 'jotai/utils';
export const isAuthenticatedAtom = atomWithStorage('isAuthenticated', false);
