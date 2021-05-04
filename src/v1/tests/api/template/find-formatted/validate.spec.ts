import { FindFormattedParams } from "v1/api/template/service/find-formatted";

import { validate } from "v1/api/template/service/find-formatted/validate";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { LanguageEnum, LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

describe("TemplateService > findFormatted > validate", () => {
	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				code: "example.code",
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as FindFormattedParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error without code", async () => {
		let result;

		try {
			await validate({
				language: LanguageEnum.EN,
			} as FindFormattedParams);
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
				code: 123 as any,
				language: LanguageEnum.EN,
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
				code: "".padStart(Limits.template.code.min - 1, "a"),
				language: LanguageEnum.EN,
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
				code: "".padStart(Limits.template.code.max + 1, "a"),
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [`code must be at most ${Limits.template.code.max} characters`],
		});
	});

	it("should throw an error without language", async () => {
		let result;

		try {
			await validate({
				code: "example.code",
			} as FindFormattedParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["language is a required field"],
		});
	});

	it("should throw an error with invalid language type", async () => {
		let result;

		try {
			await validate({
				code: "example.code",
				language: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"language must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid language", async () => {
		let result;

		try {
			await validate({
				code: "example.code",
				language: "123" as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`language must be one of the following values: ${LanguageValues().join(
					", ",
				)}`,
			],
		});
	});
});
