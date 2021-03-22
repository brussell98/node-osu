module.exports = {
	getNumeric(parseNumeric) {
		return parseNumeric
			? v => v === undefined || v === null ? v : parseFloat(v)
			: v => v;
	},

	cleanMods(mods){
		let cleanModsArray = [];
		mods.forEach(element => {
			switch (element) {
				case 'FreeModAllowed':
				case 'ScoreIncreaseMods':
				case 'TouchDevice':
				case 'KeyMod':
				case 'None': element = ''; break;

				case 'NoFail': element = 'NF'; break;
				case 'Easy': element = 'EZ'; break;
				case 'Hidden': element = 'HD'; break;
				case 'HardRock': element = 'HR'; break;
				case 'SuddenDeath': element = 'SD'; break;
				case 'DoubleTime': element = 'DT'; break;
				case 'Relax': element = 'RX'; break;
				case 'HalfTime': element = 'HT'; break;
				case 'Nightcore': element = 'NC'; break;
				case 'Flashlight': element = 'FL'; break;
				case 'SpunOut': element = 'SO'; break;
				case 'Relax2': element = 'AP'; break;
				case 'Perfect': element = 'PF'; break;
				case 'Key1': element = '1K'; break;
				case 'Key2': element = '2K'; break;
				case 'Key3': element = '3K'; break;
				case 'Key4': element = '4K'; break;
				case 'Key5': element = '5K'; break;
				case 'Key6': element = '6K'; break;
				case 'Key7': element = '7K'; break;
				case 'Key8': element = '8K'; break;
				case 'Key9': element = '9K'; break;
				case 'FadeIn': element = 'FI'; break;
				case 'Random': element = 'RD'; break;
				case 'ScoreV2': element = 'ScoreV2'; break;
				case 'Mirror': element = 'MR'; break;
			}
			if (element != '')
				cleanModsArray.push(element);
		});
		return cleanModsArray.length != 0 ? cleanModsArray : '';
	}
};
