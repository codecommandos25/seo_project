import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetAccessTokenDto {
    @ApiProperty({
        description: 'Provide the code returned by Google after user login.',
        example: '4/0AVMBxxxxx-xxxxx.....',
    })
    @IsString()
    code: string;
}

export class updateAccessTokenDto {
    @ApiProperty({
        description: 'Provide the refresh_token received from the previous API response.',
        example: '4/0AVMBxxxxx-xxxxx.....',
    })
    @IsString()
    refreshToken: string;
}

export class GetYoutubeVideosDto {
    @ApiProperty({
        description: 'Provide the access token',
        example: '4/0AVMBxxxxx-xxxxx.....',
    })
    @IsString()
    accessToken: string;

    @ApiProperty({
        description: 'Enter total number of events to retrieve',
        example: 10,
    })
    @IsString()
    maxResults: number = 10;

    @ApiPropertyOptional({
        description: 'Enter the page token to navigate to that page (optional)',
        example: 'EAAaBlBUOkNBbwasssdsdsd',
    })
    @IsOptional()
    @IsString()
    pageToken?: string;
   @ApiPropertyOptional({
        description: 'Type of Video like Short or Long(optional)',
        example: 'Short',
    })
    @IsOptional()
    @IsString()
    type?: string;
}
