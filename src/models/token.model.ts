import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'token'},
  },
})
export class Token extends Entity {
  @property({
    type: 'string',
    required: true,
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'token_secret',
    },
  })
  tokenSecret: string;

  @property({
    type: 'boolean',
    postgresql: {
      columnName: 'is_one_usage_token',
    },
  })
  isOneUsageToken: boolean;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'account_id',
    },
  })
  accountId: string;

  @property.array('string', {
    postgresql: {
      columnName: 'allowed_actions',
    },
  })
  allowedActions: string[];

  @property({
    type: 'date',
    postgresql: {
      columnName: 'expiration_date',
      dataType: 'timestamptz',
    },
  })
  expirationDate: Date;
}

export type TokenWithRelations = Token;
