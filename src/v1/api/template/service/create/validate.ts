import { CreateParams } from ".";

import { errorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { ApplicationValues } from "core/enums/applications";
import { LanguageValues } from "core/enums/language";
import { TemplateFieldTypeValues } from "core/enums/template-field-type";

import { LIMITS } from "v1/config/limits";

const schema = yup.object().shape({
	code: yup
		.string()
		.required()
		.strict()
		.min(LIMITS.template.code.min)
		.max(LIMITS.template.code.max),
	application: yup.string().strict().required().oneOf(ApplicationValues()),
	fields: yup
		.array()
		.strict()
		.required()
		.min(1)
		.of(
			yup.object().shape({
				field: yup
					.string()
					.strict()
					.required()
					.min(LIMITS.templateField.field.min)
					.max(LIMITS.templateField.field.max),
				description: yup
					.string()
					.strict()
					.required()
					.min(LIMITS.templateField.description.min)
					.max(LIMITS.templateField.description.max),
				type: yup.string().strict().required().oneOf(TemplateFieldTypeValues()),
			}),
		),
	contents: yup
		.array()
		.strict()
		.required()
		.min(1)
		.of(
			yup.object().shape({
				content: yup
					.string()
					.strict()
					.required()
					.min(LIMITS.templateContent.content.min)
					.max(LIMITS.templateContent.content.max),
				subject: yup
					.string()
					.strict()
					.required()
					.min(LIMITS.templateContent.subject.min)
					.max(LIMITS.templateContent.subject.max),
				language: yup.string().strict().required().oneOf(LanguageValues()),
			}),
		),
});

export const validate = (params: CreateParams) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
