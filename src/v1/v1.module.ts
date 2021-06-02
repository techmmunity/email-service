import { Module } from "@nestjs/common";

import { Api } from "./api";

import { EmailModule } from "./api/email/email.module";

import { PostgresConnect } from "v1/config/postgres";

@Module({
	imports: [PostgresConnect, ...Api, EmailModule],
})
export class V1Module {
	//
}
