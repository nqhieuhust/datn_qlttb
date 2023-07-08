import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/entities/provider.entity';
import {Equal, Raw, Repository} from 'typeorm';
import { CreateProviderDto } from './dtos/create-provider.dto';
import {IPaging} from "../../../helpers/interface/paging.interface";
import {Paging} from "../../../helpers/response/response";
import {UpdateProviderDto} from "./dtos/update-provider.dto";

@Injectable()
export class ProviderService {

	constructor(@InjectRepository(Provider) private readonly providerRepo: Repository<Provider>) {}

	async createData(data: CreateProviderDto) {
		data.created_at = new Date();
		data.updated_at = new Date();
		let newCate = await this.providerRepo.create({
			...data
		});
		await this.providerRepo.save(newCate);
		return newCate;
	}

	async getById(id: number)
	{
		return await this.providerRepo.findOne({
			where: { id: id },
			// relations: {
			// 	provider: true
			// }
		});
	}

	async deleteProviderById(id: number)
	{
		await this.providerRepo.delete(id);
	}

	async updateById(id: number, data: UpdateProviderDto) {
		const newData = Object.entries(data).reduce((newItem: any ,item: any) => {
			if(item[1]) {
				newItem[`${item[0]}`] = item[1];
			}
			return newItem;
		}, {});
		newData.updated_at = new Date();
		await this.providerRepo.update(id, newData);
		return this.providerRepo.findOneBy({ id: id });
	}

	async getLists(paging: IPaging, filters: any, req?: any) {
		let conditions = await this.buildConditions(filters);

		const [providers, total] = await this.providerRepo.findAndCount({
			where: conditions,
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});

		return { providers: providers, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async buildConditions(filters: any)
	{
		const conditions: any = {};

		if (filters.id) conditions.id = Equal(filters.id);
		if (filters.provider_name && filters.provider_name.trim() !== '') conditions.provider_name = Raw(alias => `${alias} like '%${filters.provider_name.trim()}%'`);
		if (filters.mobile && filters.mobile.trim() !== '') conditions.mobile = Raw(alias => `${alias} like '%${filters.mobile.trim()}%'`);
		if (filters.email && filters.email.trim() !== '') conditions.email = Raw(alias => `${alias} like '%${filters.email.trim()}%'`);
		return conditions;
	}
}
