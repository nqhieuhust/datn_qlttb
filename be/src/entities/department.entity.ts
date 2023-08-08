import {Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user.entity";
import { Device } from "./device.entity";

@Index('departments_pk', ['id'], { unique: true })
@Entity('departments')
export class Department {

    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

    @Column('varchar', { name: 'department_name', length: 255 })
    department_name: string;

    @Column('varchar', { name: 'address', length: 255 })
    address: string;

    @Column('varchar', { name: 'manager', length: 255 })
    manager: string;

    @Column('varchar', { name: 'mobile', length: 255 })
    mobile: string;

    @Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;

	@OneToMany(() => User, user => user.department)
	@JoinColumn({ name: "department_id", referencedColumnName: "id"})
	users: User[];

	@OneToMany(() => Device, devices => devices.department)
	@JoinColumn({ name: "department_id", referencedColumnName: "id"})
	devices: Device[];
}
