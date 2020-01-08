const { getNumeric } = require('../utils.js');
const Event = require('./Event.js');

/**
 * A user
 * @prop {String} id
 * @prop {String} name
 * @prop {Object} counts
 * @prop {String|Number} counts.300
 * @prop {String|Number} counts.100
 * @prop {String|Number} counts.50
 * @prop {String|Number} counts.SSH
 * @prop {String|Number} counts.SS
 * @prop {String|Number} counts.SH
 * @prop {String|Number} counts.S
 * @prop {String|Number} counts.A
 * @prop {String|Number} counts.plays
 * @prop {Object} scores
 * @prop {String|Number} scores.ranked
 * @prop {String|Number} scores.total
 * @prop {Object} pp
 * @prop {String|Number} pp.raw
 * @prop {String|Number} pp.rank
 * @prop {String|Number} pp.countryRank
 * @prop {String} country
 * @prop {String|Number} level
 * @prop {String|Number} accuracy
 * @prop {String|Number} secondsPlayed
 * @prop {String} raw_joinDate
 * @prop {Event[]} events
 * @prop {String} accuracyFormatted
 * @prop {Date} joinDate
 */
class User {
	constructor(config, data) {
		const num = getNumeric(config.parseNumeric);

		this.id = data.user_id;
		this.name = data.username;
		this.counts = {
			'300': num(data.count300),
			'100': num(data.count100),
			'50': num(data.count50),
			'SSH': num(data.count_rank_ssh),
			'SS': num(data.count_rank_ss),
			'SH': num(data.count_rank_sh),
			'S': num(data.count_rank_s),
			'A': num(data.count_rank_a),
			'plays': num(data.playcount)
		};
		this.scores = {
			ranked: num(data.ranked_score),
			total: num(data.total_score)
		};
		this.pp = {
			raw: num(data.pp_raw),
			rank: num(data.pp_rank),
			countryRank: num(data.pp_country_rank)
		};
		this.country = data.country;
		this.level = num(data.level);
		this.accuracy = num(data.accuracy);
		this.secondsPlayed = num(data.total_seconds_played);
		this.raw_joinDate = data.join_date;

		this.events = data.events.map(ev => new Event(config, ev));
	}

	get joinDate() {
		if (this._joinDate !== undefined)
			return this._joinDate;

		this._joinDate = new Date(this.raw_joinDate + ' UTC');
		return this._joinDate;
	}

	get accuracyFormatted() {
		return parseFloat(this.accuracy).toFixed(2) + '%';
	}

}

module.exports = User;
