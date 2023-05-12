import { IsNotEmpty, IsString } from "class-validator";

class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export default RefreshTokenDto;
