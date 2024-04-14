import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Bank extends Model {
  @Column
  name: string;

  @Column
  bic: string;

  @Column
  certificationNumber: string;

  @Column
  integrationbaseUrl: string;
}
