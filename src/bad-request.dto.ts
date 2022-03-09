export class BadRequestDto {
  statusCode = 400;
  message: string[];
  error = 'Bad Request';
}
