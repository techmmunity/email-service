import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TemplateService } from "./template.service";

import { TemplateEntity } from "./entities/template.entity";
import { TemplateController } from './template.controller';

@Module({
	imports: [TypeOrmModule.forFeature([TemplateEntity])],
	providers: [TemplateService],
	controllers: [TemplateController],
})
export class TemplateModule {
	//
}
