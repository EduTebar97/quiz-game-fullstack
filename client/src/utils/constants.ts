export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  QUIZ: {
    LIST: '/quiz/list',
    GET: (id: string) => `/quiz/${id}`,
  },
};
