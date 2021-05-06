import { ApiProperty } from "@nestjs/swagger";

import { ApplicationEnum, ApplicationValues } from "core/enums/applications";
import { LanguageEnum, LanguageValues } from "core/enums/language";
import {
	TemplateFieldTypeEnum,
	TemplateFieldTypeValues,
} from "core/enums/template-field-type";

class CreateTemplateFieldsInputSchema {
	@ApiProperty({
		description: "Field name",
		example: "userName",
	})
	public field: string;

	@ApiProperty({
		description: "Field description",
		example: "User's first name",
	})
	public description: string;

	@ApiProperty({
		description: "Field type",
		type: "enum",
		enum: TemplateFieldTypeValues(),
	})
	public type: TemplateFieldTypeEnum;
}

class CreateTemplateContentsInputSchema {
	@ApiProperty({
		description: "Email subject",
		example: "Verify your account!",
	})
	public subject: string;

	@ApiProperty({
		description: "Email body, html format, with HTML tags",
		example:
			"<!DOCTYPE html><html><head><title>Title</title></head><body><h1>Hello Word</h1></body></html>",
	})
	public content: string;

	@ApiProperty({
		description: "Content language",
		type: "enum",
		enum: LanguageValues(),
	})
	public language: LanguageEnum;
}

export class CreateTemplateInputSchema {
	@ApiProperty({
		description: "Application that the template belongs",
		type: "enum",
		enum: ApplicationValues(),
	})
	public application: ApplicationEnum;

	@ApiProperty({
		description: "Template code",
		example: "confirm.email",
	})
	public code: string;

	@ApiProperty({
		description: "Template fields (data to be replaced in body and subject)",
		type: CreateTemplateFieldsInputSchema,
		isArray: true,
	})
	public fields: Array<CreateTemplateFieldsInputSchema>;

	@ApiProperty({
		description: "Template contents (email body)",
		type: CreateTemplateContentsInputSchema,
		isArray: true,
	})
	public contents: Array<CreateTemplateContentsInputSchema>;
}
