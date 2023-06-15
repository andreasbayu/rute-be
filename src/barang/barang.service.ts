import { Injectable } from '@nestjs/common';
import { Barang } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { FilterBarangDto } from './dto/filterBarang.dto';

@Injectable()
export class BarangService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Barang[]> {
    return this.prisma.barang.findMany();
  }

  async findOne(id: string): Promise<Barang> {
    return this.prisma.barang.findFirst({
      where: {
        id,
      },
    });
  }

  // async findAllByFilter(query: FilterBarangDto): Promise<Barang[]> {

  //   const { namaPenerima, name, alamat, diterimaOleh, } = query;

  //   return this.prisma.barang.findMany({
  //     where: {
  //       OR: [
  //         {namaPenerima:  }
  //       ]
  //     },
  //   });
  // }

  async create(barang: Barang): Promise<Barang> {
    return this.prisma.barang.create({
      data: barang,
    });
  }

  async update(id: string, barang: Barang): Promise<Barang> {
    return this.prisma.barang.update({
      where: {
        id,
      },
      data: barang,
    });
  }

  async delete(id: string): Promise<Barang> {
    return this.prisma.barang.delete({
      where: {
        id,
      },
    });
  }
}
