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

<<<<<<< HEAD
@ApiTags(`${ApiConfig.version} - Template`)
=======
@ApiTags(`${ApiConfig.version} - template`)
>>>>>>> 1010b2a46a34eeb5fb1e3777dda01bfe8fe62c89
@Controller(`${ApiConfig.version}/template`)
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
