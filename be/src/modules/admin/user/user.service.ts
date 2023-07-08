import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Equal, In, Like, Not, Raw, Repository } from 'typeorm';
import { IPaging, Paging } from 'src/helpers/helper';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { ValidateService } from './services/validate.service';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		private readonly validateUserService: ValidateService
		) { }

	async createData(data: CreateUserDto) {
		await this.validateUserService.validateUser(data, true);
		data.created_at = new Date();
		data.updated_at = new Date();
		data.password = await bcrypt.hash(data.password.trim(), 5);

		let newCate = await this.userRepository.create({
			...data
		});
		await this.userRepository.save(newCate);
		return newCate;
	}

	async getById(id: number) {
		return await this.userRepository.findOne(
			{
				where: {id: id},
				relations: {department: true}
			}
		);
	}

	async deleteProviderById(id: number) {
		await this.userRepository.delete(id);
	}

	async updateById(id: number, data: UpdateUserDto) {
		await this.validateUserService.validateUser(data);
		const newData = Object.entries(data).reduce((newItem: any ,item: any) => {
			if(item[1]) {
				newItem[`${item[0]}`] = item[1];
			}
			return newItem;
		}, {});
		newData.updated_at = new Date();
		if(newData.password) {
			newData.password = await bcrypt.hash(newData.password.trim(), 5);
		}
		await this.userRepository.update(id, newData);
		return this.userRepository.findOneBy({ id: id });
	}

	async getLists(paging: IPaging, filters: any, req?: any) {
		const userId  = req.user?.id || 0;
		let conditions: any = await this.buildConditions(filters, userId);
		let relations: any = {
			department: true
		};


		const [users, total] = await this.userRepository.findAndCount({
			where: conditions,
			relations: relations,
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});

		return { users: users, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async buildConditions(filters: any, user_id: number = 0) {
		const conditions: any = {};
		if (filters.id && filters.id != '') {
			if(user_id && user_id != filters.id) {
				conditions.id = Raw((id) => `${id} = '${filters.id}' and ${id} != '${user_id}'`);
			} else {
				conditions.id = Equal(filters.id);
			}
		} 
		else {
			conditions.id = Not(user_id)
		}
		if (filters.username && filters.username.trim() != '') conditions.username = Like(`%${filters.username.trim()}%`);
		if (filters.email && filters.email.trim() != '') conditions.email =  Like(`%${filters.email.trim()}%`);
		if (filters.mobile && filters.mobile.trim() != '') conditions.mobile =  Like(`%${filters.mobile.trim()}%`);
		if (filters.status && filters.status != '') conditions.status =  filters.status;
		if (filters.roles && filters.roles != '') conditions.role = In(filters.roles.split(','));
		if (filters.department_id) conditions.department_id = Equal(filters.department_id)

		return conditions;
	}

	async findByUsername(username: string) {
		return await this.userRepository.findOne({
			where: {
				username: username
			}
		});
	}

	async deleteById(id: number) {
		return await this.userRepository.delete(id);
	}
}
