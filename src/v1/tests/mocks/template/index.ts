import { makeMockRepository } from "../repository";
import { doc } from "./doc";

import { service } from "./service";

const repository = makeMockRepository();

export const templateMock = {
	doc,
	repository,
	service: service(repository),
};
