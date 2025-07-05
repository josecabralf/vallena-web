export interface User {
  id: string;
  nombre: string;
  apellido: string;
  userName: string;
  email: string;
  password: string;
  emailConfirmed?: boolean;
}
