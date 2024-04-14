import { Bank } from '@nest-microservices/shared/entity';

export const BanksProviders = [{ provide: 'BANKS_PROVIDERS', useValue: Bank }];
