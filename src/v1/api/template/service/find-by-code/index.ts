import { validate } from "./validate";

import { TemplateRepository } from "../../entities/template.entity";

import { ErrorUtil } from "v1/utils/error";

interface Injectables {
	TemplateRepository: TemplateRepository;
}

export interface FindByCodeParams {
	code: string;
}

export const findByCode = async (
	{ TemplateRepository }: Injectables,
	params: FindByCodeParams,
) => {
	await validate(params);

	const { code } = params;

	const template = await TemplateRepository.findOne({
		where: {
			code,
		},
		relations: ["contents", "fields"],
	});

	if (!template) {
		return ErrorUtil.notFound(["Template not found"]);
	}

	return template;
};
