import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from 'src/entities/device.entity';
import { User } from 'src/entities/user.entity';
import { Provider } from 'src/entities/provider.entity';
import { Department } from 'src/entities/department.entity';
import { Accessory } from 'src/entities/accessory.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Device,
			User,
			Provider,
			Department,
			Accessory,
		])
	],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
