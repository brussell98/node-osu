module.exports = {
	getNumeric(parseNumeric) {
		return parseNumeric
			? v => v === undefined || v === null ? v : parseFloat(v)
			: v => v;
	}
};
