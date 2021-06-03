import { service } from "./service";

const mailerService = {
	sendMail: jest.fn(),
};

export const emailMock = {
	service: service(mailerService),
	mailerService,
};
