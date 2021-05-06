import { ObjectShape } from "yup/lib/object";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { TemplateFieldTypeEnum } from "core/enums/template-field-type";

interface ValidateExtraDataParams {
	extraData: Record<string, string>;
	fields: Array<{
		field: string;
		type: TemplateFieldTypeEnum;
	}>;
}

const stringValidation = yup.string().strict().required();
const numberValidation = yup.number().strict().required();
const emailValidation = yup.string().strict().required().email();
const uuidValidation = yup.string().strict().required().uuid();

const makeYupValidation = (fields: ValidateExtraDataParams["fields"]) => {
	const objectShape = fields.reduce((acc, cur) => {
		const { field, type } = cur;

		switch (type) {
			case TemplateFieldTypeEnum.EMAIL:
				acc[field] = emailValidation;
				break;
			case TemplateFieldTypeEnum.NUMBER:
				acc[field] = numberValidation;
				break;
			case TemplateFieldTypeEnum.STRING:
				acc[field] = stringValidation;
				break;
			case TemplateFieldTypeEnum.UUID:
				acc[field] = uuidValidation;
				break;
		}

		return acc;
	}, {} as ObjectShape);

	return yup.object().shape(objectShape);
};

export const validateExtraData = ({
	extraData,
	fields,
}: ValidateExtraDataParams) => {
	if (fields.length < 1) return {} as Record<string, any>;

	const schema = makeYupValidation(fields);

	return schema
		.validate(extraData)
		.catch(err => ErrorUtil.badRequest(err.errors));
};
