import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Device } from 'src/entities/device.entity';
import { Provider } from 'src/entities/provider.entity';
import { User } from 'src/entities/user.entity';
import { Department } from 'src/entities/department.entity';
import { Accessory } from 'src/entities/accessory.entity';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class DashboardService {
	constructor(
		@InjectRepository(Device) private readonly deviceRepository: Repository<Device>,
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@InjectRepository(Provider) private readonly providerRepository: Repository<Provider>,
		@InjectRepository(Department) private readonly departmentRepository: Repository<Department>,
		@InjectRepository(Accessory) private readonly accessoryRepository: Repository<Accessory>,
	) { }

	async getTotalsByFilter(filters: any) {
		const condition: any = {};
		if (filters) {
			if (filters.from_date && filters.from_date != '') {
				let fromDate = moment(filters.from_date).startOf('day').format('yyyy-MM-DD hh:mm:ss');
				condition.created_at = Raw(alias => `${alias} >= '${fromDate}'`);
			}

			if (filters.to_date && filters.to_date != '') {
				let toDate = moment(filters.to_date).endOf('day').format('yyyy-MM-DD hh:mm:ss');
				condition.created_at = Raw(alias => `${alias} <= '${toDate}'`);
			}
		}

		const [countDevice, countUser, countProvider, countDepartment, countAccessory] = await Promise.all([
			this.deviceRepository.count({
				where: condition
			}), 
			this.userRepository.count({
				where: condition
			}),
			this.providerRepository.count({
				where: condition
			}),
			this.departmentRepository.count({
				where: condition
			}),
			this.accessoryRepository.count({
				where: condition
			}),
		]);
		return {
			devices: countDevice,
			users: countUser,
			providers: countProvider,
			departments: countDepartment,
			accessories: countAccessory,
		};
	}
}
