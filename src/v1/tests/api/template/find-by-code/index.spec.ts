import { TemplateService } from "v1/api/template/template.service";

import { ApplicationEnum } from "core/enums/applications";
import { LanguageEnum } from "core/enums/language";

import { TemplateMock } from "v1/tests/mocks/template";
import { TemplateContentMock } from "v1/tests/mocks/template-content";
import { TemplateFieldMock } from "v1/tests/mocks/template-field";

describe("TemplateService > findByCode", () => {
	let service: TemplateService;

	beforeAll(async () => {
		service = await TemplateMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should find template with valid params", async () => {
		const templateDoc = TemplateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code: "example.template",
		});
		const templateFieldDoc = TemplateFieldMock.doc({
			templateId: templateDoc.id,
			field: "example",
			descripion: "foo bar foo bar",
		});
		const templateContentDoc = TemplateContentMock.doc({
			templateId: templateDoc.id,
			language: LanguageEnum.EN,
			content: "foo",
		});

		TemplateMock.repository.findOne.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});

		let result;

		try {
			result = await service.findByCode({
				code: "example.template",
			});
		} catch (e) {
			result = e;
		}

		expect(TemplateMock.repository.findOne).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});
	});

	it("should throw error if template not exists", async () => {
		TemplateMock.repository.findOne.mockResolvedValue(undefined);

		let result;

		try {
			result = await service.findByCode({
				code: "non.existent.template",
			});
		} catch (err) {
			result = err;
		}

		expect(TemplateMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toStrictEqual({
			errors: ["Template not found"],
		});
	});
});
