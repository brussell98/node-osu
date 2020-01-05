const Constants = require('../Constants.js')

/**
 * A multiplayer game score
 * @prop {String} slots
 * @prop {String} team
 * @prop {String} userId
 * @prop {String} score
 * @prop {String} maxCombo
 * @prop {Null} rank
 * @prop {Object} counts
 * @prop {String} counts.300
 * @prop {String} counts.100
 * @prop {String} counts.50
 * @prop {String} counts.geki
 * @prop {String} counts.katu
 * @prop {String} counts.miss
 * @prop {Boolean} perfect
 * @prop {Boolean} pass
 * @prop {String} raw_mods
 * @prop {String[]} mods
 */
class MultiplayerScore {
	constructor(data) {
		this.slot = data.slot;
		this.team = Constants.Multiplayer.team[data.team];
		this.userId = +data.user_id;
		this.score = +data.score;
		this.maxCombo = data.maxcombo;

		this.rank = null; // Not used
		this.counts = {
			'300': +data.count300,
			'100': +data.count100,
			'50': +data.count50,
			'geki': +data.countgeki,
			'katu': +data.countkatu,
			'miss': +data.countmiss
		};
		this.perfect = data.perfect === '1';
		this.pass = data.pass === '1';
		this.raw_mods = data.enabled_mods || '0';
	}

	get mods() {
		if (this._mods !== undefined)
			return this._mods;

		this._mods = [];
		for (let mod in Constants.Mods)
			if (this.raw_mods & Constants.Mods[mod])
				this._mods.push(mod);


		return this._mods;
	}
}

module.exports = MultiplayerScore;
