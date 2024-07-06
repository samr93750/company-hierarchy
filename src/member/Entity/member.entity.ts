import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  BeforeRemove,
} from 'typeorm';
import { Photo } from '../../photo/Entity/photo.entity';
import { Role } from '../../role/Entity/role.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Role, (role) => role.members)
  role: Role;

  @OneToOne(() => Photo, { onDelete: 'SET NULL' }) // Set onDelete option to 'SET NULL'
  @JoinColumn()
  photo: Photo;
    save: any;

  // Optional: Handle photo deletion cascading manually
  @BeforeRemove()
  async beforeRemove() {
    if (this.photo) {
      this.photo = null;
      await this.save();
    }
  }
}
