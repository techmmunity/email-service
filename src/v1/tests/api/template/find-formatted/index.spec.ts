import { TemplateService } from "v1/api/template/template.service";

import { ApplicationEnum } from "core/enums/applications";
import { LanguageEnum } from "core/enums/language";
import { TemplateFieldTypeEnum } from "core/enums/template-field-type";

import { templateMock } from "v1/tests/mocks/template";
import { templateContentMock } from "v1/tests/mocks/template-content";
import { templateFieldMock } from "v1/tests/mocks/template-field";

describe("TemplateService > findFormatted", () => {
	let service: TemplateService;

	const code = "example.template";

	beforeAll(async () => {
		service = await templateMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should find template with valid params", async () => {
		const templateDoc = templateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code,
		});
		const templateFieldDoc = templateFieldMock.doc({
			templateId: templateDoc.id,
			field: "example",
			type: TemplateFieldTypeEnum.STRING,
			description: "foo bar foo bar",
		});
		const templateContentDoc = templateContentMock.doc({
			templateId: templateDoc.id,
			language: LanguageEnum.EN,
			content:
				"<!DOCTYPE html><html><head><title>Title</title><style>h1 { padding: 1px; }</style></head><body><h1></h1></body></html>",
			subject: "foo",
		});

		templateMock.repository.findOne.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});

		let result;

		try {
			result = await service.findFormatted({
				code,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
			});
		} catch (e) {
			result = e;
		}

		expect(templateMock.repository.findOne).toBeCalledTimes(1);
		expect(result).toStrictEqual({
			fields: [
				{
					field: templateFieldDoc.field,
					type: templateFieldDoc.type,
				},
			],
			subject: "foo",
			content:
				'<!DOCTYPE html><html><head><title>Title</title></head><body><h1 style="padding: 1px;"></h1></body></html>',
		});
	});

	it("should throw error if template not exists", async () => {
		templateMock.repository.findOne.mockResolvedValue(undefined);

		let result;

		try {
			result = await service.findFormatted({
				code: "non.existent.template",
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
			});
		} catch (err) {
			result = err;
		}

		expect(templateMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toStrictEqual({
			errors: ["Template not found"],
		});
	});

	it("should throw error if content with selected language not exists", async () => {
		const templateDoc = templateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code,
		});
		const templateFieldDoc = templateFieldMock.doc({
			templateId: templateDoc.id,
			field: "example",
			type: TemplateFieldTypeEnum.STRING,
			description: "foo bar foo bar",
		});

		templateMock.repository.findOne.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [],
		});

		let result;

		try {
			result = await service.findFormatted({
				code: "non.existent.template",
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
			});
		} catch (err) {
			result = err;
		}

		expect(templateMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(404);
		expect(result.response).toStrictEqual({
			errors: [`Template content with language "${LanguageEnum.EN}" not found`],
		});
	});
});
