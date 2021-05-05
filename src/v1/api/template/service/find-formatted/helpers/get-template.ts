import { TemplateRepository } from "v1/api/template/entities/template.entity";

import { ErrorUtil } from "v1/utils/error";

import { ApplicationEnum } from "core/enums/applications";

interface GetTemplateParams {
	TemplateRepository: TemplateRepository;
	code: string;
	application: ApplicationEnum;
}

export const getTemplate = async ({
	TemplateRepository,
	code,
	application,
}: GetTemplateParams) => {
	const template = await TemplateRepository.findOne({
		where: {
			code,
			application,
		},
		relations: ["contents", "fields"],
	});

	if (!template) {
		return ErrorUtil.notFound(["Template not found"]);
	}

	return template;
};
