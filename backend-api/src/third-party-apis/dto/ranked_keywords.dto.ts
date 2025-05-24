import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class RankedKeywordsDto {
  @ApiProperty({
    description: 'Target domain to analyze',
    example: 'example.com',
  })
  @IsString()
  target: string;

  @ApiProperty({
    description: 'Language name for analysis',
    example: 'English',
  })
  @IsString()
  language_name: string;

  @ApiProperty({
    description: 'Location name for analysis',
    example: 'United States',
  })
  @IsString()
  location_name: string;

  @ApiProperty({
    description: 'Include SERP info in response',
    example: true,
  })
  @IsBoolean()
  include_serp_info: boolean;

  @ApiProperty({
    description: 'Load absolute rank information',
    example: true,
  })
  @IsBoolean()
  load_rank_absolute: boolean;

  @ApiProperty({
    description: 'Limit of results to return',
    example: 100,
  })
  @IsNumber()
  limit: number;
}
