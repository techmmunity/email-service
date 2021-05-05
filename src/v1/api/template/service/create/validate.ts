import { CreateParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { ApplicationValues } from "core/enums/applications";
import { LanguageValues } from "core/enums/language";
import { TemplateFieldTypeValues } from "core/enums/template-field-type";

import { Limits } from "v1/config/limits";

const schema = yup.object().shape({
	code: yup
		.string()
		.required()
		.strict()
		.min(Limits.template.code.min)
		.max(Limits.template.code.max),
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
					.min(Limits.templateField.field.min)
					.max(Limits.templateField.field.max),
				description: yup
					.string()
					.strict()
					.required()
					.min(Limits.templateField.description.min)
					.max(Limits.templateField.description.max),
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
					.min(Limits.templateContent.content.min)
					.max(Limits.templateContent.content.max),
				subject: yup
					.string()
					.strict()
					.required()
					.min(Limits.templateContent.subject.min)
					.max(Limits.templateContent.subject.max),
				language: yup.string().strict().required().oneOf(LanguageValues()),
			}),
		),
});

export const validate = async (params: CreateParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
