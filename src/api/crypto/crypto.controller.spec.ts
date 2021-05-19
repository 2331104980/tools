import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';

describe('AppController', () => {
  let appController: CryptoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [CryptoService],
    }).compile();

    appController = app.get<CryptoController>(CryptoController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});
