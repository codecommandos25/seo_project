import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsArray } from 'class-validator';

export class BacklinksDomainsDto {
  @ApiProperty({
    description: 'Target domain to analyze',
    example: 'example.com',
  })
  @IsString()
  target: string;

  @ApiProperty({
    description: 'Limit of results to return',
    example: 100,
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: 'Order results by specific fields',
    example: ['rank', 'backlinks'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  order_by: string[];

  @ApiProperty({
    description: 'Exclude internal backlinks from results',
    example: true,
  })
  @IsBoolean()
  exclude_internal_backlinks: boolean;

  @ApiProperty({
    description: 'Filters for backlinks',
    example: ['follow', 'nofollow'],
    type: [String],
  })
  @IsArray()
  backlinks_filters: Array<boolean | string>;

  @ApiProperty({
    description: 'Additional filters',
    example: ['spam_score', 'domain_rank'],
    type: [String],
  })
  @IsArray()
  filters: Array<number | string>;
}
