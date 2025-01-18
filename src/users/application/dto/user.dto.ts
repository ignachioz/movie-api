import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from './role.dto';

export class UserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  roles: RoleDto[];
  constructor(id: string, username: string, roles: RoleDto[]) {
    this.id = id;
    this.username = username;
    this.roles = roles;
  }
}
