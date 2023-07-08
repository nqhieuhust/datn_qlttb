import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AccessoryService } from "./accessory.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { IPaging } from "../../../helpers/interface/paging.interface";
import { BaseResponse } from "../../../helpers/response/response";
import { HTTP_STATUS } from "../../../helpers/constants/constants";
import { BadRequestException } from "../../../helpers/response/badRequest";
import * as _ from 'lodash';
import { CreateAccessoryDto } from "./dtos/create-accessory.dto";
import { UpdateAccessoryDto } from './dtos/update-accessory.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { RoleGuard } from 'src/modules/auth/guards/role/role.guard';

@Controller('accessory')
@UseGuards(JwtGuard)
@ApiTags('Admin Accessory')
export class AccessoryController {
	constructor(private readonly accessoryService: AccessoryService) { }

	@Post('create')
	@UseGuards(new RoleGuard([1, 2]))
	@ApiResponse({ status: 200, description: 'success' })
	async createData(
		@Body() formDto: CreateAccessoryDto
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.accessoryService.createData(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@createProduct----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Put('update/:id')
	@UseGuards(new RoleGuard([1, 2]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async updateDataById(@Param('id') id: number, @Body() data: UpdateAccessoryDto) {
		try {
			const oldAccess = await this.accessoryService.getById(id);
			const result = await this.accessoryService.updateDataById(id, data);
			if (!oldAccess)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', ' Accessory does not exist');
			else
				return BaseResponse(HTTP_STATUS.success, result, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}


	@Delete(':id')
	@UseGuards(new RoleGuard([1, 2]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async deleteDataById(@Param('id') id: number) {
		try {
			await this.accessoryService.deleteDataById(id);
			return BaseResponse(HTTP_STATUS.success, {}, '', 'Successful!');
				
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('')
	@UseGuards(new RoleGuard([1, 2, 3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getLists(@Request() req: any) {
		try {
			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			let responseData: any = await this.accessoryService.getLists(paging, filters, req);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('AccessoryController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('show/:id')
	@UseGuards(new RoleGuard([1, 2]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('id') id: number) {
		try {
			const res = await this.accessoryService.getById(id);
			if (!res)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'provider does not exist');
			else
				return BaseResponse(HTTP_STATUS.success, res, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}


	async buildFilter(@Request() req: any) {
		const filters = {
			id: req.query.id || null,
			provider_id: req.query.provider_id || null,
			accessory_name: req.query.accessory_name || null
		};
		return filters;
	}
}
