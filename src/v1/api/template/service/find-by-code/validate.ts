import { FindByCodeParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { Limits } from "v1/config/limits";

const schema = yup.object().shape({
	code: yup
		.string()
		.required()
		.strict()
		.min(Limits.template.code.min)
		.max(Limits.template.code.max),
});

export const validate = async (params: FindByCodeParams) =>
	schema.validate(params).catch(err => ErrorUtil.badRequest(err.errors));
