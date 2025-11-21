export interface SignUpRequest {
  first_name: string;
  last_name?: string;
  date_of_birth: Date;
  gender: string | "male" | "female";
  email_address: string;
  password_email: string;
}

export interface SignInRequest {
  full_name?: string;
  email_address: string;
  password_email: string;
}
