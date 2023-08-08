import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import * as _ from 'lodash';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { BaseResponse, HTTP_STATUS, IPaging } from 'src/helpers/helper';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { RoleGuard } from 'src/modules/auth/guards/role/role.guard';

@Controller('department')
// @UseGuards(new RoleGuard([1]))
@UseGuards(JwtGuard)
@ApiTags('Admin Department')
export class DepartmentController {
	constructor(
		private departmentService: DepartmentService
	) { }

	@Get('')
	@UseGuards(new RoleGuard([1, 2, 3]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getDepartments(@Request() req: any) {
		try {
			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			let departments: any = await this.departmentService.getDepartments(paging, filters, req);

			return BaseResponse(HTTP_STATUS.success, departments, '', 'Successful');

		} catch (e) {
			console.log('get department list ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('show/:id')
	@UseGuards(new RoleGuard([1]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getDepartmentById(@Param('id') id: number) {
		try {
			const res = await this.departmentService.getDepartmentById(id);
			if (!res)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'department does not exist');
			else
				return BaseResponse(HTTP_STATUS.success, res, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Post('create')
	@UseGuards(new RoleGuard([1]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async createDepartment(@Body() createData: any) {
		try {
			if (_.isEmpty(createData)) throw new BadRequestException({ code: 'F0001' });
			else {
				const data = {
					id: createData.id,
					department_name: createData.department_name,
					address: createData.address,
					manager: createData.manager,
					mobile: createData.mobile,
				};
				return BaseResponse(
					HTTP_STATUS.success,
					await this.departmentService.createDepartment(data),
					'',
					'Created successfully!'
				);
			}
		} catch (e) {
			console.log('create department -------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Put('update/:id')
	@HttpCode(HttpStatus.OK)
	@UseGuards(new RoleGuard([1]))
	@ApiResponse({ status: 200, description: 'success' })
	async updateDepartment(@Param('id') id: number, @Body() updateData: any) {
		try {
			const check = await this.departmentService.getDepartmentById(id);
			if (!check) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'category does not exist');
			if (_.isEmpty(updateData)) throw new BadRequestException({ code: 'F0001' });
			else {
				const data = {
					id: updateData.id,
					department_name: updateData.department_name,
					address: updateData.address,
					manager: updateData.manager,
					mobile: updateData.mobile,
				};
				return BaseResponse(HTTP_STATUS.success, await this.departmentService.updateDepartment(id, data), '', 'Updated successfully!');
			}
		} catch (e) {
			console.log('update department ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete(':id')
	@UseGuards(new RoleGuard([1]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async deleteDepartment(@Param('id') id: number) {
		try {
			let department = await this.departmentService.getDepartmentById(id);

			if (!department) {
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'category does not exist!');
			} else {
				await this.departmentService.deleteDepartment(id);
				return BaseResponse(HTTP_STATUS.success, {}, '', 'Deleted successfully!');
			}
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	async buildFilter(@Request() req: any) {
		const filters = {
			id: req.query.id || null,
			department_name: req.query.department_name || null,
		};
		return filters;
	}
}
