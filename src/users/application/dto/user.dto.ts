import { RoleDto } from './role.dto';

export class UserDto {
  constructor(
    public id: string,
    public username: string,
    public roles: RoleDto[],
  ) {}
}
