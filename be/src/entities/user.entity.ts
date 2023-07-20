import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./department.entity";
import { Device } from "./device.entity";


@Entity('users', { schema: 'public' })
export class User {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

	@Column('varchar', { name: 'full_name', length: 255, nullable: false })
    full_name: string;

    @Column('varchar', { name: 'username', length: 255, nullable: false })
    username: string;

    @Column('varchar', { name: 'email', length: 255, nullable: false })
    email: string;

    @Column('varchar', { name: 'mobile' })
    mobile: string;

    @Column('varchar', { name: 'password', nullable: false })
    password: string;

    @Column('int', { name: 'role' })
    role: number;

    @Column('varchar', { name: 'address' })
    address: string;

    @Column('varchar', { name: 'department_id' })
    department_id: number;

    // @Column('timestamp', { name: 'email_verified_at' })
    // email_verified_at: Date;

    @Column('varchar', { name: 'remember_token' })
    remember_token: string;

    @Column('tinyint', { name: 'status', default: -1 })
    status: number;

    @Column('timestamp', { name: 'created_at' })
	created_at: Date;

    @Column('timestamp', { name: 'updated_at' })
	updated_at: Date;

	@ManyToOne(() => Department, department => department.users)
	@JoinColumn({ name: "department_id", referencedColumnName: "id"})
	department: Department;

	@OneToMany(() => Device, de => de.user)
	@JoinColumn({ name: "user_id", referencedColumnName: "id"})
	devices: Device[];
}
