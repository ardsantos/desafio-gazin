import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { mockPrismaService } from '../../../test/mocks/prismaService';
import { DesenvolvedoresService } from '../desenvolvedores.service';
import { CreateDesenvolvedorDto } from '../dto/create-desenvolvedor.dto';
import { FindAllDesenvolvedoresDto } from '../dto/find-all-desenvolvedores.dto';
import { UpdateDesenvolvedorDto } from '../dto/update-desenvolvedor.dto';
import { DesenvolvedorEntity } from '../entities/desenvolvedor.entity';

describe('DesenvolvedoresService', () => {
  let service: DesenvolvedoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesenvolvedoresService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<DesenvolvedoresService>(DesenvolvedoresService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a Desenvolvedor', async () => {
    const dto: CreateDesenvolvedorDto = {
      nivelId: 1,
      nome: 'mockNome',
      sexo: 'M',
      dataNascimento: new Date('2000-01-01'),
      hobby: 'mockHobby',
    };

    mockPrismaService.nivel.findUnique = jest.fn().mockResolvedValueOnce({});
    mockPrismaService.desenvolvedor.create = jest.fn().mockResolvedValueOnce({
      id: 1,
      ...dto,
    });

    const desenvolvedor = await service.create(dto);

    expect(desenvolvedor).toEqual({
      id: 1,
      nivelId: 1,
      nome: 'mockNome',
      sexo: 'M',
      dataNascimento: new Date('2000-01-01'),
      hobby: 'mockHobby',
    });
    expect(mockPrismaService.nivel.findUnique).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
    });
    expect(mockPrismaService.desenvolvedor.create).toHaveBeenLastCalledWith({
      data: dto,
    });
  });

  it('should throw a NotFoundException when creating a Desenvolvedor and nivelId is not found', async () => {
    const dto: CreateDesenvolvedorDto = {
      nivelId: 1,
      nome: 'mockNome',
      sexo: 'M',
      dataNascimento: new Date('2000-01-01'),
      hobby: 'mockHobby',
    };

    mockPrismaService.nivel.findUnique = jest.fn().mockResolvedValueOnce(null);

    let error: Error;

    try {
      await service.create(dto);
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
    expect(mockPrismaService.desenvolvedor.create).not.toHaveBeenCalled();
  });

  it('should find all Desenvolvedores', async () => {
    mockPrismaService.desenvolvedor.findMany = jest
      .fn()
      .mockResolvedValueOnce([{}]);

    const query: FindAllDesenvolvedoresDto = {};

    const desenvolvedores = await service.findAll(query);

    expect(desenvolvedores).toHaveLength(1);
    expect(desenvolvedores[0]).toBeInstanceOf(DesenvolvedorEntity);
    expect(mockPrismaService.desenvolvedor.findMany).toHaveBeenLastCalledWith({
      where: {
        Nivel: {
          nivel: {
            equals: undefined,
            mode: 'insensitive',
          },
        },
        nome: {
          equals: undefined,
          mode: 'insensitive',
        },
        dataNascimento: undefined
          ? {
              gte: undefined,
              lte: undefined,
            }
          : undefined,
        sexo: undefined,
        hobby: {
          contains: undefined,
          mode: 'insensitive',
        },
      },
      include: {
        Nivel: true,
      },
    });
  });

  it('should find a Desenvolvedor', async () => {
    mockPrismaService.desenvolvedor.findUnique = jest
      .fn()
      .mockResolvedValueOnce({});

    const mockId = 1;

    const desenvolvedor = await service.findOne(mockId);

    expect(desenvolvedor).toBeInstanceOf(DesenvolvedorEntity);
    expect(mockPrismaService.desenvolvedor.findUnique).toHaveBeenLastCalledWith(
      {
        where: {
          id: 1,
        },
        include: {
          Nivel: true,
        },
      },
    );
  });

  it('should update a Desenvolvedor', async () => {
    mockPrismaService.desenvolvedor.findUnique = jest
      .fn()
      .mockResolvedValueOnce({});
    mockPrismaService.nivel.findUnique = jest.fn().mockResolvedValueOnce({});
    mockPrismaService.desenvolvedor.update = jest
      .fn()
      .mockResolvedValueOnce({});

    const mockId = 1;
    const dto: UpdateDesenvolvedorDto = {
      nivelId: 1,
      nome: 'mockNome',
      sexo: 'M',
      dataNascimento: new Date('2000-01-01'),
      hobby: 'mockHobby',
    };

    const desenvolvedor = await service.update(mockId, dto);

    expect(desenvolvedor).toBeTruthy();
    expect(mockPrismaService.desenvolvedor.findUnique).toHaveBeenLastCalledWith(
      {
        where: {
          id: 1,
        },
      },
    );
    expect(mockPrismaService.nivel.findUnique).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
    });
    expect(mockPrismaService.desenvolvedor.update).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
      data: {
        nivelId: 1,
        nome: 'mockNome',
        sexo: 'M',
        dataNascimento: new Date('2000-01-01'),
        hobby: 'mockHobby',
      },
    });
  });

  it('should throw a NotFoundException when updating a Desenvolvedor and id is not found', async () => {
    mockPrismaService.desenvolvedor.findUnique = jest
      .fn()
      .mockResolvedValueOnce(null);
    mockPrismaService.nivel.findUnique = jest.fn().mockResolvedValueOnce({});
    mockPrismaService.desenvolvedor.update = jest
      .fn()
      .mockResolvedValueOnce({});

    const mockId = 1;
    const dto: UpdateDesenvolvedorDto = {
      nivelId: 1,
      nome: 'mockNome',
      sexo: 'M',
      dataNascimento: new Date('2000-01-01'),
      hobby: 'mockHobby',
    };

    let error: Error;

    try {
      await service.update(mockId, dto);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(NotFoundException);
    expect(error.message).toBe('Desenvolvedor (1) não encontrado.');
    expect(mockPrismaService.desenvolvedor.findUnique).toHaveBeenLastCalledWith(
      {
        where: {
          id: 1,
        },
      },
    );
    expect(mockPrismaService.nivel.findUnique).not.toHaveBeenCalled();
    expect(mockPrismaService.nivel.update).not.toHaveBeenCalled();
  });

  it('should throw a NotFoundException when updating a Desenvolvedor and nivelId is not found', async () => {
    mockPrismaService.desenvolvedor.findUnique = jest
      .fn()
      .mockResolvedValueOnce({});
    mockPrismaService.nivel.findUnique = jest.fn().mockResolvedValueOnce(null);
    mockPrismaService.desenvolvedor.update = jest
      .fn()
      .mockResolvedValueOnce({});

    const mockId = 1;
    const dto: UpdateDesenvolvedorDto = {
      nivelId: 1,
      nome: 'mockNome',
      sexo: 'M',
      dataNascimento: new Date('2000-01-01'),
      hobby: 'mockHobby',
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
    expect(mockPrismaService.desenvolvedor.findUnique).toHaveBeenLastCalledWith(
      {
        where: {
          id: 1,
        },
      },
    );
    expect(mockPrismaService.desenvolvedor.findUnique).toHaveBeenLastCalledWith(
      {
        where: {
          id: 1,
        },
      },
    );
    expect(mockPrismaService.nivel.update).not.toHaveBeenCalled();
  });

  it('should delete a Desenvolvedor', async () => {
    mockPrismaService.desenvolvedor.findUnique = jest
      .fn()
      .mockResolvedValueOnce({});
    mockPrismaService.desenvolvedor.delete = jest
      .fn()
      .mockResolvedValueOnce({});

    const mockId = 1;

    await service.remove(mockId);

    expect(mockPrismaService.desenvolvedor.findUnique).toHaveBeenLastCalledWith(
      {
        where: {
          id: 1,
        },
      },
    );
    expect(mockPrismaService.desenvolvedor.delete).toHaveBeenLastCalledWith({
      where: {
        id: 1,
      },
    });
  });

  it('should throw a NotFoundException when deleting a Desenvolvedor and id is not found', async () => {
    mockPrismaService.desenvolvedor.findUnique = jest
      .fn()
      .mockResolvedValueOnce(null);

    const mockId = 1;

    let error: Error;

    try {
      await service.remove(mockId);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(NotFoundException);
    expect(error.message).toBe('Desenvolvedor (1) não encontrado.');
    expect(mockPrismaService.desenvolvedor.findUnique).toHaveBeenLastCalledWith(
      {
        where: {
          id: 1,
        },
      },
    );
    expect(mockPrismaService.desenvolvedor.delete).not.toHaveBeenCalled();
  });
});
