// import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
// import type { AxiosResponse } from 'axios';
// export type MutationOptionsType = Omit<
//   UseMutationOptions<AxiosResponse<any, any>, unknown, unknown>,
//   'mutationFn'
// >;
// export type QueryOptionsType = Omit<
//   UseQueryOptions<AxiosResponse<any, any>, unknown, AxiosResponse<any, any>>,
//   'initialData'
// >;
// export type QueryOptionsGenricType<T, E> = UseQueryOptions<T, E>;
import type { AxiosError, AxiosResponse } from 'axios'
import type {
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

// For mutations
export type MutationOptionsType<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<AxiosResponse<TData>, AxiosError, TVariables, unknown>,
  'mutationFn'
>

// For queries
export type QueryOptionsType<TData = unknown> = Omit<
  UseQueryOptions<AxiosResponse<TData>, AxiosError, TData, any[]>,
  'queryKey' | 'queryFn'
>

// Generic query options with more flexibility
// export type QueryOptionsGenericType<
//   TData = unknown,
//   TError = AxiosError,
// > = Omit<UseQueryOptions<TData, TError, TData, any[]>, 'queryKey' | 'queryFn'>

export type QueryOptionsGenricType<T, E> = UseQueryOptions<T, E>;

// Additional helper type for query results
export type QueryResultType<TData = unknown> = UseQueryResult<TData, AxiosError>
