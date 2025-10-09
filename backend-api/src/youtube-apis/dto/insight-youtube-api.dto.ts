import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class YoutubeVideoInsightDto {
  @ApiProperty({
    description: 'provide access token',
    example: '4/0AVMBxxxxx-xxxxx.....',
  })
  @IsString()
  accessToken: string;
  @ApiProperty({
    description: 'Channel Id',
    example: 'HAHFYFVJGEI^&^&',
  })
  @IsString()
  channelId: string;
  @ApiProperty({
    description: 'No of days to fetch data',
    example: '30 days',
  })
  @IsString()
  days: string;
}

export class SubscriberGrowthGraphDto {
  @ApiProperty({
    description: 'provide access token',
    example: '4/0AVMBxxxxx-xxxxx.....',
  })
  @IsString()
  accessToken: string;
  @ApiProperty({
    description: 'Channel Id',
    example: 'UCE1__ftf5VAeqJVAwUCM5eA',
  })
  @IsString()
  channelId: string;
  @ApiProperty({
    description: 'No of days to fetch data',
    example: '30 days',
  })
  @IsString()
  days: string;
}
