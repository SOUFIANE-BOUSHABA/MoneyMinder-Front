import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from '../../core/models/auth.model';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  error: null,
};

export const authReducer = createReducer(
  initialState,



  on(AuthActions.registerSuccess, (state) => ({ ...state, error: null })),



  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, error })),





  on(AuthActions.loginSuccess, (state, { user, token, refreshToken }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    return { ...state, user, token, refreshToken, isAuthenticated: true, error: null };
  }),




  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),




  on(AuthActions.logout, (state) => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return { ...state, user: null, token: null, refreshToken: null, isAuthenticated: false };
  }),





  on(AuthActions.refreshTokenSuccess, (state, { token }) => {
    localStorage.setItem('token', token);
    return { ...state, token, error: null };
  }),




  on(AuthActions.refreshTokenFailure, (state, { error }) => ({ ...state, error }))
);
