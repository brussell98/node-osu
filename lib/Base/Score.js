const { Mods, AccuracyMethods } = require('../Constants.js');

/**
 * A score for a beatmap
 * @prop {String} score
 * @prop {Object} user
 * @prop {String} user.name
 * @prop {String} user.id
 * @prop {?String} beatmapId
 * @prop {Object} counts
 * @prop {String} counts.300
 * @prop {String} counts.100
 * @prop {String} counts.50
 * @prop {String} counts.geki
 * @prop {String} counts.katu
 * @prop {String} counts.miss
 * @prop {String} maxCombo
 * @prop {Boolean} perfect
 * @prop {String} raw_date
 * @prop {String} rank
 * @prop {String?} pp
 * @prop {Boolean} hasReplay
 * @prop {String} raw_mods bitwise representation of mods used
 * @prop {?Beatmap} beatmap
 * @prop {Date} date
 * @prop {String[]} mods
 * @prop {Number|undefined} accuracy The score's accuracy, if beatmap is defined, otherwise undefined
 */
class Score {
	constructor(data, beatmap) {
		this.score = data.score;
		this.user = {
			'name': data.username,
			'id': data.user_id
		}
		this.beatmapId = data.beatmap_id || (beatmap ? beatmap.id : null);
		this.counts = {
			'300': data.count300,
			'100': data.count100,
			'50': data.count50,
			'geki': data.countgeki,
			'katu': data.countkatu,
			'miss': data.countmiss
		};
		this.maxCombo = data.maxcombo;
		this.perfect = data.perfect === '1';
		this.raw_date = data.date;
		this.rank = data.rank;
		this.pp = data.pp || null
		this.hasReplay = data.replay_available === '1';

		this.raw_mods = data.enabled_mods;

		this.beatmap = beatmap; // Optional
	}

	get date() {
		if (this._date !== undefined)
			return this._date;

		this._date = new Date(this.raw_date + ' UTC');
		return this._date;
	}

	get mods() {
		if (this._mods !== undefined)
			return this._mods;

		this._mods = [];
		for (const mod in Mods)
			if (this.raw_mods & Mods[mod])
				this._mods.push(mod);

		return this._mods;
	}

	get accuracy() {
		if (!this.beatmap)
			return undefined;

		if (this._accuracy !== undefined)
			return this._accuracy;

		const intCounts = { };
		for (const c in this.counts)
			intCounts[c] = parseInt(this.counts[c], 10);

		this._accuracy = AccuracyMethods[this.beatmap.mode](intCounts);
		return this._accuracy;
	}
}

module.exports = Score;
