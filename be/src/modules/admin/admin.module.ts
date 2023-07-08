import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DepartmentModule } from './department/department.module';
import { ProviderModule } from './provider/provider.module';
import { AccessoryModule } from './accessory/accessory.module';
import { DeviceModule } from './device/device.module';
import { UserModule } from './user/user.module';
import { AccountMiddleware } from './middleware/account.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
    imports: [
        DepartmentModule,
        ProviderModule,
        AccessoryModule,
        DeviceModule,
        UserModule,
		JwtModule,
		DashboardModule,
    ],
    providers: [
		JwtService
	],
    controllers: []
})
export class AdminModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AccountMiddleware)
		.forRoutes('user', 'devices', 'providers', 'accessory, department')
	}
 }
