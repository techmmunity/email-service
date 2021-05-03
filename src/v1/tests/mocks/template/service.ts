import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MockRepository } from "../repository";

import { TemplateService } from "v1/api/template/template.service";

import { TemplateEntity } from "v1/api/template/entities/template.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			TemplateService,
			{
				provide: getRepositoryToken(TemplateEntity),
				useValue: mockRepository,
			},
		],
	}).compile();

	return module.get<TemplateService>(TemplateService);
};
