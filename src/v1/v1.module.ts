import { Module } from "@nestjs/common";

import { Api } from "./api";

import { PostgresConnect } from "v1/config/postgres";
import { EmailModule } from './api/email/email.module';

@Module({
	imports: [PostgresConnect, ...Api, EmailModule],
})
export class V1Module {
	//
}
