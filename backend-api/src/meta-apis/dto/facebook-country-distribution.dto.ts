import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MetaFacebookCountryDistributionDto {
  @ApiProperty({
    description:
      'provide access token which will be page access token to fetch page data',
    example:
      'EAALA0yUzZC9UBPNYd9xRlUUDaitsZBKBcNN9biZCN6COQzC83LQtUJrRHf4ZBTL6EiDerl24eqZAtL0roSAoTZBolBep8eSC9GZBpQne2VbQBKIqZBWFU6eRcAuSZCcZB1ibnklI9KdImshYYijGK6wZCZBZAbQcYUmAHF2s5yoxnZB9O5ciFu4q340GmtIZAK1N9nt1B0iOwgZD',
  })
  @IsString()
  pageAccessToken: string;
  @ApiProperty({
    description: 'provide page Id of the facebook page',
    example: '109962392152180',
  })
  @IsString()
  pageId: string;
  @ApiPropertyOptional({
    description: 'Next for pagination',
    example: 'next',
  })
  @IsString()
  @IsOptional()
  after: string;
  @ApiPropertyOptional({
    description: 'previous for pagination',
    example: 'before',
  })
  @IsString()
  @IsOptional()
  before: string;
  @ApiPropertyOptional({
    description: 'limit for number of posts to fetch',
    example: '10',
  })
  @IsString()
  @IsOptional()
  limit: string;
}
