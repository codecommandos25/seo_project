import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { MutationOptionsType, QueryOptionsGenricType } from '@/lib/query'
import { queries } from '../queryKeys'
import * as API from './api'

export const useGetYoutubeUpdateAccessToken = (
  data: { refreshToken: string },
  options?: QueryOptionsGenricType<API.GoogleAuthTokenResponse, Error>
) =>
  useQuery<API.GoogleAuthTokenResponse, Error>(
    queries?.youtube.getUpdateToken.queryKey,
    () => API.YoutubeUpdateAccessToken(data),
    options
  )

export const useGetYoutubeVideos = (
  data: { accessToken: string; maxResults: number; type: string },
  options?: QueryOptionsGenricType<API.YouTubeVideosResponseStrict, Error>
) =>
  useQuery<API.YouTubeVideosResponseStrict, Error>(
    queries?.youtube.getYoutubeVideo.queryKey,
    () => API.getYoutubeVideos(data),
    options
  )

//Youtube
export const useGetYoutubeVideosInsight = (
  data: { accessToken: string; channelId: string; days: string },
  options?: QueryOptionsGenricType<API.YouTubeInsightsResponse, Error>
) =>
  useQuery<API.YouTubeInsightsResponse, Error>(
    queries?.youtube.getYoutubeVideo.queryKey,
    () => API.getYoutubeVideosInsight(data),
    options
  )

export const useGetYoutubeAudienceDemograph = (
  data: { accessToken: string; channelId: string; days: string },
  options?: QueryOptionsGenricType<any, Error>
) =>
  useQuery<any, Error>(
    queries?.youtube.getYoutubeVideo.queryKey,
    () => API.getYoutubeVideosAudienceDemograph(data),
    options
  )

export const useGetYoutubeSubscriberGrowth = (
  data: { accessToken: string; channelId: string; days: string },
  options?: QueryOptionsGenricType<any, Error>
) =>
  useQuery<any, Error>(
    queries?.youtube.getYoutubeVideo.queryKey,
    () => API.getYoutubeVideosSubscriberGrowth(data),
    options
  )

export const useGetYoutubeViewGraphData = (
  data: { accessToken: string; channelId: string; days: string },
  options?: QueryOptionsGenricType<any, Error>
) =>
  useQuery<any, Error>(
    queries?.youtube.getYoutubeVideo.queryKey,
    () => API.getYoutubeVideosViewGraphData(data),
    options
  )

export const useGetYoutubeGenderGraphhData = (
  data: { accessToken: string; channelId: string; days: string },
  options?: QueryOptionsGenricType<any, Error>
) =>
  useQuery<any, Error>(
    queries?.youtube.getYoutubeVideo.queryKey,
    () => API.getYoutubeVideosGenderGraphhData(data),
    options
  )

export const useGetYoutubeImpressionGraphhData = (
  data: { accessToken: string; channelId: string; days: string },
  options?: QueryOptionsGenricType<any, Error>
) =>
  useQuery<any, Error>(
    queries?.youtube.getYoutubeVideo.queryKey,
    () => API.getYoutubeImpressionGraphhData(data),
    options
  )

export const useGetYoutubeVideosCountryGraphhData = (
  data: { accessToken: string; channelId: string; days: string },
  options?: QueryOptionsGenricType<any, Error>
) =>
  useQuery<any, Error>(
    queries?.youtube.getYoutubeVideo.queryKey,
    () => API.getYoutubeVideosCountryGraphhData(data),
    options
  )

export const useGetYoutubeVideosAudienceAquisition = (
  data: { accessToken: string; channelId: string; days: string },
  options?: QueryOptionsGenricType<any, Error>
) =>
  useQuery<any, Error>(
    queries?.youtube.getYoutubeVideo.queryKey,
    () => API.getYoutubeVideosAudienceAquisition(data),
    options
  )
