import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/entities/device.entity';
import { IPaging, Paging } from 'src/helpers/helper';
import { Equal, Like, Raw, Repository } from 'typeorm';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { UpdateDeviceDto } from './dtos/update-device.dto';
import * as moment from 'moment';

@Injectable()
export class DeviceService {

	constructor(@InjectRepository(Device) private readonly deviceRepository: Repository<Device>) { }

	async buildConditions(filters: any) {
		const conditions: any = {};
		if (filters.id) conditions.id = Equal(filters.id);
		if (filters.code && filters.code.trim() != '') conditions.code = Like(`%${filters.code.trim()}%`);
		if (filters.device_name &&  filters.device_name.trim()) conditions.device_name = Like(`%${filters.device_name.trim()}%`);
		if (filters.manufacture &&  filters.manufacture.trim()) conditions.manufacture = Like(`%${filters.manufacture.trim()}%`);
		if (filters.status) conditions.status = Equal(filters.status);
		if (filters.user_id) conditions.user_id = Equal(filters.user_id);
		if (filters.department_id) conditions.department_id = Equal(filters.department_id);
		if (filters.provider_id) conditions.provider_id = Equal(filters.provider_id);
		return conditions;
	}

	async getLists(paging: IPaging, filters: any, req?: any) {
		let conditions = await this.buildConditions(filters);
		const [results, total] = await this.deviceRepository.findAndCount({
			where: conditions,
			relations: {
				provider: true,
				user: true,
				department: true
			},
			// select: select,
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});

		return { devices: results, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async createData(data: CreateDeviceDto) {
		data.created_at = new Date();
		data.updated_at = new Date();
		let newData = await this.deviceRepository.create({
			...data
		});
		await this.deviceRepository.save(newData);
		return newData;
	}

	async getById(id: number) {
		return await this.deviceRepository.findOne({
			where: { id: id },
			relations: {
				provider: true,
				user: true,
				department: true
			},
		});
	}

	async updateDataById(id: number, data: UpdateDeviceDto) {
		const newData = Object.entries(data).reduce((newItem: any ,item: any) => {
			if(item[1]) {
				newItem[`${item[0]}`] = item[1];
			}
			return newItem;
		}, {});
		let newDataUpdate: any = await this.deviceRepository.create({ ...newData, updated_at: new Date()});
		await this.deviceRepository.update(id, newDataUpdate);
		return await this.getById(id);
	}

	async deleteDataById(id: number) {
		await this.deviceRepository.delete(id);
	}

	async getTotalsByFilter(filters: any) {
		const condition: any = {};
		if(filters) {
			if( filters.from_date && filters.from_date != '' ) {
				let fromDate = moment(filters.from_date).startOf('day').format('yyyy-MM-DD hh:mm:ss');
				condition.created_at = Raw(alias => `${alias} >= '${fromDate}'`);
			}

			if( filters.to_date && filters.to_date != '' ) {
				let toDate = moment(filters.to_date).endOf('day').format('yyyy-MM-DD hh:mm:ss');
				condition.created_at = Raw(alias => `${alias} <= '${toDate}'`);
			}
		}
		return await this.deviceRepository.count({
			where: condition
		});
	}
}
