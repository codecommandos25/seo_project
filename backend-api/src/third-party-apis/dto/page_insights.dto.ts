import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PageInsightsDto {
  @ApiProperty({
    description: 'URL to analyze',
    example: 'https://example.com',
  })
  @IsString()
  url: string;
}
