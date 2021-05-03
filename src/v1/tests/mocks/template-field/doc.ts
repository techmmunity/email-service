export interface CreateTemplateFieldDoc {
	templateId: string;
	field: string;
	descripion: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export const doc = ({
	templateId,
	field,
	descripion,
	createdAt,
	updatedAt,
}: CreateTemplateFieldDoc) => ({
	templateId,
	field,
	descripion,
	createdAt: createdAt || new Date(),
	updatedAt: updatedAt || new Date(),
});
