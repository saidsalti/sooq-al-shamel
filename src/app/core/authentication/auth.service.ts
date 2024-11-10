import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, iif, map, merge, of, share, switchMap, tap } from 'rxjs';
import { filterObject, isEmptyObject } from './helpers';
import { User } from './interface';
import { LoginService } from './login.service';
import { TokenService } from './token.service';
import { APPWRITE } from '@core/appwrite.config';
import { Router } from '@angular/router';
import { AppwriteException } from 'appwrite';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly loginService = inject(LoginService);
  private readonly tokenService = inject(TokenService);
 private router = inject(Router);

  db = APPWRITE.db;
  account = APPWRITE.account;
  dbId = APPWRITE.storeDbId;
  private user$ = new BehaviorSubject<User>({});
  private change$ = merge(
    this.tokenService.change(),
    this.tokenService.refresh().pipe(switchMap(() => this.refresh()))
  ).pipe(
    switchMap(() => this.assignUser()),
    share()
  );

  init() {
    return new Promise<void>(resolve => this.change$.subscribe(() => resolve()));
  }

  change() {
    return this.change$;
  }

  check() {
    return this.tokenService.valid();
  }
  async isLoggedIn(): Promise<boolean> {
    try {
      await APPWRITE.account.get();
      return true;
    } catch (error) {
      return false;
    }
  }
  login(username: string, password: string, rememberMe = false) {
    return this.loginService.login(username, password, rememberMe).pipe(
      tap(token => this.tokenService.set(token)),
      map(() => this.check())
    );
  }
  async login2(data: { email: string; password: string }) {

    const r = await APPWRITE.account.createEmailPasswordSession(data.email, data.password);
    if (r) {
      this.router.navigate(['']);
    }
  }

  refresh() {
    return this.loginService
      .refresh(filterObject({ refresh_token: this.tokenService.getRefreshToken() }))
      .pipe(
        catchError(() => of(undefined)),
        tap(token => this.tokenService.set(token)),
        map(() => this.check())
      );
  }

  logout() {

       this.account.deleteSession('current').then(a=>{
        console.log('Logged out successfully');
       }).catch((e:AppwriteException)=>{
        console.error('Error during logout:', e);

       });


    return this.loginService.logout().pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }

  menu() {
    return iif(() => this.check(), this.loginService.menu(), of([]));
  }

  private assignUser() {
    if (!this.check()) {
      return of({}).pipe(tap(user => this.user$.next(user)));
    }

    if (!isEmptyObject(this.user$.getValue())) {
      return of(this.user$.getValue());
    }

    return this.loginService.me().pipe(tap(user => this.user$.next(user)));
  }
}
