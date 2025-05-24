import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TrafficGraphDto {
  @ApiProperty({
    description: 'Target domains to analyze',
    example: ['dataforseo.com'],
    type: [String],
  })
  @IsString({ each: true })
  targets: string[];

  @ApiProperty({
    description: 'Location code for analysis',
    example: 2840,
  })
  location_code: number;

  @ApiProperty({
    description: 'Language code for analysis',
    example: 'en',
  })
  @IsString()
  language_code: string;

  @ApiProperty({
    description: 'Types of traffic to analyze',
    example: ['organic', 'paid'],
    type: [String],
  })
  @IsString({ each: true })
  item_types: string[];

  @ApiProperty({
    description: 'Start date for analysis',
    example: '2022-01-01',
  })
  @IsString()
  date_from: string;

  @ApiProperty({
    description: 'End date for analysis',
    example: '2022-05-01',
  })
  @IsString()
  date_to: string;
}
