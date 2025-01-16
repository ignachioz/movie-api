export class StatusOkDto {
  constructor(
    public message: string,
    public status: string = 'OK',
  ) {}
}
