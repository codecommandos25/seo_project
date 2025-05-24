import { IsArray, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DomainAnalyticsDto {
  @ApiProperty({
    description: 'Target domain to analyze',
    example: 'newmouth.com',
  })
  @IsString()
  target: string;

  @ApiProperty({
    description: 'List of domains to compare against',
    example: ['dentaly.org', 'health.com', 'trysnow.com'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  intersecting_domains: string[];

  @ApiProperty({
    description: 'Language name for analysis',
    example: 'English',
  })
  @IsString()
  language_name: string;

  @ApiProperty({
    description: 'Location code for analysis',
    example: 2840,
  })
  @IsNumber()
  location_code: number;

  @ApiProperty({
    description: 'Limit of results to return',
    example: 3,
  })
  @IsNumber()
  limit: number;
}
