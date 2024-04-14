import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  bic;

  @IsString()
  @IsNotEmpty()
  integrationbaseUrl;

  @IsNotEmpty()
  @IsNotEmpty()
  certificationNumber;
}
