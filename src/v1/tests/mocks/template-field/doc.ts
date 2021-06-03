import { TemplateFieldTypeEnum } from "core/enums/template-field-type";

export interface CreateTemplateFieldDoc {
	templateId: string;
	field: string;
	type: TemplateFieldTypeEnum;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export const doc = ({
	templateId,
	field,
	type,
	description,
	createdAt,
	updatedAt,
}: CreateTemplateFieldDoc) => ({
	templateId,
	field,
	type,
	descripion: description,
	createdAt: createdAt || new Date(),
	updatedAt: updatedAt || new Date(),
});
