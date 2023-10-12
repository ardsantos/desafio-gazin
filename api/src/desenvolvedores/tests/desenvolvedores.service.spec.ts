import { Test, TestingModule } from '@nestjs/testing';
import { DesenvolvedoresService } from '../desenvolvedores.service';

describe('DesenvolvedoresService', () => {
  let service: DesenvolvedoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesenvolvedoresService],
    }).compile();

    service = module.get<DesenvolvedoresService>(DesenvolvedoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
