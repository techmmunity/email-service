import { TemplateRepository } from "v1/api/template/entities/template.entity";

import { errorUtil } from "v1/utils/error";

import { ApplicationEnum } from "core/enums/applications";

interface GetTemplateParams {
	templateRepository: TemplateRepository;
	code: string;
	application: ApplicationEnum;
}

export const getTemplate = async ({
	templateRepository,
	code,
	application,
}: GetTemplateParams) => {
	const template = await templateRepository.findOne({
		where: {
			code,
			application,
		},
		relations: ["contents", "fields"],
	});

	if (!template) {
		return errorUtil.notFound(["Template not found"]);
	}

	return template;
};
