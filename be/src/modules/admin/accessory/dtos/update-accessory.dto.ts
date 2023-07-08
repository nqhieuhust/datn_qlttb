import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAccessoryDto {

	@IsOptional()
    @IsString()
    @ApiProperty()
    accessory_name: string;

	@IsOptional()
    @IsNumber()
    @ApiProperty()
    quantity: number

	@IsOptional()
    @IsString()
    @ApiProperty()
    unit: string;

    @ApiProperty()
    @IsOptional()
    import_date: Date;

	@IsOptional()
    @IsNumber()
    @ApiProperty()
    status: number

    @IsNumber()
    @ApiProperty()
	@IsOptional()
    provider_id: number

	@IsOptional()
	updated_at: Date = new Date();
}
