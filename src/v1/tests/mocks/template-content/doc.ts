import { LanguageEnum } from "core/enums/language";

export interface CreateTemplateContentDoc {
	templateId: string;
	language: LanguageEnum;
	content: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export const doc = ({
	templateId,
	language,
	content,
	createdAt,
	updatedAt,
}: CreateTemplateContentDoc) => ({
	templateId,
	language,
	content,
	createdAt: createdAt || new Date(),
	updatedAt: updatedAt || new Date(),
});
