import { CreateParams } from "v1/api/template/service/create";

import { validate } from "v1/api/template/service/create/validate";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { ApplicationEnum, ApplicationValues } from "core/enums/applications";
import { LanguageEnum, LanguageValues } from "core/enums/language";
import {
	TemplateFieldTypeEnum,
	TemplateFieldTypeValues,
} from "core/enums/template-field-type";

import { Limits } from "v1/config/limits";

describe("TemplateService > crerate > validate", () => {
	const validContent =
		"<!DOCTYPE html><html><head><title>Title</title></head><body><h1>Hello Word</h1></body></html>";

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate("" as unknown as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error without application", async () => {
		let result;

		try {
			await validate({
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
					},
				],
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["application is a required field"],
		});
	});

	it("should throw an error with invalid application type", async () => {
		let result;

		try {
			await validate({
				application: 123 as any,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"application must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid application", async () => {
		let result;

		try {
			await validate({
				application: "123" as any,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`application must be one of the following values: ${ApplicationValues().join(
					", ",
				)}`,
			],
		});
	});

	it("should throw an error without code", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["code is a required field"],
		});
	});

	it("should throw an error with invalid code type", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: 123 as any,
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["code must be a `string` type, but the final value was: `123`."],
		});
	});

	it(`should throw an error with invalid code (length < ${Limits.template.code.min})`, async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "".padStart(Limits.template.code.min - 1, "a"),
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [`code must be at least ${Limits.template.code.min} characters`],
		});
	});

	it(`should throw an error with invalid code (length > ${Limits.template.code.max})`, async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "".padStart(Limits.template.code.max + 1, "a"),
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [`code must be at most ${Limits.template.code.max} characters`],
		});
	});

	it("should throw an error without fields", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["fields is a required field"],
		});
	});

	it("should throw an error with invalid fields type", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: 123 as any,
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"fields must be a `array` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with empty fields", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["fields field must have at least 1 items"],
		});
	});

	it("should throw an error with invalid fields content", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [123 as any],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"fields[0] must be a `object` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without fields[0].field", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					} as any,
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["fields[0].field is a required field"],
		});
	});

	it("should throw an error with invalid fields[0].field type", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: 123 as any,
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"fields[0].field must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it(`should throw an error with invalid fields[0].field (length < ${Limits.templateField.field.min})`, async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "".padStart(Limits.templateField.field.min - 1, "a"),
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`fields[0].field must be at least ${Limits.templateField.field.min} characters`,
			],
		});
	});

	it(`should throw an error with invalid fields[0].field (length > ${Limits.templateField.field.max})`, async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "".padStart(Limits.templateField.field.max + 1, "a"),
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`fields[0].field must be at most ${Limits.templateField.field.max} characters`,
			],
		});
	});

	it("should throw an error without fields[0].description", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
					} as any,
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["fields[0].description is a required field"],
		});
	});

	it("should throw an error with invalid fields[0].description type", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: 123 as any,
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"fields[0].description must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it(`should throw an error with invalid fields[0].description (length < ${Limits.templateField.description.min})`, async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "".padStart(
							Limits.templateField.description.min - 1,
							"a",
						),
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`fields[0].description must be at least ${Limits.templateField.description.min} characters`,
			],
		});
	});

	it(`should throw an error with invalid fields[0].description (length > ${Limits.templateField.description.max})`, async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "".padStart(
							Limits.templateField.description.max + 1,
							"a",
						),
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`fields[0].description must be at most ${Limits.templateField.description.max} characters`,
			],
		});
	});

	it("should throw an error without fields[0].type", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						description: "foo bar foo bar",
					} as any,
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["fields[0].type is a required field"],
		});
	});

	it("should throw an error with invalid fields[0].type type", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: 123 as any,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"fields[0].type must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid fields[0].type", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: "123" as any,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`fields[0].type must be one of the following values: ${TemplateFieldTypeValues().join(
					", ",
				)}`,
			],
		});
	});

	it("should throw an error without contents", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
			} as CreateParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["contents is a required field"],
		});
	});

	it("should throw an error with invalid contents type", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"contents must be a `array` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with empty contents", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["contents field must have at least 1 items"],
		});
	});

	it("should throw an error with invalid contents content", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [123 as any],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"contents[0] must be a `object` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error without contents[0].content", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						subject: "foo",
					} as any,
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["contents[0].content is a required field"],
		});
	});

	it("should throw an error with invalid contents[0].content type", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: 123 as any,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"contents[0].content must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it(`should throw an error with invalid contents[0].content (length < ${Limits.templateContent.content.min})`, async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: "".padStart(Limits.templateContent.content.min - 1, "a"),
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`contents[0].content must be at least ${Limits.templateContent.content.min} characters`,
			],
		});
	});

	it(`should throw an error with invalid contents[0].content (length > ${Limits.templateContent.content.max})`, async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: "".padStart(Limits.templateContent.content.max + 1, "a"),
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`contents[0].content must be at most ${Limits.templateContent.content.max} characters`,
			],
		});
	});

	it("should throw an error without contents[0].subject", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
					} as any,
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["contents[0].subject is a required field"],
		});
	});

	it("should throw an error with invalid contents[0].subject type", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: 123 as any,
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"contents[0].subject must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it(`should throw an error with invalid contents[0].subject (length < ${Limits.templateContent.subject.min})`, async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "".padStart(Limits.templateContent.subject.min - 1, "a"),
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`contents[0].subject must be at least ${Limits.templateContent.subject.min} characters`,
			],
		});
	});

	it(`should throw an error with invalid contents[0].subject (length > ${Limits.templateContent.subject.max})`, async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: LanguageEnum.EN,
						content: validContent,
						subject: "".padStart(Limits.templateContent.subject.max + 1, "a"),
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`contents[0].subject must be at most ${Limits.templateContent.subject.max} characters`,
			],
		});
	});

	it("should throw an error without contents[0].langage", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						content: validContent,
						subject: "foo",
					} as any,
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["contents[0].language is a required field"],
		});
	});

	it("should throw an error with invalid contents[0].language type", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: 123 as any,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"contents[0].language must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid contents[0].language", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				code: "example.template",
				fields: [
					{
						field: "example",
						type: TemplateFieldTypeEnum.STRING,
						description: "foo bar foo bar",
					},
				],
				contents: [
					{
						language: "123" as any,
						content: validContent,
						subject: "foo",
					},
				],
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`contents[0].language must be one of the following values: ${LanguageValues().join(
					", ",
				)}`,
			],
		});
	});
});
