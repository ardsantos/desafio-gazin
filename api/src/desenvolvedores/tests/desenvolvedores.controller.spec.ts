import { Test, TestingModule } from '@nestjs/testing';
import { DesenvolvedoresController } from '../desenvolvedores.controller';
import { DesenvolvedoresService } from '../desenvolvedores.service';

describe('DesenvolvedoresController', () => {
  let controller: DesenvolvedoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesenvolvedoresController],
      providers: [DesenvolvedoresService],
    }).compile();

    controller = module.get<DesenvolvedoresController>(
      DesenvolvedoresController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
