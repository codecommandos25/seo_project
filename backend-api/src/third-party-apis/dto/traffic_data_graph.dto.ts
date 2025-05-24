import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TrafficByTimeDto {
  @ApiProperty({
    description: 'Target domain to analyze',
    example: 'example.com',
  })
  @IsString()
  target: string;

  @ApiProperty({
    description: 'Location name for analysis',
    example: 'United States',
  })
  @IsString()
  location_name: string;

  @ApiProperty({
    description: 'Language name for analysis',
    example: 'English',
  })
  @IsString()
  language_name: string;
}
