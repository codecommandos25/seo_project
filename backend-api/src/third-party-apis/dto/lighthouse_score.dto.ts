import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class LighthouseScoreDto {
  @ApiProperty({
    description: 'URL to analyze',
    example: 'https://dataforseo.com',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Whether to analyze mobile version',
    example: false,
  })
  @IsOptional()
  for_mobile: boolean;

  @ApiProperty({
    description: 'Categories to analyze',
    example: ['seo', 'performance', 'pwa'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @ApiProperty({
    description: 'Specific audits to run',
    example: ['viewport'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  audits: string[];
}
