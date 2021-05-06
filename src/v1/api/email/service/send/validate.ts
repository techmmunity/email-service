import { SendParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { ApplicationValues } from "core/enums/applications";
import { LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

const schema = yup.object().shape({
	receiverEmail: yup.string().strict().required().email(),
	// TODO Add valid template code validation
	templateCode: yup
		.string()
		.strict()
		.required()
		.min(Limits.template.code.min)
		.max(Limits.template.code.max),
	application: yup.string().strict().required().oneOf(ApplicationValues()),
	language: yup.string().strict().required().oneOf(LanguageValues()),
	extraData: yup.object().strict().required(),
});

export const validate = async (params: SendParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
