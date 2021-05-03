import { LanguageEnum } from "core/enums/language";

export interface CreateTemplateContentDoc {
	templateId: string;
	language: LanguageEnum;
	content: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const buildContent = (content: string) =>
	`<!DOCTYPE html><html><head><title>Title</title></head><body>${content}</body></html>`;

export const doc = ({
	templateId,
	language,
	content,
	createdAt,
	updatedAt,
}: CreateTemplateContentDoc) => ({
	templateId,
	language,
	content: buildContent(content),
	createdAt: createdAt || new Date(),
	updatedAt: updatedAt || new Date(),
});
