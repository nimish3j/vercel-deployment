import { IsString, IsEnum, IsUrl } from 'class-validator';
import { DocumentStatus } from '@prisma/client';

export class CreateDocumentDto {
  @IsString()
  childId: string;

  @IsUrl()
  url: string;

  @IsEnum(DocumentStatus)
  status?: DocumentStatus;
}

