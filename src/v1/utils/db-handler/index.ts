import { ErrorUtil } from "../error";

import { DbComplexErrorMessage } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Error = any;

const getValues = (err: Error): Array<string> =>
	err.detail // Key (application, code)=(UNIQUE_LOGIN_SYSTEM, example) already exists.
		.match(/\((.*?)\)/g) // ["(application, code)", "(UNIQUE_LOGIN_SYSTEM, example)"]
		?.pop() // "(UNIQUE_LOGIN_SYSTEM, example)"
		?.replace("(", "") // "UNIQUE_LOGIN_SYSTEM, example)"
		?.replace(")", "") // "UNIQUE_LOGIN_SYSTEM, example"
		?.split(", "); // ["UNIQUE_LOGIN_SYSTEM", "example"]

const isCorrectCode = (err: Error, handler: DbComplexErrorMessage) =>
	err.code === handler.error;

const isCorrectTable = (err: Error, handler: DbComplexErrorMessage) =>
	err.table === handler.table;

const isCorrectColumns = (err: Error, handler: DbComplexErrorMessage) =>
	handler.columns.every(column => err.detail.includes(column));

const passesValidation = async (err: Error, handler: DbComplexErrorMessage) => {
	const { validate } = handler;

	if (!validate) return true;

	const fieldValues = getValues(err);

	if (fieldValues.length < 1) return false;

	return fieldValues.every(fieldValue => validate(fieldValue));
};

export const DbHandler = (handlers: Array<DbComplexErrorMessage>) => (
	err: Error,
) => {
	const handler = handlers.find(
		async handler =>
			isCorrectCode(err, handler) &&
			isCorrectTable(err, handler) &&
			isCorrectColumns(err, handler) &&
			passesValidation(err, handler),
	);

	const fieldValues = getValues(err);

	return handler
		? ErrorUtil[handler.handleWith]([handler.message(fieldValues)])
		: ErrorUtil.badGateway([err.message]);
};
