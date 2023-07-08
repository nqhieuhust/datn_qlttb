import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAccessoryDto {

    @IsString()
    @IsNotEmpty()
	@ApiProperty()
    accessory_name: string;

    @IsNumber()
    @ApiProperty()
    quantity: number

    @IsString()
	@IsOptional()
	@ApiProperty()
    unit: string;

	@ApiProperty()
    @IsNotEmpty()
    import_date: Date;

    @IsNumber()
    @ApiProperty()
    status: number

    @IsNumber()
    @ApiProperty()
    provider_id: number

    created_at: Date = new Date();
	updated_at: Date = new Date();
}
