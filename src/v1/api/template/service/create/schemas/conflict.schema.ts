import { ApiProperty } from "@nestjs/swagger";

import { ApplicationEnum } from "core/enums/applications";

export class CreateTemplateConflictSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			`Template with code "confim.email" already exists for application "${ApplicationEnum.UNIQUE_LOGIN_SYSTEM}"`,
		],
	})
	public errors: Array<string>;
}
