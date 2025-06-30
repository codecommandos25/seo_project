import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class WebsiteSpeedDto {
  @ApiProperty({
    description: 'The URL to test website speed for',
    example: 'https://dataforseo.com',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Whether to test for mobile (true) or desktop (false)',
    example: false,
  })
  for_mobile: boolean;

  @ApiProperty({
    description: 'Categories to include in the speed test',
    example: ['performance'],
    type: [String],
  })
  categories: string[];

  @ApiProperty({
    description: 'Audits to include in the speed test',
    example: [
      'metrics',
      'network-requests',
      'byte-efficiency/total-byte-weight',
    ],
    type: [String],
  })
  audits: string[];
}
