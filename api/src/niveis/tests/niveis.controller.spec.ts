import { Test, TestingModule } from '@nestjs/testing';
import { CreateNivelDto } from '../dto/create-nivel.dto';
import { UpdateNivelDto } from '../dto/update-nivel.dto';
import { NiveisController } from '../niveis.controller';
import { NiveisService } from '../niveis.service';

describe('NiveisController', () => {
  let controller: NiveisController;

  const mockNiveisService = {
    create: jest.fn().mockReturnValue({}),
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    remove: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NiveisController],
      providers: [NiveisService],
    })
      .overrideProvider(NiveisService)
      .useValue(mockNiveisService)
      .compile();

    controller = module.get<NiveisController>(NiveisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create method of NiveisService correctly (POST)', async () => {
    const dto: CreateNivelDto = {
      nivel: 'teste',
    };

    await controller.create(dto);

    expect(mockNiveisService.create).toHaveBeenLastCalledWith({
      nivel: 'teste',
    });
  });

  it('should call findAll method of NiveisService correctly (GET)', async () => {
    const dto = {};

    await controller.findAll(dto);

    expect(mockNiveisService.findAll).toHaveBeenLastCalledWith({});
  });

  it('should call findOne method of NiveisService correctly (GET/:id)', async () => {
    const id = '1';

    await controller.findOne(id);

    expect(mockNiveisService.findOne).toHaveBeenLastCalledWith(1);
  });

  it('should call update method of NiveisService correctly (PATCH/:id)', async () => {
    const id = '1';
    const dto: UpdateNivelDto = {
      nivel: 'teste',
    };

    await controller.update(id, dto);

    expect(mockNiveisService.update).toHaveBeenLastCalledWith(1, {
      nivel: 'teste',
    });
  });

  it('should call remove method of NiveisService correctly (DELETE/:id)', async () => {
    const id = '1';

    await controller.remove(id);

    expect(mockNiveisService.remove).toHaveBeenLastCalledWith(1);
  });
});
