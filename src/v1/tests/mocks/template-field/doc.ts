import { TemplateFieldTypeEnum } from "core/enums/template-field-type";

export interface CreateTemplateFieldDoc {
	templateId: string;
	field: string;
	type: TemplateFieldTypeEnum;
	descripion: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export const doc = ({
	templateId,
	field,
	type,
	descripion,
	createdAt,
	updatedAt,
}: CreateTemplateFieldDoc) => ({
	templateId,
	field,
	type,
	descripion,
	createdAt: createdAt || new Date(),
	updatedAt: updatedAt || new Date(),
});
