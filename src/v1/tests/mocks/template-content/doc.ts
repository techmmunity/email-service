import { LanguageEnum } from "core/enums/language";

export interface CreateTemplateContentDoc {
	templateId: string;
	language: LanguageEnum;
	content: string;
	subject: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export const doc = ({
	templateId,
	language,
	content,
	subject,
	createdAt,
	updatedAt,
}: CreateTemplateContentDoc) => ({
	templateId,
	language,
	content,
	subject,
	createdAt: createdAt || new Date(),
	updatedAt: updatedAt || new Date(),
});
