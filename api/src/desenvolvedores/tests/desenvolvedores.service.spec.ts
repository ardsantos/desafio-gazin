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

  it.todo('should create a Desenvolvedor');
  it.todo(
    'should throw a NotFoundException when creating a Desenvolvedor and nivelId is not found',
  );
  it.todo('should find all Desenvolvedores');
  it.todo('should find a Desenvolvedor');
  it.todo('should update a Desenvolvedor');
  it.todo(
    'should throw a NotFoundException when updating a Desenvolvedor and id is not found',
  );
  it.todo(
    'should throw a NotFoundException when updating a Desenvolvedor and nivelId is not found',
  );
  it.todo('should delete a Desenvolvedor');
  it.todo(
    'should throw a NotFoundException when deleting a Desenvolvedor and id is not found',
  );
});
