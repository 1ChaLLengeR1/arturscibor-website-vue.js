export interface AuthTokens {
  id_user: string | null;
  access_token: string | null;
  refresh_token: string | null;
  type: string | null;
}

export interface AuthState {
  optionsTokens: AuthTokens;
}

export function state(): AuthState {
  return {
    optionsTokens: {
      id_user: null,
      access_token: null,
      refresh_token: null,
      type: null,
    },
  };
}
