export type AuthUser = {
  id: number;
  email: string;
  phone?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  is_active?: boolean;
  [key: string]: unknown;
};

export type LoginPayload = {
  email_or_phone: string;
  password: string;
};

export type TokenPair = {
  access: string;
  refresh: string;
};

export type AccessClaims = {
  exp: number;
  user_id: number;
  [key: string]: unknown;
};
