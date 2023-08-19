import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDbDataSource} from '../datasources';
import {Token} from '../models';

export class TokenRepository extends DefaultCrudRepository<
  Token,
  typeof Token.prototype.id,
  any
> {
  constructor(@inject('datasources.user_db') dataSource: UserDbDataSource) {
    super(Token, dataSource);
  }
}
