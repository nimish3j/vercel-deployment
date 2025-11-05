import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ChildStatus } from '@prisma/client';

export class CreateChildDto {
  @IsString()
  name: string;

  @IsDateString()
  admissionDate: string;

  @IsEnum(ChildStatus)
  @IsOptional()
  status?: ChildStatus;
}

