import { IsString, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsDateString()
  date: string;
}

