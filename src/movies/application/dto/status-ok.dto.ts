import { ApiProperty } from '@nestjs/swagger';

export class StatusOkDto {
  @ApiProperty()
  message: string;
  @ApiProperty()
  status: string;
  constructor(message: string, status: string = 'OK') {
    this.message = message;
    this.status = status;
  }
}
