import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { IPaging, Paging } from 'src/helpers/helper';
import { Equal, Raw, Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private departmentRepo: Repository<Department>
    ) {}

    async getDepartments(paging: IPaging, filters: any, req?: any) {
        let conditions = await this.buildConditions(filters);

        const [departments, total] = await this.departmentRepo.findAndCount({
            where: conditions,
            order: { id: 'ASC' },
            take: paging.page_size,
            skip: ((paging.page - 1) * paging.page_size),
        });

        return { departments: departments, meta: new Paging(paging.page, paging.page_size, total) };
    }

    async getDepartmentById(id: number): Promise<Department> {
        return await this.departmentRepo.findOneBy({ id: id });
    }

    async createDepartment(data: any) {
        data.created_at = new Date();
        data.updated_at = new Date();
        let newCate = await this.departmentRepo.create({
            ...data
        });
        await this.departmentRepo.save(newCate);
        return newCate;
    }

    async updateDepartment(id: number, data: any) {
		const newData = Object.entries(data).reduce((newItem: any ,item: any) => {
			if(item[1]) {
				newItem[`${item[0]}`] = item[1];
			}
			return newItem;
		}, {});
        newData.updated_at = new Date();
        await this.departmentRepo.update(id, newData);
        return this.departmentRepo.findOneBy({ id: id });
    }

    async deleteDepartment(id: number): Promise<void> {
        await this.departmentRepo.delete(id);
    }

    async buildConditions(filters: any)
    {
        const conditions: any = {};

        if (filters.id) conditions.id = Equal(filters.id);
        if (filters.department_name) conditions.department_name = Raw(alias => `${alias} LIKE '%${filters.department_name}%'`);

        return conditions;
    }
}
