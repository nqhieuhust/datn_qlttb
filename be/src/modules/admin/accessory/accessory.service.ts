import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Equal, Like, Raw, Repository} from "typeorm";
import {Accessory} from "../../../entities/accessory.entity";
import {IPaging} from "../../../helpers/interface/paging.interface";
import {Paging} from "../../../helpers/response/response";
import {CreateProviderDto} from "../provider/dtos/create-provider.dto";
import {CreateAccessoryDto} from "./dtos/create-accessory.dto";
import { UpdateAccessoryDto } from './dtos/update-accessory.dto';

@Injectable()
export class AccessoryService {
    constructor(@InjectRepository(Accessory) private readonly accessoryRepository: Repository<Accessory>) {}

	async buildConditions(filters: any)
    {
        const conditions: any = {};
        if (filters.id) conditions.id = Equal(filters.id);
        if (filters.provider_id) conditions.provider_id = Equal(filters.provider_id)
        if (filters.accessory_name && filters.accessory_name.trim() != '') conditions.accessory_name = Like(`%${filters.accessory_name.trim()}%`);
        return conditions;
    }

    async getLists(paging: IPaging, filters: any, req?: any) {
        let conditions = await this.buildConditions(filters);
		let relations: any = {
			provider: true
		};
		// if(req) {
		// 	if(req.query.with_provider) rea
		// }
        const [results, total] = await this.accessoryRepository.findAndCount({
            where: conditions,
			relations: relations,
            order: { id: 'ASC' },
            take: paging.page_size,
            skip: ((paging.page - 1) * paging.page_size),
        });

        return { accessories: results, meta: new Paging(paging.page, paging.page_size, total) };
    }

    async createData(data: CreateAccessoryDto) {
        data.created_at = new Date();
        data.updated_at = new Date();
        let newCate = await this.accessoryRepository.create({
            ...data
        });
        await this.accessoryRepository.save(newCate);
        return newCate;
    }

	async getById(id: number) {
		return await this.accessoryRepository.findOne({
			where: { id: id},
			relations: { provider: true}
		});
	}

	async updateDataById(id: number, data: UpdateAccessoryDto) {
		const newData: UpdateAccessoryDto = Object.entries(data).reduce((newItem: any ,item: any) => {
			if(item[1]) {
				newItem[`${item[0]}`] = item[1];
			}
			return newItem;
		}, {});
		let newDataUpdate = await this.accessoryRepository.create({...newData, updated_at: new Date()});
		await this.accessoryRepository.update(id, newDataUpdate);
		return await this.getById(id);
	}

	async deleteDataById(id: number) {
		await this.accessoryRepository.delete(id);
	}

    
}
