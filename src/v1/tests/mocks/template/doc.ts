import { v4 } from "uuid";

import { ApplicationEnum } from "core/enums/applications";

export interface CreateTemplateDoc {
	application: ApplicationEnum;
	code: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export const doc = ({
	application,
	code,
	createdAt,
	updatedAt,
}: CreateTemplateDoc) => ({
	id: v4(),
	application,
	code,
	createdAt: createdAt || new Date(),
	updatedAt: updatedAt || new Date(),
});
