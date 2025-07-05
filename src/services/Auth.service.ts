import type { Auth } from '../models';
import { FetchService } from './Fetch.service';

const SERVICE_EP = '/Auth';

export class AuthService {
  static async login(credentials: Auth) {
    await FetchService.request({
      endpoint: `${SERVICE_EP}/login`,
      options: {
        method: 'POST',
        credentials: 'include',
      },
      body: credentials as unknown as Record<string, unknown>,
    });
  }

  static async logout() {
    await FetchService.request({
      endpoint: `${SERVICE_EP}/logout`,
      options: {
        method: 'GET',
        credentials: 'include',
      },
    });
  }

  static async check() {
    // await FetchService.request({
    //   endpoint: `${SERVICE_EP}/validate-session`,
    //   options: {
    //     method: "GET",
    //     credentials: "include"
    //   },
    // });
    // throw new Error("Not implemented");
  }
}
