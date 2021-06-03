import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

import { TemplateService } from "../template/template.service";

import { send, SendParams } from "./service/send";

@Injectable()
export class EmailService {
	public constructor(
		private readonly templateService: TemplateService,
		private readonly mailerService: MailerService,
	) {}

	public send(params: SendParams) {
		return send(
			{
				templateService: this.templateService,
				mailerService: this.mailerService,
			},
			params,
		);
	}
}
