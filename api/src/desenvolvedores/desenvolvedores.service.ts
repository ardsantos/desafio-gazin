import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { endOfDay, startOfDay } from 'date-fns';
import { getPaginationQueryData } from 'src/common/dto/pagination-query.dto';
import { Page } from 'src/common/entities/page.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDesenvolvedorDto } from './dto/create-desenvolvedor.dto';
import { FindAllDesenvolvedoresDto } from './dto/find-all-desenvolvedores.dto';
import { UpdateDesenvolvedorDto } from './dto/update-desenvolvedor.dto';
import { DesenvolvedorEntity } from './entities/desenvolvedor.entity';

@Injectable()
export class DesenvolvedoresService {
  constructor(private prisma: PrismaService) {}

  async create(createDesenvolvedorDto: CreateDesenvolvedorDto) {
    const nivelId = createDesenvolvedorDto.nivelId;
    const nivel = await this.prisma.nivel.findUnique({
      where: { id: nivelId },
    });

    if (!nivel) {
      throw new NotFoundException(`Nível (${nivelId}) não encontrado.`);
    }

    return this.prisma.desenvolvedor.create({
      data: createDesenvolvedorDto,
    });
  }

  async findAll(query: FindAllDesenvolvedoresDto) {
    const dataNascimento = new Date(query.dataNascimento);
    const dataNascimentoDayStart = startOfDay(dataNascimento);
    const dataNascimentoDayEnd = endOfDay(dataNascimento);

    const where: Prisma.DesenvolvedorWhereInput = {
      Nivel: {
        nivel: {
          contains: query.nivel,
          mode: 'insensitive',
        },
      },
      nome: {
        contains: query.nome,
        mode: 'insensitive',
      },
      dataNascimento: query.dataNascimento
        ? {
            gte: dataNascimentoDayStart,
            lte: dataNascimentoDayEnd,
          }
        : undefined,
      sexo: query.sexo,
      hobby: {
        contains: query.hobby,
        mode: 'insensitive',
      },
    };

    const totalCount = await this.prisma.desenvolvedor.count({ where });
    const desenvolvedores = await this.prisma.desenvolvedor.findMany({
      ...getPaginationQueryData(query),
      where,
      include: {
        Nivel: true,
      },
    });

    const entities = desenvolvedores.map(
      (desenvolvedor) => new DesenvolvedorEntity(desenvolvedor),
    );

    return new Page(totalCount, entities);
  }

  async findOne(id: number) {
    const desenvolvedor = await this.prisma.desenvolvedor.findUnique({
      where: {
        id,
      },
      include: {
        Nivel: true,
      },
    });

    return new DesenvolvedorEntity(desenvolvedor);
  }

  async update(id: number, updateDesenvolvedorDto: UpdateDesenvolvedorDto) {
    const desenvolvedor = await this.prisma.desenvolvedor.findUnique({
      where: { id },
    });

    if (!desenvolvedor) {
      throw new NotFoundException(`Desenvolvedor (${id}) não encontrado.`);
    }

    const nivelId = updateDesenvolvedorDto.nivelId;
    const nivel = await this.prisma.nivel.findUnique({
      where: { id: nivelId },
    });

    if (!nivel) {
      throw new NotFoundException(`Nível (${nivelId}) não encontrado.`);
    }

    return this.prisma.desenvolvedor.update({
      where: { id },
      data: updateDesenvolvedorDto,
    });
  }

  async remove(id: number) {
    const desenvolvedor = await this.prisma.desenvolvedor.findUnique({
      where: { id },
    });

    if (!desenvolvedor) {
      throw new NotFoundException(`Desenvolvedor (${id}) não encontrado.`);
    }

    return this.prisma.desenvolvedor.delete({
      where: { id },
    });
  }
}
