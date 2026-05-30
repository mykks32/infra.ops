import { IsString, IsNotEmpty } from 'class-validator';

export class BookEventDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class BookCreatedEventDto extends BookEventDto {}
