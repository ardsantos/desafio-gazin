import { Injectable, NotFoundException } from '@nestjs/common';
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
    const dataNascimentoDayStart = new Date(query.dataNascimento);
    const dataNascimentoDayEnd = new Date(query.dataNascimento);

    dataNascimentoDayStart.setHours(0, 0, 0, 0);
    dataNascimentoDayEnd.setHours(23, 59, 59, 999);

    const desenvolvedores = await this.prisma.desenvolvedor.findMany({
      where: {
        Nivel: {
          nivel: {
            equals: query.nivel,
            mode: 'insensitive',
          },
        },
        nome: {
          equals: query.nome,
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
      },
      include: {
        Nivel: true,
      },
    });

    return desenvolvedores.map(
      (desenvolvedor) => new DesenvolvedorEntity(desenvolvedor),
    );
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
