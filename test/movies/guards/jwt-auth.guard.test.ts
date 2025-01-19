import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

describe('JWTAUTH-GUARD', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let jwtService: JwtService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: JwtService,
          useValue: createMock<JwtService>(),
        },
      ],
    }).compile();
    jwtAuthGuard = moduleRef.get<JwtAuthGuard>(JwtAuthGuard);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  it('Valid token success', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer test' } }),
      }),
    } as ExecutionContext;
    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockImplementation(() =>
        Promise.resolve({ username: 'test', roles: [] }),
      );
    const result = await jwtAuthGuard.canActivate(context);
    expect(result).toBeTruthy();
  });

  it('Unauthorized token: verify break', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: 'Bearer test' } }),
      }),
    } as ExecutionContext;
    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockImplementation(() => Promise.reject());
    try {
      await jwtAuthGuard.canActivate(context);
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('Unauthorized token: token null', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { authorization: null } }),
      }),
    } as ExecutionContext;
    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockImplementation(() => Promise.reject());
    try {
      await jwtAuthGuard.canActivate(context);
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }
  });
});
