import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ChildStatus } from '@prisma/client';

export class UpdateChildDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  admissionDate?: string;

  @IsEnum(ChildStatus)
  @IsOptional()
  status?: ChildStatus;
}

