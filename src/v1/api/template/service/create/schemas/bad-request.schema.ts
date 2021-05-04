import { ApiProperty } from "@nestjs/swagger";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { ApplicationValues } from "core/enums/applications";
import { LanguageValues } from "core/enums/language";
import { TemplateFieldTypeValues } from "core/enums/template-field-type";

import { Limits } from "v1/config/limits";

export class CreateTemplateBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			InvalidParamsErrorMessage,
			"application is a required field",
			"application must be a `string` type, but the final value was: `123`.",
			`application must be one of the following values: ${ApplicationValues().join(
				", ",
			)}`,
			"code is a required field",
			"code must be a `string` type, but the final value was: `123`.",
			`code must be at least ${Limits.template.code.min} characters`,
			`code must be at most ${Limits.template.code.max} characters`,
			"fields is a required field",
			"fields must be a `array` type, but the final value was: `123`.",
			"fields field must have at least 1 items",
			"fields[0] must be a `object` type, but the final value was: `123`.",
			"fields[0].field is a required field",
			"fields[0].field must be a `string` type, but the final value was: `123`.",
			`fields[0].field must be at least ${Limits.templateField.field.min} characters`,
			`fields[0].field must be at most ${Limits.templateField.field.max} characters`,
			"fields[0].description is a required field",
			"fields[0].description must be a `string` type, but the final value was: `123`.",
			`fields[0].description must be at least ${Limits.templateField.description.min} characters`,
			`fields[0].description must be at most ${Limits.templateField.description.max} characters`,
			"fields[0].type is a required field",
			"fields[0].type must be a `string` type, but the final value was: `123`.",
			`fields[0].type must be one of the following values: ${TemplateFieldTypeValues().join(
				", ",
			)}`,
			"contents is a required field",
			"contents must be a `array` type, but the final value was: `123`.",
			"contents field must have at least 1 items",
			"contents[0] must be a `object` type, but the final value was: `123`.",
			"contents[0].content is a required field",
			"contents[0].content must be a `string` type, but the final value was: `123`.",
			`contents[0].content must be at least ${Limits.templateContent.content.min} characters`,
			`contents[0].content must be at most ${Limits.templateContent.content.max} characters`,
			"contents[0].language is a required field",
			"contents[0].language must be a `string` type, but the final value was: `123`.",
			`contents[0].language must be one of the following values: ${LanguageValues().join(
				", ",
			)}`,
		],
	})
	public errors: Array<string>;
}
