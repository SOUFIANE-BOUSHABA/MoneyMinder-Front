import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response) => AuthActions.loginSuccess({
            user: response.user,
            token: response.accessToken,
            refreshToken: response.refreshToken
          })),
          catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
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
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );
}
