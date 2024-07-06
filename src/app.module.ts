import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Photo } from './photo/Entity/photo.entity';
import { Member } from './member/Entity/member.entity';
import { Role } from './role/Entity/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'samr1493',
      database: 'orga_structure',
      entities: [Photo, Member, Role],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Photo, Member, Role]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
