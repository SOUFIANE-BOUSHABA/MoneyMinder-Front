import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import {User} from "../../core/models/auth.model";
import {login, loginFailure, loginSuccess} from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response) => {
            const user: User = {
              email: email,
              firstName: response.firstname,
              lastName: response.lastname,
              role: response.role,
            };

            return loginSuccess({
              user,
              token: response.accessToken,
              refreshToken: response.refreshToken,
            });
          }),
          catchError((error) =>
            of(loginFailure({ error: error?.message || 'Login failed' }))
          )
        )
      )
    )
  );



  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ email, password, firstName, lastName }) =>
        this.authService.register(email, password, firstName, lastName).pipe(
          map((response) => AuthActions.registerSuccess({ message: response.message })),
          catchError((error) => of(AuthActions.registerFailure({ error: error.message })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {

          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  loginSuccessRedirect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );
}
