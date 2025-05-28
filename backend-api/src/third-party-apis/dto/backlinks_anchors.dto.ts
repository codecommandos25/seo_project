import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class BacklinksAnchorsDto {
  @ApiProperty({
    description: 'Target domain to analyze',
    example: 'forbes.com',
  })
  @IsString()
  target: string;

  @ApiProperty({
    description: 'Limit of results to return',
    example: 4,
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: 'Order results by specific fields',
    example: ['backlinks,desc'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  order_by: string[];

  @ApiProperty({
    description: 'Filters for backlinks',
    example: ['anchor', 'like', '%news%'],
    type: [String],
  })
  @IsArray()
  filters: Array<string>;
}
