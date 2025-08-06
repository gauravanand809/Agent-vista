export interface UserResponseWithToken {
  id: string;
  candidate_id: string;
  name: string;
  email: string;
  created_at: string;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export interface User {
  id: string;
  candidate_id: string;
  name: string;
  email: string;
  created_at: string;
}
