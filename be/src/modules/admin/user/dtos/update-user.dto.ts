import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsEmail, MinLength, MaxLength } from "class-validator";

export class UpdateUserDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	full_name?: string;

	@ApiProperty()
	@IsEmail()
	@IsString()
	email?: string;

	@ApiProperty()
	@IsOptional()
	@MinLength(10)
	@MaxLength(12)
	@IsString()
	mobile?: string;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	role?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	department_id?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	status?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	address?: string;

	@ApiProperty()
	@IsOptional()
	email_verified_at?: Date;

	updated_at?: any = new Date();
}
