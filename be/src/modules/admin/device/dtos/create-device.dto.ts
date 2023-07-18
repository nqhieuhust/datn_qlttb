import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDeviceDto {

    @IsString()
    @IsNotEmpty()
	@ApiProperty()
    code: string;

	@IsString()
    @IsNotEmpty()
	@ApiProperty()
    device_name: string;

    @IsString()
	@IsOptional()
	@ApiProperty()
    model: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
    serial: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
    device_group: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
    device_type: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
    accessory: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
    manager_device: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
    attached_document: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
    classif_document: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
    datasheet_document: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
    manufacture: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
    country: string;

	@IsOptional()
	@ApiProperty()
    import_date: Date;

	@IsOptional()
	@ApiProperty()
    handover_date: Date;

	@ApiProperty()
	@IsOptional()
    expire_date: Date;

    @IsNumber()
    @ApiProperty()
    status: number;

    @IsNumber()
    @ApiProperty()
    type: number;

    @IsNumber()
    @ApiProperty()
    countries: number;
	
    @ApiProperty()
	@IsOptional()
	@IsString()
    avatar: string;

    @ApiProperty()
	@IsOptional()
	@IsString()
    document: string;

	@IsNumber()
	@IsOptional()
    @ApiProperty()
    user_id: number;

    @IsNumber()
	@IsOptional()
    @ApiProperty()
    provider_id: number;

	@IsNumber()
	@IsOptional()
    @ApiProperty()
    department_id: number;

	created_at: any = new Date();
	updated_at: any = new Date();
}
