import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProviderDto {

    @IsString()
    @IsOptional()
	@ApiProperty()
    provider_name: string;

    @IsString()
	@IsOptional()
	@ApiProperty()
    address: string;

	@ApiProperty()
    @IsString()
    @IsOptional()
    representator: string;

	@ApiProperty()
    @IsString()
	@IsOptional()
    mobile: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
    email: string;

	@IsOptional()
	updated_at: Date = new Date();
}
