import { IsString, IsIn, IsUrl, IsOptional } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  @IsOptional()
  childId?: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsString()
  @IsIn(['PENDING', 'APPROVED', 'REJECTED'])
  @IsOptional()
  status?: string;
}

