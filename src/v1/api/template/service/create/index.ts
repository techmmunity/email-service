import { v4 } from "uuid";

import { validate } from "./validate";

import { TemplateRepository } from "../../entities/template.entity";

import { DbHandler } from "v1/utils/db-handler";

import { ApplicationEnum } from "core/enums/applications";
import { DbErrorEnum } from "core/enums/db-error";
import { LanguageEnum } from "core/enums/language";
import { TemplateFieldTypeEnum } from "core/enums/template-field-type";

interface Injectables {
	TemplateRepository: TemplateRepository;
}

export interface CreateParams {
	application: ApplicationEnum;
	code: string;
	fields: Array<{
		field: string;
		type: TemplateFieldTypeEnum;
		description: string;
	}>;
	contents: Array<{
		language: LanguageEnum;
		content: string;
	}>;
}

export const create = async (
	{ TemplateRepository }: Injectables,
	params: CreateParams,
) => {
	await validate(params);

	const { application, code, fields, contents } = params;

	const templateId = v4();

	return TemplateRepository.save({
		id: templateId,
		application,
		code,
		fields: fields.map(({ field, type, description }) => ({
			templateId,
			field,
			type,
			description,
		})),
		contents: contents.map(({ language, content }) => ({
			templateId,
			language,
			content,
		})),
	}).catch(
		DbHandler([
			{
				error: DbErrorEnum.UniqueViolation,
				table: "templates",
				columns: ["application", "code"],
				handleWith: "conflict",
				message: ([application, code]) =>
					`Template with code "${code}" already exists for application "${application}"`,
			},
		]),
	);
};
