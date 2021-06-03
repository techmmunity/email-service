import { EmailService } from "v1/api/email/email.service";

import { ApplicationEnum } from "core/enums/applications";
import { LanguageEnum } from "core/enums/language";
import { TemplateFieldTypeEnum } from "core/enums/template-field-type";

import { emailMock } from "v1/tests/mocks/email";
import { templateMock } from "v1/tests/mocks/template";
import { templateContentMock } from "v1/tests/mocks/template-content";
import { templateFieldMock } from "v1/tests/mocks/template-field";

describe("EmailService > create", () => {
	let service: EmailService;

	const receiverEmail = "foo@bar.com";
	const templateCode = "example.template";
	const description = "foo bar foo bar";
	const userName = "Renato Razal";
	const content =
		"<!DOCTYPE html><html><head><title>Title</title><style>h1 { padding: 1px; }</style></head><body><h1>{{userName}}</h1></body></html>";

	beforeAll(async () => {
		service = await emailMock.service();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should send an email with valid params", async () => {
		const templateDoc = templateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code: templateCode,
		});
		const templateFieldDoc = templateFieldMock.doc({
			templateId: templateDoc.id,
			field: "userName",
			type: TemplateFieldTypeEnum.STRING,
			description,
		});
		const templateContentDoc = templateContentMock.doc({
			templateId: templateDoc.id,
			language: LanguageEnum.EN,
			content,
			subject: "foo",
		});

		templateMock.repository.findOne.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});

		let result;

		try {
			result = await service.send({
				receiverEmail,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName,
				},
			});
		} catch (e) {
			result = e;
		}

		expect(templateMock.repository.findOne).toBeCalledTimes(1);
		expect(result).toBeUndefined();
		expect(emailMock.mailerService.sendMail).toBeCalledWith({
			subject: "foo",
			to: receiverEmail,
			html: '<!DOCTYPE html><html><head><title>Title</title></head><body><h1 style="padding: 1px;">Renato Razal</h1></body></html>',
		});
	});

	it("should send an email with valid params (none template fields)", async () => {
		const templateDoc = templateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code: templateCode,
		});
		const templateContentDoc = templateContentMock.doc({
			templateId: templateDoc.id,
			language: LanguageEnum.EN,
			content:
				"<!DOCTYPE html><html><head><title>Title</title><style>h1 { padding: 1px; }</style></head><body><h1>Hello World</h1></body></html>",
			subject: "foo",
		});

		templateMock.repository.findOne.mockResolvedValue({
			...templateDoc,
			fields: [],
			contents: [templateContentDoc],
		});

		let result;

		try {
			result = await service.send({
				receiverEmail,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {},
			});
		} catch (e) {
			result = e;
		}

		expect(templateMock.repository.findOne).toBeCalledTimes(1);
		expect(result).toBeUndefined();
		expect(emailMock.mailerService.sendMail).toBeCalledWith({
			subject: "foo",
			to: receiverEmail,
			html: '<!DOCTYPE html><html><head><title>Title</title></head><body><h1 style="padding: 1px;">Hello World</h1></body></html>',
		});
	});

	it("should throw error if template not exists", async () => {
		templateMock.repository.findOne.mockResolvedValue(undefined);

		let result;

		try {
			result = await service.send({
				receiverEmail,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName,
				},
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
			code: templateCode,
		});
		const templateFieldDoc = templateFieldMock.doc({
			templateId: templateDoc.id,
			field: "example",
			type: TemplateFieldTypeEnum.STRING,
			description,
		});

		templateMock.repository.findOne.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [],
		});

		let result;

		try {
			result = await service.send({
				receiverEmail,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName,
				},
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

	it("should throw error without extraData field", async () => {
		const templateDoc = templateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code: templateCode,
		});
		const templateFieldDoc = templateFieldMock.doc({
			templateId: templateDoc.id,
			field: "userName",
			type: TemplateFieldTypeEnum.EMAIL,
			description,
		});
		const templateContentDoc = templateContentMock.doc({
			templateId: templateDoc.id,
			language: LanguageEnum.EN,
			content,
			subject: "foo",
		});

		templateMock.repository.findOne.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});

		let result;

		try {
			result = await service.send({
				receiverEmail,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {},
			});
		} catch (e) {
			result = e;
		}

		expect(templateMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["userName is a required field"],
		});
	});

	it("should throw error with invalid extraData field type", async () => {
		const templateDoc = templateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code: templateCode,
		});
		const templateFieldDoc = templateFieldMock.doc({
			templateId: templateDoc.id,
			field: "userName",
			type: TemplateFieldTypeEnum.EMAIL,
			description,
		});
		const templateContentDoc = templateContentMock.doc({
			templateId: templateDoc.id,
			language: LanguageEnum.EN,
			content,
			subject: "foo",
		});

		templateMock.repository.findOne.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});

		let result;

		try {
			result = await service.send({
				receiverEmail,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName: 123,
				},
			});
		} catch (e) {
			result = e;
		}

		expect(templateMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"userName must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw error with invalid extraData field (email)", async () => {
		const templateDoc = templateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code: templateCode,
		});
		const templateFieldDoc = templateFieldMock.doc({
			templateId: templateDoc.id,
			field: "userName",
			type: TemplateFieldTypeEnum.EMAIL,
			description,
		});
		const templateContentDoc = templateContentMock.doc({
			templateId: templateDoc.id,
			language: LanguageEnum.EN,
			content,
			subject: "foo",
		});

		templateMock.repository.findOne.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});

		let result;

		try {
			result = await service.send({
				receiverEmail,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName: "123",
				},
			});
		} catch (e) {
			result = e;
		}

		expect(templateMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["userName must be a valid email"],
		});
	});

	it("should throw error with invalid extraData field (uuid)", async () => {
		const templateDoc = templateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code: templateCode,
		});
		const templateFieldDoc = templateFieldMock.doc({
			templateId: templateDoc.id,
			field: "userId",
			type: TemplateFieldTypeEnum.UUID,
			description,
		});
		const templateContentDoc = templateContentMock.doc({
			templateId: templateDoc.id,
			language: LanguageEnum.EN,
			content:
				"<!DOCTYPE html><html><head><title>Title</title><style>h1 { padding: 1px; }</style></head><body><h1>{{userId}}</h1></body></html>",
			subject: "foo",
		});

		templateMock.repository.findOne.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});

		let result;

		try {
			result = await service.send({
				receiverEmail,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userId: "123",
				},
			});
		} catch (e) {
			result = e;
		}

		expect(templateMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: ["userId must be a valid UUID"],
		});
	});

	it("should throw error with invalid extraData field (string)", async () => {
		const templateDoc = templateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code: templateCode,
		});
		const templateFieldDoc = templateFieldMock.doc({
			templateId: templateDoc.id,
			field: "userName",
			type: TemplateFieldTypeEnum.STRING,
			description,
		});
		const templateContentDoc = templateContentMock.doc({
			templateId: templateDoc.id,
			language: LanguageEnum.EN,
			content,
			subject: "foo",
		});

		templateMock.repository.findOne.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});

		let result;

		try {
			result = await service.send({
				receiverEmail,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userName: 123,
				},
			});
		} catch (e) {
			result = e;
		}

		expect(templateMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				"userName must be a `string` type, but the final value was: `123`.",
			],
		});
	});

	it("should throw error with invalid extraData field (number)", async () => {
		const templateDoc = templateMock.doc({
			application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
			code: templateCode,
		});
		const templateFieldDoc = templateFieldMock.doc({
			templateId: templateDoc.id,
			field: "userAge",
			type: TemplateFieldTypeEnum.NUMBER,
			description,
		});
		const templateContentDoc = templateContentMock.doc({
			templateId: templateDoc.id,
			language: LanguageEnum.EN,
			content:
				"<!DOCTYPE html><html><head><title>Title</title><style>h1 { padding: 1px; }</style></head><body><h1>{{userAge}}</h1></body></html>",
			subject: "foo",
		});

		templateMock.repository.findOne.mockResolvedValue({
			...templateDoc,
			fields: [templateFieldDoc],
			contents: [templateContentDoc],
		});

		let result;

		try {
			result = await service.send({
				receiverEmail,
				templateCode,
				application: ApplicationEnum.UNIQUE_LOGIN_SYSTEM,
				language: LanguageEnum.EN,
				extraData: {
					userAge: "123",
				},
			});
		} catch (e) {
			result = e;
		}

		expect(templateMock.repository.findOne).toBeCalledTimes(1);
		expect(result.status).toBe(400);
		expect(result.response).toMatchObject({
			errors: [
				'userAge must be a `number` type, but the final value was: `"123"`.',
			],
		});
	});
});
