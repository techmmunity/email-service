import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

import { TemplateService } from "../template/template.service";

import { send, SendParams } from "./service/send";

@Injectable()
export class EmailService {
	public constructor(
		private readonly TemplateService: TemplateService,
		private readonly MailerService: MailerService,
	) {
		//
	}

	public send(params: SendParams) {
		return send(
			{
				TemplateService: this.TemplateService,
				MailerService: this.MailerService,
			},
			params,
		);
	}
}
