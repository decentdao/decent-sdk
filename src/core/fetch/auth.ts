import { Logout, Nonce, User } from '../types/Api';
import { genericFetchAndThrowIfError } from './common/generic';
import { BaseParams, VerifyParams } from './common/params';
import { routes } from './common/routes';

/**
 * Fetches a nonce for signing messages.
 * @param params - The parameters for fetching the nonce.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<Nonce>} A promise that resolves to the nonce data.
 */
export const getNonce = async (params?: BaseParams): Promise<Nonce> => {
  const { apiUrl } = params ?? {};
  const response = await genericFetchAndThrowIfError<Nonce>({
    route: `${routes.auth}/nonce`,
    apiUrl,
  });
  return response;
};

/**
 * Verifies a signed message (e.g., SIWE) to authenticate the user.
 * @param params - The parameters for verification.
 * @param params.address - The address of the user.
 * @param params.signature - The signature to verify.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<User>} A promise with the authenticated user data.
 */
export const verify = async (params: VerifyParams): Promise<User> => {
  const { address, signature, apiUrl } = params;
  const response = await genericFetchAndThrowIfError<User>({
    route: `${routes.auth}/verify`,
    options: {
      method: 'POST',
      body: JSON.stringify({ address, signature }),
    },
    apiUrl,
  });
  return response;
};

/**
 * Fetches the currently authenticated user's information.
 * Requires a valid session/cookie.
 * @param params - The parameters for fetching the user data.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<User>} A promise with the authenticated user data.
 */
export const me = async (params?: BaseParams): Promise<User> => {
  const { apiUrl } = params ?? {};
  const response = await genericFetchAndThrowIfError<User>({
    route: `${routes.auth}/me`,
    apiUrl,
  });
  return response;
};

/**
 * Logs the current user out by clearing the session/cookie.
 * @param params - The parameters for logging out.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<Logout>} A promise with the "ok" message.
 */
export const logout = async (params?: BaseParams): Promise<Logout> => {
  const { apiUrl } = params ?? {};
  const response = await genericFetchAndThrowIfError<Logout>({
    route: `${routes.auth}/logout`,
    options: {
      method: 'POST',
    },
    apiUrl,
  });
  return response;
};
