import { IsString, IsDateString, IsIn, IsOptional } from 'class-validator';

export class CreateChildDto {
  @IsString()
  name: string;

  @IsDateString()
  admissionDate: string;

  @IsString()
  @IsIn(['ACTIVE', 'INACTIVE', 'ARCHIVED'])
  @IsOptional()
  status?: string;
}

