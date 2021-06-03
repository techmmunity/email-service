import { ApiProperty } from "@nestjs/swagger";

import { invalidParamsErrorMessage } from "v1/utils/yup";

import { ApplicationValues } from "core/enums/applications";
import { LanguageValues } from "core/enums/language";

import { LIMITS } from "v1/config/limits";

export class SendEmailBadRequestSchema {
	@ApiProperty({
		description: "Errors",
		example: [
			invalidParamsErrorMessage,
			"receiverEmail is a required field",
			"receiverEmail must be a `string` type, but the final value was: `123`.",
			"receiverEmail must be a valid email",
			"templateCode is a required field",
			"templateCode must be a `string` type, but the final value was: `123`.",
			`templateCode must be at least ${LIMITS.template.code.min} characters`,
			`templateCode must be at most ${LIMITS.template.code.max} characters`,
			"language is a required field",
			"language must be a `string` type, but the final value was: `123`.",
			`language must be one of the following values: ${LanguageValues().join(
				", ",
			)}`,
			"application is a required field",
			"application must be a `string` type, but the final value was: `123`.",
			`application must be one of the following values: ${ApplicationValues().join(
				", ",
			)}`,
			"extraData is a required field",
			"extraData must be a `object` type, but the final value was: `123`.",
			"extraData must be a `object` type, but the final value was: `[]`.",
		],
	})
	public errors: Array<string>;
}
