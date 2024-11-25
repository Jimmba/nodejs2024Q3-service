import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IUser } from '../interfaces';

import { TokenEntity } from '../../auth/entities/auth.entity';

@Entity('users')
export class UserEntity implements IUser {
  @PrimaryColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column('bigint')
  createdAt: number;

  @Column('bigint')
  updatedAt: number;

  @OneToMany(() => TokenEntity, (token) => token.user)
  tokens: TokenEntity[];
}
