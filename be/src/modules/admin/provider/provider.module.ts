import { Module } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from 'src/entities/provider.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Provider
		]),
	],
	controllers: [ProviderController],
	providers: [ProviderService]
})
export class ProviderModule { }
