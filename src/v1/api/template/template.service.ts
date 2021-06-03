import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { create, CreateParams } from "./service/create";
import { findFormatted, FindFormattedParams } from "./service/find-formatted";

import { TemplateEntity, TemplateRepository } from "./entities/template.entity";

@Injectable()
export class TemplateService {
	public constructor(
		@InjectRepository(TemplateEntity)
		private readonly templateRepository: TemplateRepository,
	) {}

	@Transactional()
	public create(params: CreateParams) {
		return create(
			{
				templateRepository: this.templateRepository,
			},
			params,
		);
	}

	@Transactional()
	public findFormatted(params: FindFormattedParams) {
		return findFormatted(
			{
				templateRepository: this.templateRepository,
			},
			params,
		);
	}
}
