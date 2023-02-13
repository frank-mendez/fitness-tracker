import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { v4 as uuid } from 'uuid';

export class AuthService {
  authChange = new Subject<boolean>();

  private user: User | null = null;

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: uuid(),
    };

    this.authChange.next(true);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: uuid(),
    };
    this.authChange.next(true);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user !== null;
  }
}
