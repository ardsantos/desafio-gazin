import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { mockPrismaService } from '../../../test/mocks/prismaService';
import { CreateNivelDto } from '../dto/create-nivel.dto';
import { FindAllNiveisDto } from '../dto/find-all-niveis.dto';
import { UpdateNivelDto } from '../dto/update-nivel.dto';
import { NivelEntity } from '../entities/nivel.entity';
import { NiveisService } from '../niveis.service';

describe('NiveisService', () => {
  let service: NiveisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NiveisService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<NiveisService>(NiveisService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a Nivel', async () => {
    const dto: CreateNivelDto = {
      nivel: 'mockNivel',
    };

    mockPrismaService.nivel.create = jest
      .fn()
      .mockResolvedValueOnce({ id: 1, ...dto });

    const nivel = await service.create(dto);

    expect(nivel).toEqual({ id: 1, nivel: 'mockNivel' });
    expect(mockPrismaService.nivel.create).toHaveBeenLastCalledWith({
      data: {
        nivel: 'mockNivel',
      },
    });
  });

  it('should find all Niveis', async () => {
    mockPrismaService.nivel.findMany = jest.fn().mockResolvedValueOnce([{}]);

    const query: FindAllNiveisDto = {};

    const niveis = await service.findAll(query);

    expect(niveis).toHaveLength(1);
    expect(niveis[0]).toBeInstanceOf(NivelEntity);
    expect(mockPrismaService.nivel.findMany).toHaveBeenLastCalledWith({
      where: {
        nivel: {
          equals: undefined,
          mode: 'insensitive',
        },
      },
    });
  });

  it('should find a Nivel', async () => {
    mockPrismaService.nivel.findUnique = jest.fn().mockResolvedValueOnce({});

    const mockId = 1;

    const nivel = await service.findOne(mockId);

    expect(nivel).toBeInstanceOf(NivelEntity);
    expect(mockPrismaService.nivel.findUnique).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
    });
  });

  it('should update a Nivel', async () => {
    mockPrismaService.nivel.findUnique = jest.fn().mockResolvedValueOnce({});
    mockPrismaService.nivel.update = jest.fn().mockResolvedValueOnce({});

    const mockId = 1;
    const dto: UpdateNivelDto = {
      nivel: 'mockNivel',
    };

    const nivel = await service.update(mockId, dto);

    expect(nivel).toBeTruthy();
    expect(mockPrismaService.nivel.findUnique).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
    });
    expect(mockPrismaService.nivel.update).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
      data: {
        nivel: 'mockNivel',
      },
    });
  });

  it('should throw a NotFoundException when updating a Nivel and id is not found', async () => {
    mockPrismaService.nivel.findUnique = jest.fn().mockResolvedValueOnce(null);

    const mockId = 1;
    const dto: UpdateNivelDto = {
      nivel: 'mockNivel',
    };

    let error: Error;

    try {
      await service.update(mockId, dto);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(NotFoundException);
    expect(error.message).toBe('Nível (1) não encontrado.');
    expect(mockPrismaService.nivel.findUnique).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
    });
    expect(mockPrismaService.nivel.update).not.toHaveBeenCalled();
  });

  it('should delete a Nivel', async () => {
    mockPrismaService.nivel.findUnique = jest.fn().mockResolvedValueOnce({
      Desenvolvedores: [],
    });
    mockPrismaService.nivel.delete = jest.fn().mockResolvedValueOnce({});

    const mockId = 1;

    await service.remove(mockId);

    expect(mockPrismaService.nivel.findUnique).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
      include: {
        Desenvolvedores: true,
      },
    });
    expect(mockPrismaService.nivel.delete).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
    });
  });

  it('should throw a NotFoundException when deleting a Nivel and id is not found', async () => {
    mockPrismaService.nivel.findUnique = jest.fn().mockResolvedValueOnce(null);

    const mockId = 1;

    let error: Error;

    try {
      await service.remove(mockId);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(NotFoundException);
    expect(error.message).toBe('Nível (1) não encontrado.');
    expect(mockPrismaService.nivel.findUnique).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
      include: {
        Desenvolvedores: true,
      },
    });
    expect(mockPrismaService.nivel.delete).not.toHaveBeenCalled();
  });

  it('should throw a BadRequestException when deleting a Nivel with linked Desenvolvedores', async () => {
    mockPrismaService.nivel.findUnique = jest.fn().mockResolvedValueOnce({
      Desenvolvedores: [{}],
    });

    const mockId = 1;

    let error: Error;

    try {
      await service.remove(mockId);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(BadRequestException);
    expect(error.message).toBe(
      'Nível (1) não pode ser removido porque possui desenvolvedores atribuídos.',
    );
    expect(mockPrismaService.nivel.findUnique).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
      include: {
        Desenvolvedores: true,
      },
    });
    expect(mockPrismaService.nivel.delete).not.toHaveBeenCalled();
  });
});
