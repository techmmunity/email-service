export const LIMITS = {
	ids: {
		uuid: {
			length: 36,
		},
	},
	template: {
		code: {
			min: 3,
			max: 25,
		},
	},
	templateField: {
		field: {
			min: 3,
			max: 50,
		},
		description: {
			min: 5,
			max: 1000,
		},
	},
	templateContent: {
		content: {
			min: 3,
			max: 25000,
		},
		subject: {
			min: 3,
			max: 100,
		},
	},
};
