import { Module } from '@nestjs/common';
import { AccessoryController } from './accessory.controller';
import { AccessoryService } from './accessory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Accessory} from "../../../entities/accessory.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Accessory
        ]),
    ],
    controllers: [AccessoryController],
    providers: [AccessoryService]
})
export class AccessoryModule {}
