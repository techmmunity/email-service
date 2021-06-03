import { Module } from "@nestjs/common";

import { API } from "./api";

import { EmailModule } from "./api/email/email.module";

import { POSTGRES_CONNECT } from "v1/config/postgres";

@Module({
	imports: [POSTGRES_CONNECT, ...API, EmailModule],
})
export class V1Module {}
