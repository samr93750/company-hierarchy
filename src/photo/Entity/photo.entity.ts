// photo.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Member } from '../../member/Entity/member.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @OneToOne(() => Member, (member) => member.photo)
  @JoinColumn()
  member: Member;
}
