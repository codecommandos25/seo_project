import { IsArray, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompetitorsDomainDto {
  @ApiProperty({
    description: 'Target domain to analyze',
    example: 'example.com',
  })
  @IsString()
  target: string;

  @ApiProperty({
    description: 'List of domains to compare against',
    example: ['competitor1.com', 'competitor2.com'],
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
    example: 100,
  })
  @IsNumber()
  @IsOptional()
  limit: number;
}

export class CompetitorsDomainListDto {
  @ApiProperty({
    description: 'List of domains to compare against',
    type: [CompetitorsDomainDto],
  })
  @IsArray()
  @IsString({ each: true })
  domains: CompetitorsDomainDto[];
}
