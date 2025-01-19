import { createMock } from '@golevelup/ts-jest';
import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { RolesGuard } from 'src/common/guards/roles.guard';

describe('ROLES-GUARD', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: createMock<Reflector>(),
        },
      ],
    }).compile();
    rolesGuard = moduleRef.get<RolesGuard>(RolesGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
  });

  it('user contain necessary role', async () => {
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { roles: ['ADMINISTRATOR', 'REGULAR'] } }),
      }),
    } as unknown as ExecutionContext;

    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(['ADMINISTRATOR']);
    const result = await rolesGuard.canActivate(context);
    expect(result).toBeTruthy();
  });

  it('user doesnt contain necessary role', async () => {
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { roles: ['REGULAR'] } }),
      }),
    } as unknown as ExecutionContext;

    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(['ADMINISTRATOR']);
    try {
      await rolesGuard.canActivate(context);
    } catch (e) {
      expect(e).toBeInstanceOf(ForbiddenException);
    }
  });

  it('dont require specify role', async () => {
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { roles: ['REGULAR'] } }),
      }),
    } as unknown as ExecutionContext;

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);
    const result = await rolesGuard.canActivate(context);
    expect(result).toBeTruthy();
  });
});
