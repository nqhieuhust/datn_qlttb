import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProviderDto {

    @IsString()
    @IsNotEmpty()
	@ApiProperty()
    provider_name: string;

    @IsString()
	@IsOptional()
	@ApiProperty()
    address: string;

	@ApiProperty()
    @IsString()
    @IsNotEmpty()
    representator: string;

	@ApiProperty()
    @IsString()
	@IsNotEmpty()
    mobile: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
    email: string;

    created_at: Date = new Date();
	updated_at: Date = new Date();
}
