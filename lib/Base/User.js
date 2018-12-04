"use strict";

const Event = require('./Event.js');

class User {

	constructor(data) {
		this.id = data.user_id;
		this.name = data.username;
		this.counts = {
			'300': data.count300,
			'100': data.count100,
			'50': data.count50,
			'SSH': data.count_rank_ssh,
			'SS': data.count_rank_ss,
			'SH': data.count_rank_sh,
			'S': data.count_rank_s,
			'A': data.count_rank_a,
			'plays': data.playcount
		};
		this.scores = {
			ranked: data.ranked_score,
			total: data.total_score
		};
		this.pp = {
			raw: data.pp_raw,
			rank: data.pp_rank,
			countryRank: data.pp_country_rank
		};
		this.country = data.country;
		this.level = data.level;
		this.accuracy = data.accuracy;
		this.events = data.events.map(ev => new Event(ev));
	}

	get accuracyFormatted() {
		return parseFloat(this.accuracy).toFixed(2) + '%';
	}

}

module.exports = User;
