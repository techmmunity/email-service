import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";

import { EmailService } from "./email.service";

import { TemplateModule } from "../template/template.module";

import { EmailController } from "./email.controller";

const { EMAIL_EMAIL, EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT } = process.env;

@Module({
	imports: [
		TemplateModule,
		MailerModule.forRoot({
			transport: {
				host: EMAIL_HOST,
				port: parseInt(EMAIL_PORT, 10),
				secure: EMAIL_PORT === "465",
				auth: {
					user: EMAIL_EMAIL,
					pass: EMAIL_PASSWORD,
				},
			},
			defaults: {
				from: `Techmmunity <${EMAIL_EMAIL}>`,
			},
		}),
	],
	controllers: [EmailController],
	providers: [EmailService, TemplateModule],
})
export class EmailModule {
	//
}
