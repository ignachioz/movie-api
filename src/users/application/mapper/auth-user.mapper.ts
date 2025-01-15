import { User } from 'src/users/domain/entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { RoleDto } from '../dto/role.dto';
import { Role } from 'src/users/domain/entities/role.entity';
import { JwtDto } from '../dto/jwt.dto';

export class AuthUserMapper {
  public static userToDto(user: User): UserDto {
    return new UserDto(
      user.id,
      user.username,
      user.roles.map((role) => this.roleToDto(role)),
    );
  }

  private static roleToDto(role: Role): RoleDto {
    return new RoleDto(role.id, role.name);
  }

  public static jwtToDto(jwt: string): JwtDto {
    return new JwtDto(jwt);
  }
}
