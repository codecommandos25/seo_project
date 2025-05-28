import { IsString, IsNumber } from 'class-validator';

export class CompetitorsDomainTrafficKeywordOverlapDto {
  @IsString()
  target: string;

  @IsString()
  language_name: string;

  @IsNumber()
  location_code: number;

  @IsNumber()
  limit: number;
}
