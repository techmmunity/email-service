import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { findByCode, FindByCodeParams } from "./service/find-by-code";

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
	public findByCode(params: FindByCodeParams) {
		return findByCode(
			{
				TemplateRepository: this.TemplateRepository,
			},
			params,
		);
	}
}
