import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { IPaging } from "../../../helpers/interface/paging.interface";
import { BaseResponse } from "../../../helpers/response/response";
import { HTTP_STATUS } from "../../../helpers/constants/constants";
import { BadRequestException } from "../../../helpers/response/badRequest";
import * as _ from 'lodash';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { DeviceService } from './device.service';
import { UpdateDeviceDto } from './dtos/update-device.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { RoleGuard } from 'src/modules/auth/guards/role/role.guard';

@Controller('devices')
@UseGuards(JwtGuard)
@ApiTags('Admin Devices')
export class DeviceController {

	constructor(private readonly deviceService: DeviceService) { }

	@Post('create')
	@UseGuards(new RoleGuard([1, 2]))
	@ApiResponse({ status: 200, description: 'success' })
	async createData(
		@Request() req: any,
		@Body() formDto: CreateDeviceDto
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.deviceService.createData(formDto);

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
	async updateDataById(@Param('id') id: number, @Request() req: any, @Body() data: UpdateDeviceDto) {
		try {
			const oldAccess = await this.deviceService.getById(id);
			const result = await this.deviceService.updateDataById(id, data);
			if (!oldAccess) {
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', ' Devices does not exist');
			}
			let user_id = req.user?.user_id || 0;
			data.user_id = user_id;
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
			await this.deviceService.deleteDataById(id);
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
			let responseData: any = await this.deviceService.getLists(paging, filters, req);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('AccessoryController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('/total')
	@UseGuards(new RoleGuard([1, 2, 3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getTotal(@Request() req: any) {
		try {
			const filters = {
				from_date: (req.query.from_date?.trim() != '' && req.query.from_date?.trim()) || null,
				to_date: (req.query.to_date?.trim() != '' && req.query.to_date?.trim()) || null,
			}
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			let responseData: any = await this.deviceService.getLists(paging, filters, req);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('AccessoryController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('show/:id')
	@UseGuards(new RoleGuard([1, 2, 3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('id') id: number) {
		try {
			const res = await this.deviceService.getById(id);
			if (!res)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'provider does not exist');
			else
				return BaseResponse(HTTP_STATUS.success, res, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}


	async buildFilter(@Request() req: any) {
		let user = req.user;
		const filters: any = {
			id: req.query.id || null,
			code: req.query.code || null,
			device_name: req.query.device_name || null,
			status: req.query.status || null,
			provider_id: req.query.provider_id || null,
			department_id: req.query.department_id || null,
			manufacture: req.query.manufacture || null,
		};
		if(user && user.role === 3) {
			filters.department_id = user.department_id;
		} else {
			filters.department_id = req.query.department_id || null;
		}
		return filters;
	}
}
