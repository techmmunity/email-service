import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TemplateService } from "./template.service";

import { TemplateController } from "./template.controller";

import { TemplateEntity } from "./entities/template.entity";

@Module({
	imports: [TypeOrmModule.forFeature([TemplateEntity])],
	providers: [TemplateService],
	controllers: [TemplateController],
	exports: [TemplateService],
})
export class TemplateModule {
	//
}
