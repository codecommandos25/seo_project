import { Injectable, HttpException } from '@nestjs/common';
import { MetaAccessTokenDto } from './dto/meta-facebook-accessToken.dto';
import { MetaFacebookPageDto } from './dto/meta-facebook-overview.dto';
import { MetaFacebookPagePostsDto } from './dto/facebook-page-posts.dto';
import { MetaFacebookInsightsDto } from './dto/facebook-page-insights.dto';
import { MetaFacebookCountryDistributionDto } from './dto/facebook-country-distribution.dto';

@Injectable()
export class MetaApisService {
  async getPageAccessToken(payload: MetaAccessTokenDto) {
    if (!payload.code) {
      throw new HttpException('Code is required to get access token', 400);
    }

    try {
      const tokenRes = await fetch(
        `https://graph.facebook.com/v21.0/oauth/access_token?` +
          new URLSearchParams({
            client_id: process.env.APP_ID,
            client_secret: process.env.APP_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            code: payload.code,
          }),
      );

      const tokenData = await tokenRes.json();

      if (!tokenData.access_token) {
        throw new HttpException('Failed to fetch user access token', 400);
      }

      const userAccessToken = tokenData?.access_token;
      // console.log('✅ User Access Token:', userAccessToken);

      // Step 4: Get Pages the user manages
      const pagesRes = await fetch(
        `https://graph.facebook.com/me/accounts?access_token=${userAccessToken}`,
      );

      const pagesData = await pagesRes.json();

      if (!pagesData.data?.length) {
        throw new HttpException(
          'No pages found or user has no admin access',
          404,
        );
      }

      const pageAccessToken = pagesData.data[0].access_token;
      console.log('✅ Page Access Token:', pageAccessToken);
      return {
        success: true,
        message: 'Data fetched successfully',
        data: pagesData.data,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.response?.data || 'Facebook API error',
        500,
      );
    }
  }
  async getFaceBookPageOverview(payload: MetaFacebookPageDto) {
    try {
      // Define time range for last 30 days
      const until = Math.floor(Date.now() / 1000);
      const since = until - 30 * 24 * 60 * 60;

      const url =
        `https://graph.facebook.com/v19.0/${payload.pageId}?` +
        new URLSearchParams({
          fields: 'followers_count,fan_count',
          access_token: payload.pageAccessToken,
        });

      const pageRes = await fetch(url);
      const data = await pageRes.json();

      const insightsUrl =
        `https://graph.facebook.com/v23.0/${payload.pageId}/insights?` +
        new URLSearchParams({
          metric:
            'page_impressions,page_posts_impressions_unique,page_post_engagements',
          period: 'days_28',
          access_token: payload.pageAccessToken,
        });

      const insightsRes = await fetch(insightsUrl);
      const insightsData = await insightsRes.json();

      return {
        success: true,
        message: 'Data fetched successfully',
        followers: data.followers_count,
        likes: data.fan_count,
        engagement: insightsData,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getFaceBookPagePosts(payload: MetaFacebookPagePostsDto) {
    try {
      const baseUrl = `https://graph.facebook.com/v19.0/${payload.pageId}/posts`;

      // Build query params
      const params = new URLSearchParams({
        access_token: payload.pageAccessToken,
        fields: [
          'id',
          'message',
          'created_time',
          'full_picture',
          'permalink_url',
          'shares',
          'likes.summary(true)',
          'comments.summary(true)',
          'attachments{media_type,type}',
        ].join(','),
        limit: String(payload.limit) || '10',
      });

      if (payload.after) {
        params.append('after', payload.after);
      }
      if (payload.before) {
        params.append('before', payload.before);
      }

      const url = `${baseUrl}?${params.toString()}`;
      const postsRes = await fetch(url);
      const postsData = await postsRes.json();

      if (!postsData.data || !postsData.data.length) {
        throw new HttpException('No posts found for this page', 404);
      }

      // Format posts
      const posts = postsData.data.map((post: any) => ({
        id: post.id,
        message: post.message || '',
        created_time: post.created_time,
        full_picture: post.full_picture || null,
        permalink_url: post.permalink_url,
        total_likes: post.likes?.summary?.total_count || 0,
        total_comments: post.comments?.summary?.total_count || 0,
        total_shares: post.shares?.count || 0,
        type:
          post.attachments?.data?.[0]?.media_type ||
          post.attachments?.data?.[0]?.type ||
          'unknown',
      }));

      return {
        success: true,
        message: 'Posts fetched successfully',
        data: posts,
        paging: postsData.paging || null,
      };
    } catch (error) {
      console.error('Error fetching Facebook page posts:', error);
      throw new HttpException(error, error.response?.status || 500);
    }
  }
  async getFacebookPageInsights(payload: MetaFacebookInsightsDto) {
    try {
      const now = new Date();
      const until = Math.floor(now.getTime() / 1000);
      const since = until - payload.days * 24 * 60 * 60; // N days ago

      const metrics = [
        'page_views_total', // Page Views
        'page_post_engagements', // Engagement
        'page_impressions_unique', // Reach
      ].join(',');

      const url =
        `https://graph.facebook.com/v19.0/${payload.pageId}/insights?` +
        new URLSearchParams({
          metric: metrics,
          period: 'day',
          since: since.toString(),
          until: until.toString(),
          access_token: payload.pageAccessToken,
        });

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new HttpException(data, response.status);
      }

      return {
        success: true,
        message: 'Insights fetched successfully',
        data: data,
      };
    } catch (err) {
      console.error(' Error fetching audience data:', err || err.message);
      throw new HttpException(err, 500);
    }
  }
  async countryDistributionGraph(payload: MetaFacebookCountryDistributionDto) {
    try {
      const params = new URLSearchParams({
        metric: 'page_fans_country',
        period: 'lifetime',
        access_token: payload.pageAccessToken,
      });

      // Optional pagination controls
      if (payload.after) {
        params.append('after', payload.after);
      }
      if (payload.before) {
        params.append('before', payload.before);
      }
      if (payload.limit) {
        params.append('limit', payload.limit.toString());
      }

      const url = `https://graph.facebook.com/v19.0/${payload.pageId}/insights?${params.toString()}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new HttpException(data, response.status);
      }

      return {
        success: true,
        message: 'Country distribution fetched successfully',
        data,
      };
    } catch (err) {
      console.error('Error fetching age distribution:', err || err.message);
      throw new HttpException(err, 500);
    }
  }
  async getTopPosts(payload: MetaFacebookPagePostsDto) {
    try {
      // Step 1: Fetch recent posts
      const postsUrl =
        `https://graph.facebook.com/v19.0/${payload.pageId}/posts?` +
        new URLSearchParams({
          fields: 'id,message,created_time,permalink_url',
          limit: (payload.limit || 20).toString(), // fetch 20 posts by default
          access_token: payload.pageAccessToken,
        });

      const postsResponse = await fetch(postsUrl);
      const postsData = await postsResponse.json();

      if (!postsResponse.ok) {
        throw new HttpException(postsData, postsResponse.status);
      }

      const posts = postsData?.data || [];
      if (posts.length === 0) {
        return {
          success: true,
          message: 'No posts available',
          data: [],
        };
      }

      // Step 2: Fetch insights for each post
      const enrichedPosts = await Promise.all(
        posts.map(async (post: any) => {
          const insightsUrl =
            `https://graph.facebook.com/v19.0/${post.id}/insights?` +
            new URLSearchParams({
              metric: 'post_impressions_unique',
              access_token: payload.pageAccessToken,
            });

          const insightsResponse = await fetch(insightsUrl);
          const insightsData = await insightsResponse.json();

          if (!insightsResponse.ok) {
            console.error(`Failed insights for post ${post.id}`, insightsData);
            return null;
          }

          // Extract metrics
          const reach =
            insightsData?.data?.find(
              (m: any) => m.name === 'post_impressions_unique',
            )?.values?.[0]?.value || 0;
          // const engagement =
          //   insightsData?.data?.find(
          //     (m: any) => m.name === 'post_engaged_users',
          //   )?.values?.[0]?.value || 0;

          return {
            id: post.id,
            description: post.message || '',
            created_time: post.created_time,
            permalink_url: post.permalink_url,
            // engagement,
            reach,
          };
        }),
      );

      // Step 3: Filter nulls and sort by engagement
      const validPosts = enrichedPosts.filter((p) => p !== null);
      const sorted = validPosts.sort((a, b) => b.engagement - a.engagement);

      // Step 4: Return top 3
      return {
        success: true,
        message: 'Top 3 posts fetched successfully',
        data: sorted.slice(0, 3),
      };
    } catch (err) {
      console.error('Error fetching top posts:', err?.message || err);
      throw new HttpException(err, 500);
    }
  }
}
