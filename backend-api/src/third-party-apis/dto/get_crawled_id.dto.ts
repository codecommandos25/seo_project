import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetCrawledIdDto {
  @ApiProperty({
    description: 'Target domain to analyze',
    example: 'forbes.com',
  })
  @IsString()
  target: string;

  @ApiProperty({
    description: 'Maximum number of pages to crawl',
    example: 10,
  })
  @IsNumber()
  max_crawl_pages: number;
}
