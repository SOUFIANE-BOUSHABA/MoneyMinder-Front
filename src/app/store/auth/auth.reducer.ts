import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from '../../core/models/auth.model';


const userFromStorage = {
  email: '',
  firstName: localStorage.getItem('firstName') || '',
  lastName: localStorage.getItem('lastName') || '',
  role: localStorage.getItem('role') || '',
};

const initialState: AuthState = {
  user: localStorage.getItem('token') ? userFromStorage : null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
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
    localStorage.setItem('role', user.role);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    return { ...state, user, token, refreshToken, isAuthenticated: true, error: null };
  }),




  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),




  on(AuthActions.logout, (state) => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    return { ...state, user: null, token: null, refreshToken: null, isAuthenticated: false };
  }),




  on(AuthActions.refreshTokenSuccess, (state, { token }) => {
    localStorage.setItem('token', token);
    return { ...state, token, error: null };
  }),




  on(AuthActions.refreshTokenFailure, (state, { error }) => ({ ...state, error }))
);
