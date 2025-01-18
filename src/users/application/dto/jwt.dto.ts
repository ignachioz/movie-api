import { ApiProperty } from '@nestjs/swagger';

export class JwtDto {
  @ApiProperty()
  jwt: string;
  @ApiProperty()
  username: string;
  constructor(jwt: string, username: string) {
    this.jwt = jwt;
    this.username = username;
  }
}
