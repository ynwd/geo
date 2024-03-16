import { Module } from '@nestjs/common';
import { GeoController } from './geo.controller';
import { GeoService } from './geo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geo } from './geo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Geo])],
  controllers: [GeoController],
  providers: [GeoService],
})
export class GeoModule {}
