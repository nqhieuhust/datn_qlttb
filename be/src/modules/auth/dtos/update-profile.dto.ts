import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	full_name: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	email: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	mobile: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	address: string;

	updated_at: Date = new Date();
}
