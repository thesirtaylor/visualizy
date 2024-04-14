import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  bic: string;

  @IsString()
  @IsNotEmpty()
  integrationbaseUrl: string;

  @IsString()
  @IsNotEmpty()
  certificationNumber: string;
}
