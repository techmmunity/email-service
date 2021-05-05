import { ApiProperty } from "@nestjs/swagger";

import { ApplicationEnum, ApplicationValues } from "core/enums/applications";
import { LanguageEnum, LanguageValues } from "core/enums/language";
import {
	TemplateFieldTypeEnum,
	TemplateFieldTypeValues,
} from "core/enums/template-field-type";

class CreateTemplateFieldsOutputSchema {
	@ApiProperty({
		description: "Template id",
		example: "a63d5299-009a-40a8-b028-bbeec0d19e6b",
	})
	public templateId: string;

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
		enum: TemplateFieldTypeValues(),
	})
	public type: TemplateFieldTypeEnum;

	@ApiProperty({
		description: "Field creation date",
		example: new Date(),
	})
	public createdAt: Date;

	@ApiProperty({
		description: "Field update date",
		example: new Date(),
	})
	public updatedAt: Date;
}

class CreateTemplateContentsOutputSchema {
	@ApiProperty({
		description: "Template id",
		example: "a63d5299-009a-40a8-b028-bbeec0d19e6b",
	})
	public templateId: string;

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
		enum: LanguageValues(),
	})
	public language: LanguageEnum;

	@ApiProperty({
		description: "Content creation date",
		example: new Date(),
	})
	public createdAt: Date;

	@ApiProperty({
		description: "Content update date",
		example: new Date(),
	})
	public updatedAt: Date;
}

export class CreateTemplateOutputSchema {
	@ApiProperty({
		description: "Template id",
		example: "a63d5299-009a-40a8-b028-bbeec0d19e6b",
	})
	public id: string;

	@ApiProperty({
		description: "Application that the template belongs",
		enum: ApplicationValues(),
	})
	public application: ApplicationEnum;

	@ApiProperty({
		description: "Template code",
		example: "confirm.email",
	})
	public code: string;

	@ApiProperty({
		description: "Template creation date",
		example: new Date(),
	})
	public createdAt: Date;

	@ApiProperty({
		description: "Template update date",
		example: new Date(),
	})
	public updatedAt: Date;

	@ApiProperty({
		description: "Template fields (data to be replaced)",
		type: CreateTemplateFieldsOutputSchema,
		isArray: true,
	})
	public fields: Array<CreateTemplateFieldsOutputSchema>;

	@ApiProperty({
		description: "Template contents (email body)",
		type: CreateTemplateContentsOutputSchema,
		isArray: true,
	})
	public contents: Array<CreateTemplateContentsOutputSchema>;
}
