import { User } from 'src/users/domain/entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { RoleDto } from '../dto/role.dto';
import { Role } from 'src/users/domain/entities/role.entity';
import { JwtDto } from '../dto/jwt.dto';

const roleToRoleDtoMap = {
  [Role.Administrator]: RoleDto.Administrator,
  [Role.Regular]: RoleDto.Regular,
};

export class AuthUserMapper {
  public static userToDto(user: User): UserDto {
    return new UserDto(
      user.id,
      user.username,
      user.roles.map((role) => this.roleToRoleDto(role)),
    );
  }

  public static roleToRoleDto(role: Role): RoleDto {
    return roleToRoleDtoMap[role];
  }

  public static jwtToDto(jwt: string, username: string): JwtDto {
    return new JwtDto(jwt, username);
  }
}
