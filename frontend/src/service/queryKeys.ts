import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";


export const authQueries = createQueryKeys("auth", {
  userLogin: null,
  getUserInfo: null,
  getSignUpInfo: null,
  getUser: null,
  getUserType: null,
  // verifyEmail: (email) => [email],
});

export const seoQueries = createQueryKeys("seo", {
  getPageInsights: null,
  // getState: (id) => [id],
});



export const queries = mergeQueryKeys(
  seoQueries,
  authQueries,
);
