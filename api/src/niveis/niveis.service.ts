import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getPaginationQueryData } from 'src/common/dto/pagination-query.dto';
import { Page } from 'src/common/entities/page.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { FindAllNiveisDto } from './dto/find-all-niveis.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { NivelEntity } from './entities/nivel.entity';

@Injectable()
export class NiveisService {
  constructor(private prisma: PrismaService) {}

  async create(createNivelDto: CreateNivelDto) {
    return this.prisma.nivel.create({
      data: createNivelDto,
    });
  }

  async findAll(query: FindAllNiveisDto) {
    const where: Prisma.NivelWhereInput = {
      nivel: {
        contains: query.nivel,
        mode: 'insensitive',
      },
    };

    const totalCount = await this.prisma.nivel.count({ where });
    const niveis = await this.prisma.nivel.findMany({
      ...getPaginationQueryData(query),
      where,
    });

    const entities = niveis.map((nivel) => new NivelEntity(nivel));

    return new Page(totalCount, entities);
  }

  async findOne(id: number) {
    const nivel = await this.prisma.nivel.findUnique({
      where: {
        id,
      },
    });

    return new NivelEntity(nivel);
  }

  async update(id: number, updateNivelDto: UpdateNivelDto) {
    const nivel = await this.prisma.nivel.findUnique({ where: { id } });

    if (!nivel) {
      throw new NotFoundException(`Nível (${id}) não encontrado.`);
    }

    return this.prisma.nivel.update({
      where: { id },
      data: updateNivelDto,
    });
  }

  async remove(id: number) {
    const nivel = await this.prisma.nivel.findUnique({
      where: { id },
      include: {
        Desenvolvedores: true,
      },
    });

    if (!nivel) {
      throw new NotFoundException(`Nível (${id}) não encontrado.`);
    }

    if (nivel.Desenvolvedores.length) {
      throw new BadRequestException(
        `Nível (${id}) não pode ser removido porque possui desenvolvedores atribuídos.`,
      );
    }

    return this.prisma.nivel.delete({
      where: { id },
    });
  }
}
