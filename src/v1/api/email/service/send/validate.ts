import { SendParams } from ".";

import { errorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { ApplicationValues } from "core/enums/applications";
import { LanguageValues } from "core/enums/language";

import { LIMITS } from "v1/config/limits";

const schema = yup.object().shape({
	receiverEmail: yup.string().strict().required().email(),
	templateCode: yup
		.string()
		.strict()
		.required()
		.min(LIMITS.template.code.min)
		.max(LIMITS.template.code.max),
	application: yup.string().strict().required().oneOf(ApplicationValues()),
	language: yup.string().strict().required().oneOf(LanguageValues()),
	extraData: yup.object().strict().required(),
});

export const validate = (params: SendParams) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
