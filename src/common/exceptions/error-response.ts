import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
  constructor(message: string | object, status: number) {
    this.message = this.parseMessage(message);
    this.status = status;
  }

  private parseMessage(messageParam: string | object): string {
    return typeof messageParam == 'string'
      ? messageParam
      : JSON.stringify(messageParam);
  }
}
