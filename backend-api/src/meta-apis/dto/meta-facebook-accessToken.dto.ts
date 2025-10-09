import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MetaAccessTokenDto {
  @ApiProperty({
    description: 'provide code which will be getting from from facebook redirect',
    example: '4/0AVMBxxxxx-xxxxx.....',
  })
  @IsString()
  code: string;
  
}


