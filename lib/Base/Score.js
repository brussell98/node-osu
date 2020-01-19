const { getNumeric } = require('../utils.js');
const { Mods, AccuracyMethods } = require('../Constants.js');

/**
 * A score for a beatmap
 * @prop {String|Number} score
 * @prop {Object} user
 * @prop {?String} user.name Username of the player. Will be null if using a getUserX method
 * @prop {String} user.id
 * @prop {?String} beatmapId
 * @prop {Object} counts
 * @prop {String|Number} counts.300
 * @prop {String|Number} counts.100
 * @prop {String|Number} counts.50
 * @prop {String|Number} counts.geki
 * @prop {String|Number} counts.katu
 * @prop {String|Number} counts.miss
 * @prop {String|Number} maxCombo
 * @prop {Boolean} perfect
 * @prop {String} raw_date
 * @prop {String} rank
 * @prop {?String|?Number} pp
 * @prop {Boolean} hasReplay
 * @prop {Number} raw_mods bitwise representation of mods used
 * @prop {?Beatmap} beatmap
 * @prop {Date} date
 * @prop {String[]} mods
 * @prop {Number|undefined} accuracy The score's accuracy, if beatmap is defined, otherwise undefined
 */
class Score {
	constructor(config, data, beatmap) {
		const num = getNumeric(config.parseNumeric);

		this.score = num(data.score);
		this.user = {
			'name': data.username || null,
			'id': data.user_id
		};
		this.beatmapId = data.beatmap_id || (beatmap ? beatmap.id : null);
		this.counts = {
			'300': num(data.count300),
			'100': num(data.count100),
			'50': num(data.count50),
			'geki': num(data.countgeki),
			'katu': num(data.countkatu),
			'miss': num(data.countmiss)
		};
		this.maxCombo = num(data.maxcombo);
		this.perfect = data.perfect === '1';
		this.raw_date = data.date;
		this.rank = data.rank;
		this.pp = num(data.pp || null);
		this.hasReplay = data.replay_available === '1';

		this.raw_mods = parseInt(data.enabled_mods);

		this._beatmap = beatmap; // Optional
	}

	get beatmap() {
		return this._beatmap;
	}

	set beatmap(beatmap) {
		this.beatmapId = beatmap.id;
		this._beatmap = beatmap;
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
