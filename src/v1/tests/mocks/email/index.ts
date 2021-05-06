import { service } from "./service";

const mailerService = {
	sendMail: jest.fn(),
};

export const EmailMock = {
	service: service(mailerService),
	mailerService,
};
