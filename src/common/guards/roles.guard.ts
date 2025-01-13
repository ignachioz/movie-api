import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';

export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequired = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!rolesRequired) return true;
    const { user }: { user: UserToken } = context.switchToHttp().getRequest();
    const hasRole = rolesRequired.some((role) => user.roles.includes(role));
    if (!hasRole) throw new Error("Doesn't have role required");
    return true;
  }
}

class UserToken {
  roles: Array<String>;
}
