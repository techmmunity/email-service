interface ReplaceDataParams {
	extraData: Record<string, any>;
	string: string;
}

export const replaceData = ({ extraData, string }: ReplaceDataParams) => {
	const arrayKeyValue = Object.entries(extraData);

	return arrayKeyValue.reduce((acc, [field, value]) => {
		const delimiterPrefix = "{{";
		const delimiterSulfix = "}}";

		// This is proposital, due simplification to better understanding
		const expression = [delimiterPrefix, field, delimiterSulfix].join("");

		const regExp = new RegExp(expression, "g");

		return acc.replace(regExp, value);
	}, string);
};
