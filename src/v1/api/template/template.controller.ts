import { Body, Controller, Post } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiTags,
} from "@nestjs/swagger";

import { TemplateService } from "./template.service";

import { CreateTemplateBadRequestSchema } from "./service/create/schemas/bad-request.schema";
import { CreateTemplateConflictSchema } from "./service/create/schemas/conflict.schema";
import { CreateTemplateInputSchema } from "./service/create/schemas/input.schema";
import { CreateTemplateOutputSchema } from "./service/create/schemas/output.schema";

import { ApiConfig } from "v1/config";

@ApiTags("Template")
@Controller(`${ApiConfig.version} - template`)
export class TemplateController {
	public constructor(private readonly TemplateService: TemplateService) {
		//
	}

	@Post()
	@ApiCreatedResponse({
		type: CreateTemplateOutputSchema,
	})
	@ApiBadRequestResponse({
		type: CreateTemplateBadRequestSchema,
	})
	@ApiConflictResponse({
		type: CreateTemplateConflictSchema,
	})
	public create(@Body() params: CreateTemplateInputSchema) {
		return this.TemplateService.create(params);
	}
}
