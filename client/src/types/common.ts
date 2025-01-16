export interface User {
  id: string;
  email: string;
  username: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
