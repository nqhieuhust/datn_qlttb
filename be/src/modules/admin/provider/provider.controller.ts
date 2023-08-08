import {Controller, Post, Get, Put, Delete, Body, Param, Request, HttpCode, HttpStatus, UseGuards} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { BadRequestException } from 'src/helpers/response/badRequest';
import * as _ from 'lodash';
import { BaseResponse, HTTP_STATUS, IPaging } from 'src/helpers/helper';
import { UpdateProviderDto } from './dtos/update-provider.dto';
import { ProviderService } from './provider.service';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { RoleGuard } from 'src/modules/auth/guards/role/role.guard';

@Controller('providers')

@UseGuards(JwtGuard)
@ApiTags('Admin Provider')
export class ProviderController {

	constructor(private readonly providerService: ProviderService) { }

	@Post('create')
	@UseGuards(new RoleGuard([1, 2]))
	@ApiResponse({ status: 200, description: 'success' })
	async createData(
		@Body() formDto: CreateProviderDto
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.providerService.createData(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@createProduct----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Get('show/:id')
	@HttpCode(HttpStatus.OK)
	@UseGuards(new RoleGuard([1, 2]))
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('id') id: number) {
		try {
			const res = await this.providerService.getById(id);
			if (!res)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'provider does not exist');
			else
				return BaseResponse(HTTP_STATUS.success, res, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Put('update/:id')
	@HttpCode(HttpStatus.OK)
	@UseGuards(new RoleGuard([1, 2]))
	@ApiResponse({ status: 200, description: 'success' })
	async updateProvider(@Param('id') id: number, @Body() updateData: UpdateProviderDto) {
		try {
			const check = await this.providerService.getById(id);
			if (!check) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001','provider does not exist');
			if (_.isEmpty(updateData)) throw new BadRequestException({code: 'F0001'});
			else {
				return BaseResponse(HTTP_STATUS.success, await this.providerService.updateById(id, updateData), '','Updated successfully!');
			}
		} catch (e) {
			console.log('update department ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@UseGuards(new RoleGuard([1]))
	@ApiResponse({ status: 200, description: 'success' })
	async deleteProvider(@Param('id') id: number) {
		try {
			const check = await this.providerService.getById(id);
			if (!check)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001','provider does not exist');

			return BaseResponse(HTTP_STATUS.success, await this.providerService.deleteProviderById(id), '','Updated successfully!');

		} catch (e) {
			console.log('update department ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	async buildFilter(@Request() req: any) {
		const filters = {
			id: req.query.id || null,
			provider_name: req.query.provider_name || null,
			email: req.query.email || null,
			mobile: req.query.mobile || null,
		};
		return filters;
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
			let responseData: any = await this.providerService.getLists(paging, filters, req);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('ProviderController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}
}
