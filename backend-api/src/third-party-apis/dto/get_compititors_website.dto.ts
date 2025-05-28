import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetCompetitorsWebsiteDto {
  @ApiProperty({
    description: 'Target domain to analyze',
    example: 'example.com',
  })
  @IsString()
  domain: string;
}
