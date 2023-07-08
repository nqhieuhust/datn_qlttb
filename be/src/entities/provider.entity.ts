import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Accessory } from "./accessory.entity";
import { Device } from "./device.entity";


@Entity('providers', { schema: 'public' })
export class Provider {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

    @Column('varchar', { name: 'provider_name', length: 255 })
    provider_name: string;

    @Column('varchar', { name: 'address', length: 255 })
    address: string;

    @Column('varchar', { name: 'representation', length: 255 })
    representation: string;

    @Column('varchar', { name: 'mobile' })
    mobile: string;

    @Column('varchar', { name: 'email' })
    email: string;

    @Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;

	@OneToMany(() => Accessory, acc => acc.provider)
	@JoinColumn({ name: "provider_id", referencedColumnName: "id"})
	accessories: Accessory[];

	@OneToMany(() => Device, de => de.provider)
	@JoinColumn({ name: "provider_id", referencedColumnName: "id"})
	devices: Device[];
}
