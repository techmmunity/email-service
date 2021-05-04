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
		private readonly TemplateRepository: TemplateRepository,
	) {
		//
	}

	@Transactional()
	public create(params: CreateParams) {
		return create(
			{
				TemplateRepository: this.TemplateRepository,
			},
			params,
		);
	}

	@Transactional()
	public findFormatted(params: FindFormattedParams) {
		return findFormatted(
			{
				TemplateRepository: this.TemplateRepository,
			},
			params,
		);
	}
}
