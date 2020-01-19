const { getNumeric } = require('../utils.js');
const Constants = require('../Constants.js');

/**
 * A multiplayer game score
 * @prop {String|Number} slot
 * @prop {String} team
 * @prop {String} userId
 * @prop {String|Number} score
 * @prop {String|Number} maxCombo
 * @prop {Null} rank
 * @prop {Object} counts
 * @prop {String|Number} counts.300
 * @prop {String|Number} counts.100
 * @prop {String|Number} counts.50
 * @prop {String|Number} counts.geki
 * @prop {String|Number} counts.katu
 * @prop {String|Number} counts.miss
 * @prop {Boolean} perfect
 * @prop {Boolean} pass
 * @prop {Number} raw_mods
 * @prop {String[]} mods
 */
class MultiplayerScore {
	constructor(config, data) {
		const num = getNumeric(config.parseNumeric);

		this.slot = num(data.slot);
		this.team = Constants.Multiplayer.team[data.team];
		this.userId = data.user_id;
		this.score = num(data.score);
		this.maxCombo = num(data.maxcombo);
		this.rank = null; // Not used
		this.counts = {
			'300': num(data.count300),
			'100': num(data.count100),
			'50': num(data.count50),
			'geki': num(data.countgeki),
			'katu': num(data.countkatu),
			'miss': num(data.countmiss)
		};
		this.perfect = data.perfect === '1';
		this.pass = data.pass === '1';
		this.raw_mods = parseInt(data.enabled_mods || '0');
	}

	get mods() {
		if (this._mods !== undefined)
			return this._mods;

		this._mods = [];
		for (const mod in Constants.Mods)
			if (this.raw_mods & Constants.Mods[mod])
				this._mods.push(mod);


		return this._mods;
	}
}

module.exports = MultiplayerScore;
