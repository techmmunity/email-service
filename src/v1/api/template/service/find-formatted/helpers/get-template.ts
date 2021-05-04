import { TemplateRepository } from "v1/api/template/entities/template.entity";

import { ErrorUtil } from "v1/utils/error";

interface GetTemplateParams {
	TemplateRepository: TemplateRepository;
	code: string;
}

export const getTemplate = async ({
	TemplateRepository,
	code,
}: GetTemplateParams) => {
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
