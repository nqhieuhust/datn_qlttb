import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsNumber, IsOptional, IsString, MinLength, MaxLength } from "class-validator";

export class CreateUserDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	full_name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(30)
	username: string;

	@ApiProperty()
	@IsOptional()
	@IsEmail()
	email?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MinLength(10)
	@MaxLength(12)
	mobile?: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(30)
	password: string;

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
	status: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	address?: string;

	// @ApiProperty()
	// @IsOptional()
	// email_verified_at?: Date;

	created_at: any = new Date();
	updated_at: any = new Date();
}
