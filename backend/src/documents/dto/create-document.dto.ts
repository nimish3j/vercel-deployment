import { IsString, IsIn, IsUrl, IsOptional } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  childId: string;

  @IsUrl()
  url: string;

  @IsString()
  @IsIn(['PENDING', 'APPROVED', 'REJECTED'])
  @IsOptional()
  status?: string;
}

