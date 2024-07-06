// role.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
  BeforeRemove,
} from 'typeorm';
import { Member } from '../../member/Entity/member.entity';

@Entity()
@Tree('nested-set') 
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Role, (role) => role.children, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE', 
  })
  parent: Role;

  @OneToMany(() => Role, (role) => role.parent)
  children: Role[];

  @OneToMany(() => Member, (member) => member.role)
  members: Member[];
    save: any;

  @BeforeRemove()
  async beforeRemove() {
    // Optional: BeforeRemove hook to nullify parent relationship for children
    if (this.children && this.children.length > 0) {
      await Promise.all(
        this.children.map((child) => {
          child.parent = null;
          return child.save();
        }),
      );
    }
  }
}
