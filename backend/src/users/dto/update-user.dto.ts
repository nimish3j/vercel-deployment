import { IsString, MinLength, IsIn, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  username?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsString()
  @IsIn(['SUPERADMIN', 'ADMIN', 'UPLOADER', 'VIEWER'])
  @IsOptional()
  role?: string;
}

