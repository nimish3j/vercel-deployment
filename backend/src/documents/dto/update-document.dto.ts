import { IsString, IsEnum, IsUrl, IsOptional } from 'class-validator';
import { DocumentStatus } from '@prisma/client';

export class UpdateDocumentDto {
  @IsString()
  @IsOptional()
  childId?: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsEnum(DocumentStatus)
  @IsOptional()
  status?: DocumentStatus;
}

