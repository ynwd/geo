import { Injectable } from '@nestjs/common';
import { Geo } from './geo.entity';
import { GeoDto } from './geo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Geo)
    private readonly repository: Repository<Geo>,
  ) {}

  async uploadFile(body: GeoDto, data?: any) {
    return await this.repository.save({ name: body.name, data });
  }

  async findOne(id: number): Promise<Geo> {
    return await this.repository.findOne({ where: { id } });
  }

  async find(): Promise<Geo[]> {
    return await this.repository.find();
  }

  async update(id: number, body: GeoDto, data?: any) {
    return await this.repository.update(id, { name: body.name, data });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  getHello(): string {
    return 'Geo data v1.0.0';
  }
}
