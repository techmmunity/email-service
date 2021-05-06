import { ApiProperty } from "@nestjs/swagger";

import { LanguageEnum } from "core/enums/language";

export class SendEmailNotFoundSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			"Template not found",
			`Template content with language "${LanguageEnum.EN}" not found`,
		],
	})
	public errors: Array<string>;
}
