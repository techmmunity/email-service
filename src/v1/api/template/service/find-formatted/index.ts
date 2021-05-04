import * as inlineCss from "inline-css";
import { resolve } from "path";

import { getTemplate } from "./helpers/get-template";
import { getTemplateContent } from "./helpers/get-template-content";

import { validate } from "./validate";

import { TemplateRepository } from "../../entities/template.entity";

import { LanguageEnum } from "core/enums/language";

interface Injectables {
	TemplateRepository: TemplateRepository;
}

export interface FindFormattedParams {
	code: string;
	language: LanguageEnum;
}

export const findFormatted = async (
	{ TemplateRepository }: Injectables,
	params: FindFormattedParams,
) => {
	await validate(params);

	const { code, language } = params;

	const template = await getTemplate({
		TemplateRepository,
		code,
	});

	const templateContent = getTemplateContent({
		template,
		language,
	});

	const formattedContent = await inlineCss(templateContent.content, {
		url: resolve(__dirname),
	});

	const fields = template.fields.map(field => ({
		field: field.field,
		type: field.type,
	}));

	return {
		fields,
		content: formattedContent,
	};
};
