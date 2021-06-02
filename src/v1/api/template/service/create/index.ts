import { HttpCodeEnum, PgErrorEnum } from "@techmmunity/database-error-handler";
import { v4 } from "uuid";

import { validate } from "./validate";

import { TemplateRepository } from "../../entities/template.entity";

import { dbHandler } from "v1/utils/db-handler";

import { ApplicationEnum } from "core/enums/applications";
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
		subject: string;
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
		contents: contents.map(({ language, content, subject }) => ({
			templateId,
			language,
			content,
			subject,
		})),
	}).catch(
		dbHandler([
			{
				error: PgErrorEnum.UniqueViolation,
				table: "templates",
				columns: ["application", "code"],
				responseCode: HttpCodeEnum.Conflict,
				makeError: ({ application, code }) => ({
					errors: [
						`Template with code "${code}" already exists for application "${application}"`,
					],
				}),
			},
		]),
	);
};
