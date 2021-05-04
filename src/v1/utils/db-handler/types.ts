import { ErrorUtil } from "../error";

import { DbErrorEnum } from "core/enums/db-error";

export interface DbComplexErrorMessage {
	table: string;
	columns: Array<string>;
	message: (values: Array<string>) => string;
	error: DbErrorEnum;
	handleWith: keyof typeof ErrorUtil;
	validate?: (value: string) => boolean | Promise<boolean>;
}
