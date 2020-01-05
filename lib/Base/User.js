const Event = require('./Event.js');

/**
 * A user
 * @prop {String} id
 * @prop {String} name
 * @prop {Object} counts
 * @prop {String} counts.300
 * @prop {String} counts.100
 * @prop {String} counts.50
 * @prop {String} counts.SSH
 * @prop {String} counts.SS
 * @prop {String} counts.SH
 * @prop {String} counts.S
 * @prop {String} counts.A
 * @prop {String} counts.plays
 * @prop {Object} scores
 * @prop {String} scores.ranked
 * @prop {String} scores.total
 * @prop {Object} pp
 * @prop {String} pp.raw
 * @prop {String} pp.rank
 * @prop {String} pp.countryRank
 * @prop {String} country
 * @prop {String} level
 * @prop {String} accuracy
 * @prop {String} secondsPlayed
 * @prop {String} raw_joinDate
 * @prop {Event[]} events
 * @prop {String} accuracyFormatted
 * @prop {Date} joinDate
 */
class User {
	constructor(data) {
		this.id = +data.user_id;
		this.name = data.username;
		this.counts = {
			'300': +data.count300,
			'100': +data.count100,
			'50': +data.count50,
			'SSH': +data.count_rank_ssh,
			'SS': +data.count_rank_ss,
			'SH': +data.count_rank_sh,
			'S': +data.count_rank_s,
			'A': +data.count_rank_a,
			'plays': +data.playcount
		};
		this.scores = {
			ranked: +data.ranked_score,
			total: +data.total_score
		};
		this.pp = {
			raw: +data.pp_raw,
			rank: +data.pp_rank,
			countryRank: +data.pp_country_rank
		};
		this.country = data.country;

		this.level = +data.level;
		this.accuracy = +data.accuracy;
		this.secondsPlayed = +data.total_seconds_played;
		this.raw_joinDate = data.join_date;

		this.events = data.events.map(ev => new Event(ev));
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
