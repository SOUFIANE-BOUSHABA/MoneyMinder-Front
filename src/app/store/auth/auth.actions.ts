import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/auth.model';

export const register = createAction('[Auth] Register', props<{ email: string; password: string; firstName: string; lastName: string }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ message: string }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User; token: string; refreshToken: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');

export const refreshToken = createAction('[Auth] Refresh Token', props<{ refreshToken: string }>());
export const refreshTokenSuccess = createAction('[Auth] Refresh Token Success', props<{ token: string }>());
export const refreshTokenFailure = createAction('[Auth] Refresh Token Failure', props<{ error: string }>());
