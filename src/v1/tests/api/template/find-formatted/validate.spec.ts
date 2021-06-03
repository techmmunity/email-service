import { FindFormattedParams } from "v1/api/template/service/find-formatted";

import { validate } from "v1/api/template/service/find-formatted/validate";

import { invalidParamsErrorMessage } from "v1/utils/yup";

import { ApplicationEnum, ApplicationValues } from "core/enums/applications";
import { LanguageEnum, LanguageValues } from "core/enums/language";

import { LIMITS } from "v1/config/limits";

describe("TemplateService > findFormatted > validate", () => {
	const code = "example.code";

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				code,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
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
			await validate("" as unknown as FindFormattedParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [invalidParamsErrorMessage],
		});
	});

	it("should throw an error without code", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
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
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
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

	it(`should throw an error with invalid code (length < ${LIMITS.template.code.min})`, async () => {
		let result;

		try {
			await validate({
				code: "".padStart(LIMITS.template.code.min - 1, "a"),
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [`code must be at least ${LIMITS.template.code.min} characters`],
		});
	});

	it(`should throw an error with invalid code (length > ${LIMITS.template.code.max})`, async () => {
		let result;

		try {
			await validate({
				code: "".padStart(LIMITS.template.code.max + 1, "a"),
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [`code must be at most ${LIMITS.template.code.max} characters`],
		});
	});

	it("should throw an error without language", async () => {
		let result;

		try {
			await validate({
				code,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
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
				code,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
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
				code,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
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

	it("should throw an error without application", async () => {
		let result;

		try {
			await validate({
				code,
				language: LanguageEnum.EN,
			} as FindFormattedParams);
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
				code,
				application: 123 as any,
				language: LanguageEnum.EN,
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
				code,
				language: LanguageEnum.EN,
				application: "123" as any,
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
});
