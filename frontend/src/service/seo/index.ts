import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { MutationOptionsType, QueryOptionsGenricType } from '@/lib/query'
import { queries } from '../queryKeys'
import * as API from './api'

// export const useGetUserList = (
//   data: employeeListType,
//   options?: QueryOptionsGenricType<UsersResponse, Error>
// ) =>
//   useQuery<UsersResponse, Error>(
//     queries?.settings?.getUserList(data).queryKey,
//     () => API.UserList(data),
//     options
//   );

// export const useGetUserRole = (
//   options?: QueryOptionsGenricType<UserRole[], Error>
// ) =>
//   useQuery<UserRole[], Error>(
//     queries?.settings.getuserRole.queryKey,
//     () => API.UserRole(),
//     options
//   );

// export const useGetUserDetails = (
//   options?: QueryOptionsGenricType<User, Error>
// ) =>
//   useQuery<User, Error>(
//     queries?.settings.getuserRoleType.queryKey,
//     () => API.UserDetails(),
//     options
//   );

// export const useAddUser = (options?: MutationOptionsType) =>
//   useMutation(API.addUserDetails, options);

// export const useChangePassword = (options?: MutationOptionsType) =>
//   useMutation(API.changePassword, options);

// export const useRemoveUser = (options: MutationOptionsType) =>
//   useMutation(API.RemoveUser, options);

// export const useUpdateUser = (options: MutationOptionsType) =>
//   useMutation(API.updateUser, options);

// export const useUpdateProfile = (options: MutationOptionsType) =>
//   useMutation(API.updateUserPofile, options);

// export const useAddUser = (options: MutationOptionsType) =>
//   useMutation(API.SEODetails, options)

// export const useAddUser = (options?: UseMutationOptions<any, Error, any>) => {
//   return useMutation<any, Error, any>({
//     mutationFn: API.SEODetails,
//     ...options
//   });
// };

export const useSEODetails = (options?: MutationOptionsType) =>
  useMutation({
    mutationFn: API.SEODetails,
    ...options,
  })

export const useSEOKeywords = (options?: MutationOptionsType) =>
  useMutation({
    mutationFn: API.SEOKeywords,
    ...options,
  })

export const useSEOGraph = (options?: MutationOptionsType) =>
  useMutation({
    mutationFn: API.SEOGraph,
    ...options,
  })

export const useGetPageInsights = (
  data: { url: string },
  options?: QueryOptionsGenricType<API.PerformanceMetrics, Error>
) =>
  useQuery<API.PerformanceMetrics, Error>(
    queries?.seo.getPageInsights.queryKey,
    () => API.PageInsights(data),
    options
  )

export const useTopanchor = (options?: MutationOptionsType) =>
  useMutation({
    mutationFn: API.Topanchor,
    ...options,
  })

export const useBacklinkDomain = (options?: MutationOptionsType) =>
  useMutation({
    mutationFn: API.BacklinkDomain,
    ...options,
  })

export const useSEOKeywordsTable = (options?: MutationOptionsType) =>
  useMutation({
    mutationFn: API.SEOKeywordsTable,
    ...options,
  })

export const useOnPageSEOTable = (options?: MutationOptionsType) =>
  useMutation({
    mutationFn: API.pageOnSEO,
    ...options,
  })

export const useCrawledSEOTable = (options?: MutationOptionsType) =>
  useMutation({
    mutationFn: API.CrawledSEOTable,
    ...options,
  })

export const useBacklinkSEOTable = (options?: MutationOptionsType) =>
  useMutation({
    mutationFn: API.BacklinkSEOTable,
    ...options,
  })

export const useCompetitorsSEOTable = (options?: MutationOptionsType) =>
  useMutation({
    mutationFn: API.CompetitorsSEOTable,
    ...options,
  })
