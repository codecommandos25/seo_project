import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BacklinkDetailedDto {
  @ApiProperty({
    description: 'Target domain for backlink analysis',
    example: 'forbes.com',
  })
  @IsString()
  target: string;

  @ApiProperty({
    description: 'Mode of backlink analysis',
    example: 'as_is',
  })
  @IsString()
  mode: string;

  @ApiProperty({
    description: 'Filters to apply for backlink analysis',
    example: ['dofollow', '=', true],
    type: [Object],
  })
  filters: any[];

  @ApiProperty({
    description: 'Limit for number of results',
    example: 5,
  })
  limit: number;
}
