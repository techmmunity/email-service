import { FindByCodeParams } from "v1/api/template/service/find-by-code";
import { validate } from "v1/api/template/service/find-by-code/validate";

import { InvalidParamsErrorMessage } from "v1/utils/yup";

describe("TemplateService > findByCode > validate", () => {
	it("should do nothing with valid params", async () => {
		let result;

		try {
			await validate({
				code: "example.code",
			});
		} catch (e) {
			result = e;
		}

		expect(result).toBeUndefined();
	});

	it("should throw an error with invalid params", async () => {
		let result;

		try {
			await validate(("" as unknown) as FindByCodeParams);
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
			await validate({} as FindByCodeParams);
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
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["code must be a `string` type, but the final value was: `123`."],
		});
	});

	it("should throw an error with invalid code (length < 3)", async () => {
		let result;

		try {
			await validate({
				code: "fo",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["code must be at least 3 characters"],
		});
	});

	it("should throw an error with invalid code (length > 25)", async () => {
		let result;

		try {
			await validate({
				code: "foo.bar.foo.bar.foo.bar.foo.bar.foo.bar.foo.bar",
			});
		} catch (e) {
			result = e;
		}

		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["code must be at most 25 characters"],
		});
	});
});
