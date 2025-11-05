import { IsString, MinLength, IsIn, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsIn(['SUPERADMIN', 'ADMIN', 'UPLOADER', 'VIEWER'])
  @IsOptional()
  role?: string;
}

