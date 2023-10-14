import { Test, TestingModule } from '@nestjs/testing';
import { NiveisService } from '../niveis.service';

describe('NiveisService', () => {
  let service: NiveisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NiveisService],
    }).compile();

    service = module.get<NiveisService>(NiveisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('should create a Nivel');
  it.todo('should find all Niveis');
  it.todo('should find a Nivel');
  it.todo('should update a Nivel');
  it.todo(
    'should throw a NotFoundException when updating a Nivel and id is not found',
  );
  it.todo('should delete a Nivel');
  it.todo(
    'should throw a NotFoundException when deleting a Nivel and id is not found',
  );
  it.todo(
    'should throw a BadRequestException when deleting a Nivel with linked Desenvolvedores',
  );
});
