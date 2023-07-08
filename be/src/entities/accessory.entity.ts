import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Provider } from "./provider.entity";


@Entity('accessories', { schema: 'public' })
export class Accessory {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

    @Column('varchar', { name: 'accessory_name', length: 255 })
    accessory_name: string;

    @Column('bigint', { name: 'quantity' })
    quantity: number;

    @Column('varchar', { name: 'unit', length: 255 })
    unit: string;

    @Column('timestamp', { name: 'import_date' })
	import_date: Date;

    @Column('tinyint', { name: 'status', default: -1 })
    status: number;

    @Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;

    @Column('bigint', { name: 'provider_id', nullable: false })
    provider_id: number;

	@ManyToOne(() => Provider, provider => provider.accessories)
	@JoinColumn({ name: "provider_id", referencedColumnName: "id"})
	provider: Provider;
}
