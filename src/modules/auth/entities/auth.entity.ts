import { UserEntity } from 'src/modules/users/entities';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IToken } from '../interfaces';

@Entity('tokens')
export class TokenEntity implements IToken {
  @PrimaryColumn()
  id: string;

  @Column()
  refreshToken: string;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @Column('bigint')
  createdAt: number;

  @Column('bigint')
  updatedAt: number;

  @ManyToOne(() => UserEntity, (user) => user.tokens, { onDelete: 'CASCADE' })
  user: UserEntity;
}
