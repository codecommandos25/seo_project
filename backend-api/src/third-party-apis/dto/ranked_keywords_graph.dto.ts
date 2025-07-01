import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RankedKeywordsGraphDto {
  @ApiProperty({
    description: 'Target domain for ranked keywords graph',
    example: 'walmart.com',
  })
  @IsString()
  target: string;

  @ApiProperty({
    description: 'Language name for the search',
    example: 'English',
  })
  @IsString()
  language_name: string;

  @ApiProperty({
    description: 'Location code for the search',
    example: 2840,
  })
  location_code: number;
}
