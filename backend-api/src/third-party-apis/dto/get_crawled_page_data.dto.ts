import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCrawledPageDataDto {
  @ApiProperty({
    description: 'ID of the crawl task',
    example: '06212119-1002-0216-2000-3a483c51b09f',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Filters to apply to the crawled pages',
    example: [
      ['resource_type', '=', 'html'],
      'and',
      ['meta.description', 'like', '%OnPage%'],
    ],
    type: [Array],
  })
  @IsArray()
  filters: (string[] | string)[];

  @ApiProperty({
    description: 'Limit of results to return',
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({
    description: 'Offset of results to return',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  offset?: number;
}
