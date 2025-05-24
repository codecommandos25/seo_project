import { IsArray, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DomainAnalyticsDto {
  @ApiProperty({
    description: 'Limit of results to return',
    example: 100,
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: 'Array of filter conditions',
    example: [['domain', '=', 'example.com']],
    type: [String],
    isArray: true,
  })
  @IsArray()
  @IsArray({ each: true })
  @IsString({ each: true })
  filters: Array<string[]>;
}

export class DomainAnalyticsListDto {
  @ApiProperty({
    description: 'List of domains to compare against',
    type: [DomainAnalyticsDto],
  })
  @IsArray()
  @IsString({ each: true })
  domains: DomainAnalyticsDto[];
}
