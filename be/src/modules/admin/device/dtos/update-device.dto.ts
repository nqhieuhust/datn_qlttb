import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateDeviceDto {

	@ApiProperty()
	@IsOptional()
    @IsString()
    code?: string;

	@ApiProperty()
	@IsOptional()
    @IsString()
    device_name?: string;

	@ApiProperty()
	@IsOptional()
    @IsString()
    model?: string;

	@ApiProperty()
	@IsOptional()
    @IsString()
    serial?: string;

	@ApiProperty()
	@IsOptional()
    @IsString()
    device_group?: string;

	@ApiProperty()
	@IsOptional()
    @IsString()
    device_type?: string;

	@ApiProperty()
	@IsOptional()
    @IsString()
    accessory?: string;

	@ApiProperty()
	@IsOptional()
    @IsString()
    manager_device?: string;

	@ApiProperty()
	@IsOptional()
    @IsString()
    attached_document?: string;

	@ApiProperty()
	@IsOptional()
    @IsString()
    classif_document?: string;

	@ApiProperty()
	@IsOptional()
    @IsString()
    datasheet_document?: string;

	@ApiProperty()
	@IsOptional()
    @IsString()
    manufacture?: string;

	@ApiProperty()
	@IsOptional()
    @IsString()
    country?: string;

	@ApiProperty()
	@IsOptional()
    import_date?: Date;

	@ApiProperty()
	@IsOptional()
    handover_date?: Date;

	@ApiProperty()
	@IsOptional()
    expire_date?: Date;

    @ApiProperty()
	@IsOptional()
    @IsNumber()
    status?: number;

    @ApiProperty()
	@IsOptional()
    @IsNumber()
    type?: number;

    @ApiProperty()
	@IsOptional()
    @IsNumber()
    countries?: number;
	
    @ApiProperty()
	@IsOptional()
    @IsString()
    avatar?: string;

	@ApiProperty()
	@IsOptional()
    @IsNumber()
    user_id?: number;

    @ApiProperty()
	@IsOptional()
    @IsNumber()
    provider_id?: number;

	@IsNumber()
	@IsOptional()
    @ApiProperty()
    department_id?: number;

	updated_at: any = new Date();
}
