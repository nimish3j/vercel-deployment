import { IsString, IsDateString, IsIn, IsOptional } from 'class-validator';

export class UpdateChildDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  admissionDate?: string;

  @IsString()
  @IsIn(['ACTIVE', 'INACTIVE', 'ARCHIVED'])
  @IsOptional()
  status?: string;
}

