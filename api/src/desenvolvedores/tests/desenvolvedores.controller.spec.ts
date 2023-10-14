import { Test, TestingModule } from '@nestjs/testing';
import { DesenvolvedoresController } from '../desenvolvedores.controller';
import { DesenvolvedoresService } from '../desenvolvedores.service';
import { CreateDesenvolvedorDto } from '../dto/create-desenvolvedor.dto';
import { UpdateDesenvolvedorDto } from '../dto/update-desenvolvedor.dto';

describe('DesenvolvedoresController', () => {
  let controller: DesenvolvedoresController;

  const mockDesenvolvedoresService = {
    create: jest.fn().mockReturnValue({}),
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    remove: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesenvolvedoresController],
      providers: [DesenvolvedoresService],
    })
      .overrideProvider(DesenvolvedoresService)
      .useValue(mockDesenvolvedoresService)
      .compile();

    controller = module.get<DesenvolvedoresController>(
      DesenvolvedoresController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create method of NiveisService correctly (POST)', async () => {
    const dto: CreateDesenvolvedorDto = {
      nome: 'mockNome',
      nivelId: 1,
      dataNascimento: new Date('2023-10-13'),
      sexo: 'M',
      hobby: 'mockHobby',
    };

    await controller.create(dto);

    expect(mockDesenvolvedoresService.create).toHaveBeenLastCalledWith({
      nome: 'mockNome',
      nivelId: 1,
      dataNascimento: new Date('2023-10-13'),
      sexo: 'M',
      hobby: 'mockHobby',
    });
  });

  it('should call findAll method of NiveisService correctly (GET)', async () => {
    const dto = {};

    await controller.findAll(dto);

    expect(mockDesenvolvedoresService.findAll).toHaveBeenLastCalledWith({});
  });

  it('should call findOne method of NiveisService correctly (GET/:id)', async () => {
    const id = '1';

    await controller.findOne(id);

    expect(mockDesenvolvedoresService.findOne).toHaveBeenLastCalledWith(1);
  });

  it('should call update method of NiveisService correctly (PATCH/:id)', async () => {
    const id = '1';
    const dto: UpdateDesenvolvedorDto = {
      nome: 'mockNome',
      nivelId: 1,
      dataNascimento: new Date('2023-10-13'),
      sexo: 'M',
      hobby: 'mockHobby',
    };

    await controller.update(id, dto);

    expect(mockDesenvolvedoresService.update).toHaveBeenLastCalledWith(1, {
      nome: 'mockNome',
      nivelId: 1,
      dataNascimento: new Date('2023-10-13'),
      sexo: 'M',
      hobby: 'mockHobby',
    });
  });

  it('should call remove method of NiveisService correctly (DELETE/:id)', async () => {
    const id = '1';

    await controller.remove(id);

    expect(mockDesenvolvedoresService.remove).toHaveBeenLastCalledWith(1);
  });
});
