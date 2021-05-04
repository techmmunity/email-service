import { TemplateEntity } from "v1/api/template/entities/template.entity";

import { ErrorUtil } from "v1/utils/error";

import { LanguageEnum } from "core/enums/language";

interface GetTemplateContentParams {
	template: TemplateEntity;
	language: LanguageEnum;
}

export const getTemplateContent = ({
	template,
	language,
}: GetTemplateContentParams) => {
	const templateContent = template.contents.find(
		content => content.language === language,
	);

	if (!templateContent) {
		return ErrorUtil.notFound([
			`Template content with language "${language}" not found`,
		]);
	}

	return templateContent;
};
