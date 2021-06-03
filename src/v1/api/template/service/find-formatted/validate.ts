import { FindFormattedParams } from ".";

import { errorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { ApplicationValues } from "core/enums/applications";
import { LanguageValues } from "core/enums/language";

import { LIMITS } from "v1/config/limits";

const schema = yup.object().shape({
	code: yup
		.string()
		.required()
		.strict()
		.min(LIMITS.template.code.min)
		.max(LIMITS.template.code.max),
	application: yup.string().required().strict().oneOf(ApplicationValues()),
	language: yup.string().required().strict().oneOf(LanguageValues()),
});

export const validate = (params: FindFormattedParams) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
