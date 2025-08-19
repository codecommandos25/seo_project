import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MetaFacebookInsightsDto {
  @ApiProperty({
    description: 'Page access token',
    example:
      'EAALA0yUzZC9UBPIAGAMkZAiZA3xPJogrEjeAMvFezOju9hcW14uSNQ1fFm171v2eB5n0hOwxl8ZA4fqjawDmuZClN4LzWxbLBACTHrj4hdvmU1qzrAMUt36MZBwjNdoeQEW8a5cSrT6wU56CqCoXW8zvi9XBJVx9xucrttdzF6BcaFpf3j950imzrhvKOYHvFr2iMZD',
  })
  @IsString()
  @IsNotEmpty()
  pageAccessToken: string;

  @ApiProperty({ description: 'Facebook Page ID', example: '109962392152180' })
  @IsString()
  @IsNotEmpty()
  pageId: string;

  @ApiProperty({ description: 'Number of days (e.g. 7, 30,90)', example: 7 })
  @IsNumber()
  days: number;
}
