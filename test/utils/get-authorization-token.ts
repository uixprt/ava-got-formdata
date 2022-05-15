import got from 'got';
import { BASE_URL, USER, PASSWORD } from '../config';
import { tryCatchRequest } from './try-catch-request';

export async function getAuthorizationToken(): Promise<string> {
  const { response } = await tryCatchRequest(() =>
    got({
      method: 'POST',
      url: `${BASE_URL}tokens/`,
      json: {
        username: USER,
        password: PASSWORD,
      },
      responseType: 'json',
    }),
  );
  const jwt = response.body.jwt;

  return jwt;
}
