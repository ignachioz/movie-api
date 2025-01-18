export class JwtDto {
  constructor(
    public jwt: string,
    public username: string,
  ) {}
}
