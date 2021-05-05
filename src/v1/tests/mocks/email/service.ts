import { MailerService } from "@nestjs-modules/mailer";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { TemplateMock } from "../template";

import { EmailService } from "v1/api/email/email.service";
import { TemplateService } from "v1/api/template/template.service";

import { TemplateEntity } from "v1/api/template/entities/template.entity";

export const service = (
	mailerService: Record<string, jest.Mock<any, any>>,
) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			EmailService,
			TemplateService,
			{
				provide: MailerService,
				useValue: mailerService,
			},
			{
				provide: getRepositoryToken(TemplateEntity),
				useValue: TemplateMock.repository,
			},
		],
	}).compile();

	return module.get<EmailService>(EmailService);
};
