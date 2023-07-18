import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Provider } from "./provider.entity";
import { User } from "./user.entity";
import { Department } from "./department.entity";


@Entity('devices', { schema: 'public' })
export class Device {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

    @Column('varchar', { name: 'code', length: 255 })
    code: string;

    @Column('varchar', { name: 'device_name', length: 255 })
    device_name: string;

    @Column('varchar', { name: 'model' })
    model: string;

    @Column('varchar', { name: 'serial' })
    serial: string;

    @Column('varchar', { name: 'device_group' })
    device_group: string;

    @Column('varchar', { name: 'device_type' })
    device_type: string;

    @Column('varchar', { name: 'accessory' })
    accessory: string;

    @Column('varchar', { name: 'manufacture' })
    manufacture: string;



    @Column('timestamp', { name: 'import_date' })
	import_date: Date;

    @Column('timestamp', { name: 'handover_date' })
	handover_date: Date;

    @Column('timestamp', { name: 'expire_date' })
	expire_date: Date;

    @Column('tinyint', { name: 'status' })
    status: number;

    @Column('tinyint', { name: 'type' })
    type: number;

    @Column('double', { name: 'countries' })
    countries: number;

    @Column('varchar', { name: 'avatar' })
    avatar: string;

    @Column('varchar', { name: 'document' })
    document: string;

    @Column('int', { name: 'provider_id', nullable: false })
    provider_id: number;

    @Column('int', { name: 'user_id', nullable: false })
    user_id: number;

	@Column('int', { name: 'department_id', nullable: false })
    department_id: number;

	@Column('timestamp', { name: 'created_at' })
    created_at: number;

	@Column('timestamp', { name: 'updated_at' })
    updated_at: number;

	@ManyToOne(() => Provider, provider => provider.devices)
	@JoinColumn({ name: "provider_id", referencedColumnName: "id"})
	provider: Provider;

	@ManyToOne(() => User, user => user.devices)
	@JoinColumn({ name: "user_id", referencedColumnName: "id"})
	user: User;

	@ManyToOne(() => Department, dp => dp.devices)
	@JoinColumn({ name: "department_id", referencedColumnName: "id"})
	department: Department;
}
