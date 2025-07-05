import type { User } from '../models';
import { FetchService } from './Fetch.service';

interface PasswordBody {
  currentPassword: string;
  newPassword: string;
}

const SERVICE_EP = '/Users';
export class UserService {
  static async create(user: User) {
    await FetchService.request({
      endpoint: `${SERVICE_EP}`,
      options: {
        method: 'POST',
      },
      body: user as unknown as Record<string, unknown>,
    });
  }

  static async update(user: User) {
    await FetchService.request({
      endpoint: `${SERVICE_EP}?userId=${user.id}`,
      options: {
        method: 'PUT',
      },
      body: user as unknown as Record<string, unknown>,
    });
  }

  static async getAll(): Promise<User[]> {
    const users = await FetchService.request<User[]>({
      endpoint: `${SERVICE_EP}`,
      options: {
        method: 'GET',
      },
    });
    return users;
  }

  static async getOne(id: string): Promise<User> {
    const user = await FetchService.request<User>({
      endpoint: `${SERVICE_EP}/${id}`,
      options: {
        method: 'GET',
      },
    });
    return user;
  }

  static async delete(id: string) {
    const user = await FetchService.request({
      endpoint: `${SERVICE_EP}/${id}`,
      options: {
        method: 'DELETE',
      },
    });
    return user;
  }

  static async updatePassword(id: string, passwordBody: PasswordBody) {
    await FetchService.request({
      endpoint: `${SERVICE_EP}/password/${id}`,
      options: {
        method: 'PUT',
      },
      body: passwordBody as unknown as Record<string, unknown>,
    });
  }

  static async getUserRoles() {
    const roles = await FetchService.request({
      endpoint: `${SERVICE_EP}/roles`,
      options: {
        method: 'GET',
      },
    });
    return roles;
  }

  static async getUserName() {
    // const userName = await FetchService.request({
    //   endpoint: `${SERVICE_EP}/loggedusername`,
    //   options: {
    //     method: "GET",
    //   }
    // });
    // return userName;
    return 'Guest'; // Placeholder, as the endpoint is commented out
  }

  static async sendConfirmationEmail(id: string) {
    await FetchService.request({
      endpoint: `${SERVICE_EP}/SendEmailValidation/${id}`,
      options: {
        method: 'GET',
      },
    });
  }
}
