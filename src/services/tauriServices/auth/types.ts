export interface ILoginPayload {
  type: string,
  schoolId: number,
  email: string,
  password: string,
}
export interface ISignupPayload {
  name: String
}
export interface IAuthResponse {
  token: string,
  school_id: number,
}

export interface IAuthUserResponse {
  name: string,
  img: string,
  school_id: number,
}