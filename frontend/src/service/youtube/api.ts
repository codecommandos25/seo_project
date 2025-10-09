import { DELETE, GET, POST, PUT } from '@/lib/AxiosClient'

export type OAuthQueryParams = {
  client_id: string
  redirect_uri: string
  response_type: string
  scope: string // or string, if you plan to keep it space-separated
  access_type: string
  prompt: string
  service: string
  o2v: string
  flowName: string
}

export interface GoogleAuthTokenResponse {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
  refresh_token_expires_in: number
}

interface Thumbnail {
  url: string
  width: number
  height: number
}

export interface YoutubeVideoType {
  kind: 'youtube#video'
  etag: string
  id: string
  snippet: {
    publishedAt: string // Could be Date if you want to parse it
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: Thumbnail
      medium: Thumbnail
      high: Thumbnail
      standard: Thumbnail
      maxres: Thumbnail
    }
    channelTitle: string
    categoryId: string
    liveBroadcastContent: 'none' | 'live' | 'upcoming'
    defaultLanguage: string
    localized: {
      title: string
      description: string
    }
    defaultAudioLanguage: string
  }
  contentDetails: {
    duration: string // ISO 8601 duration format
    dimension: '2d' | '3d'
    definition: 'sd' | 'hd'
    caption: 'true' | 'false'
    licensedContent: boolean
    regionRestriction?: {
      blocked: string[]
    }
    contentRating: Record<string, unknown>
    projection: 'rectangular' | '360' | 'equirectangular'
    hasCustomThumbnail: boolean
  }
  statistics: {
    viewCount: string
    likeCount: string
    dislikeCount: string
    favoriteCount: string
    commentCount: string
  }
  engagementRate: number
}

export interface YouTubeVideosResponseStrict {
  channelId: string
  next_page: string | null
  prev_page: string | null
  videos: YoutubeVideoType[]
}

 export type YouTubeInsightsResponse = {
  subscribersGained: number;
  totalViews: number;
  estimatedMinutesWatched: number;
  subscribersLost: number;
};

// export const PageInsights = (data: {url:string}) =>
//   GET({
//     url: `http://13.234.181.212:8000/third-party-apis/page_insights?url=${data.url}`,
//   }).then((res) => res.data);

export const YoutubeUpdateAccessToken = (data: { refreshToken: string }) =>
  GET({
    url: `http://13.234.181.212:8000/third-party-apis/update_access_token?refreshToken=${data.refreshToken}`,
  }).then((res) => res.data)

export const getYoutubeVideos = (data: {
  accessToken: string
  maxResults: number
  type: string
}) =>
  GET({
    url: `http://13.234.181.212:8000/third-party-apis/getYoutubeVideos?accessToken=${data.accessToken}&maxResults=${data.maxResults}&type=${data.type}`,
  }).then((res) => res.data)

//Youtube
export const getYoutubeVideosInsight = (data: {
  accessToken: string
  channelId: string
  days: string
}) =>
  GET({
    url: `http://13.234.181.212:8000/youtube-apis/get-youtube-insights?accessToken=${data.accessToken}&maxResults=${data.channelId}&type=${data.days}`,
  }).then((res) => res.data)

export const getYoutubeVideosSubscriberGrowth = (data: {
  accessToken: string
  channelId: string
  days: string
}) =>
  GET({
    url: `http://13.234.181.212:8000/youtube-apis/get-subscriber-growth-data?accessToken=${data.accessToken}&maxResults=${data.channelId}&type=${data.days}`,
  }).then((res) => res.data)

export const getYoutubeVideosAudienceDemograph = (data: {
  accessToken: string
  channelId: string
  days: string
}) =>
  GET({
    url: `http://13.234.181.212:8000/youtube-apis/get-audience-demograph?accessToken=${data.accessToken}&maxResults=${data.channelId}&type=${data.days}`,
  }).then((res) => res.data)

export const getYoutubeVideosViewGraphData = (data: {
  accessToken: string
  channelId: string
  days: string
}) =>
  GET({
    url: `http://13.234.181.212:8000/youtube-apis/get-view-graph-data?accessToken=${data.accessToken}&maxResults=${data.channelId}&type=${data.days}`,
  }).then((res) => res.data)

export const getYoutubeImpressionGraphhData = (data: {
  accessToken: string
  channelId: string
  days: string
}) =>
  GET({
    url: `http://13.234.181.212:8000/youtube-apis/get-impression-graph-data?accessToken=${data.accessToken}&maxResults=${data.channelId}&type=${data.days}`,
  }).then((res) => res.data)

export const getYoutubeVideosGenderGraphhData = (data: {
  accessToken: string
  channelId: string
  days: string
}) =>
  GET({
    url: `http://13.234.181.212:8000/youtube-apis/get-age-gender-graph-data?accessToken=${data.accessToken}&maxResults=${data.channelId}&type=${data.days}`,
  }).then((res) => res.data)

export const getYoutubeVideosCountryGraphhData = (data: {
  accessToken: string
  channelId: string
  days: string
}) =>
  GET({
    url: `http://13.234.181.212:8000/youtube-apis/get-contry-graph-data?accessToken=${data.accessToken}&maxResults=${data.channelId}&type=${data.days}`,
  }).then((res) => res.data)

export const getYoutubeVideosAudienceAquisition = (data: {
  accessToken: string
  channelId: string
  days: string
}) =>
  GET({
    url: `http://13.234.181.212:8000/youtube-apis/get-audience-aquisition-data?accessToken=${data.accessToken}&maxResults=${data.channelId}&type=${data.days}`,
  }).then((res) => res.data)
