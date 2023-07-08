import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { BaseResponse, HTTP_STATUS, IPaging } from 'src/helpers/helper';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('dashboard')
@UseGuards(JwtGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/total')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getTotal(@Request() req: any) {
		try {
			const filters = {
				from_date: (req.query.from_date?.trim() != '' && req.query.from_date?.trim()) || null,
				to_date: (req.query.to_date?.trim() != '' && req.query.to_date?.trim()) || null,
			}
			let responseData: any = await this.dashboardService.getTotalsByFilter(filters);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('AccessoryController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}
}
