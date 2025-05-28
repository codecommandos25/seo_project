import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetDomainAuthorityScoreDto {
  @ApiProperty({
    description: 'List of target domains to analyze',
    example: ['forbes.com', 'cnn.com', 'bbc.com'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  targets: string[];
}
