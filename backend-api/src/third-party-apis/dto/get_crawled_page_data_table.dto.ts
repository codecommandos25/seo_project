import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class GetCrawledPageDataTableDto {
  @ApiProperty({
    description: 'Target URL to crawl',
    example: 'https://example.com',
  })
  @IsString()
  target: string;

  @ApiProperty({
    description: 'Limit for number of results',
    example: 10,
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: 'Offset for pagination',
    example: 0,
  })
  @IsNumber()
  offset: number;
}
