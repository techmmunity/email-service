import { SendParams } from "v1/api/email/service/send";

import { validate } from "v1/api/email/service/send/validate";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

import { ApplicationEnum, ApplicationValues } from "core/enums/applications";
import { LanguageEnum, LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

describe("EmailService > send > validate", () => {
	const receiverEmail = "foo@bar.com";
	const templateCode = "example.template";

	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				receiverEmail,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName: "Renato Razal",
				},
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should do nothing with valid params (empty extraData)", async () => {
		let result;

		try {
			await validate({
				receiverEmail,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {},
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate("" as unknown as SendParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [InvalidParamsErrorMessage],
		});
	});

	it("should throw an error without receiverEmail", async () => {
		let result;

		try {
			await validate({
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName: "Renato Razal",
				},
			} as any);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["receiverEmail is a required field"],
		});
	});

	it("should throw an error with invalid receiverEmail type", async () => {
		let result;

		try {
			await validate({
				receiverEmail: 123 as any,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName: "Renato Razal",
				},
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"receiverEmail must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid receiverEmail", async () => {
		let result;

		try {
			await validate({
				receiverEmail: "123",
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName: "Renato Razal",
				},
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["receiverEmail must be a valid email"],
		});
	});

	it("should throw an error without templateCode", async () => {
		let result;

		try {
			await validate({
				receiverEmail,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName: "Renato Razal",
				},
			} as any);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["templateCode is a required field"],
		});
	});

	it("should throw an error with invalid templateCode type", async () => {
		let result;

		try {
			await validate({
				templateCode: 123 as any,
				receiverEmail,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName: "Renato Razal",
				},
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"templateCode must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it(`should throw an error with invalid templateCode (length < ${Limits.template.code.min})`, async () => {
		let result;

		try {
			await validate({
				templateCode: "".padStart(Limits.template.code.min - 1, "a"),
				receiverEmail,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName: "Renato Razal",
				},
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`templateCode must be at least ${Limits.template.code.min} characters`,
			],
		});
	});

	it(`should throw an error with invalid templateCode (length > ${Limits.template.code.max})`, async () => {
		let result;

		try {
			await validate({
				templateCode: "".padStart(Limits.template.code.max + 1, "a"),
				receiverEmail,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName: "Renato Razal",
				},
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				`templateCode must be at most ${Limits.template.code.max} characters`,
			],
		});
	});

	it("should throw an error without language", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				receiverEmail,
				templateCode,
				extraData: {
					userName: "Renato Razal",
				},
			} as any);
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
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				receiverEmail,
				templateCode,
				extraData: {
					userName: "Renato Razal",
				},
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
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				receiverEmail,
				templateCode,
				extraData: {
					userName: "Renato Razal",
				},
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
				language: LanguageEnum.EN,
				receiverEmail,
				templateCode,
				extraData: {
					userName: "Renato Razal",
				},
			} as any);
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
				language: LanguageEnum.EN,
				receiverEmail,
				templateCode,
				extraData: {
					userName: "Renato Razal",
				},
				application: 123 as any,
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
				language: LanguageEnum.EN,
				receiverEmail,
				templateCode,
				extraData: {
					userName: "Renato Razal",
				},
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

	it("should throw an error without extraData", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				receiverEmail,
				templateCode,
			} as SendParams);
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["extraData is a required field"],
		});
	});

	it("should throw an error with invalid extraData type (number)", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				receiverEmail,
				templateCode,
				extraData: 123 as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"extraData must be a `object` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw an error with invalid extraData type (array)", async () => {
		let result;

		try {
			await validate({
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				receiverEmail,
				templateCode,
				extraData: [] as any,
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"extraData must be a `object` type, but the final value was: `[]`.",
			],
		});
	});
});
