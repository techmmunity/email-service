import { ApiProperty } from "@nestjs/swagger";

import { ApplicationEnum, ApplicationValues } from "core/enums/applications";
import { LanguageEnum, LanguageValues } from "core/enums/language";

class SendEmailExtraDataInputSchema {
	@ApiProperty({
		description:
			"Field do be replaced (EXAMPLE KEY! Varies according to template fields)",
		example: "Renato Razal",
	})
	public userName?: string;
}

export class SendEmailInputSchema {
	@ApiProperty({
		description: "Email of the reciever",
		example: "foo@bar.com",
	})
	public receiverEmail: string;

	@ApiProperty({
		description: "Template code",
		example: "confirm.email",
	})
	public templateCode: string;

	@ApiProperty({
		description: "Template application",
		type: "enum",
		enum: ApplicationValues(),
	})
	public application: ApplicationEnum;

	@ApiProperty({
		description: "Template language",
		type: "enum",
		enum: LanguageValues(),
	})
	public language: LanguageEnum;

	@ApiProperty({
		description: "Data to be replaced in email content and subject",
		type: SendEmailExtraDataInputSchema,
	})
	public extraData: SendEmailExtraDataInputSchema;
}
