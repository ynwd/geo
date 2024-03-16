import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Geo } from './geo.entity';
import { GeoDto } from './geo.dto';

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(Geo)
    private readonly repository: Repository<Geo>,
  ) {}

  async uploadFile(body: GeoDto) {
    return await this.repository.save({ name: body.name, data: body.files });
  }

  async findOne(id: number): Promise<Geo> {
    return await this.repository.findOne({ where: { id } });
  }

  async find(): Promise<Geo[]> {
    return await this.repository.find();
  }

  async update(id: number, body: GeoDto) {
    return await this.repository.update(id, {
      name: body.name,
      data: body.files,
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async truncate(): Promise<void> {
    return await this.repository.query(
      `TRUNCATE geo RESTART IDENTITY CASCADE;`,
    );
  }
}
