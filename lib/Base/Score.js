"use strict";

const Mods = require('../Constants.js').Mods;

class Score {

	constructor(data) {
		this.score = data.score;
		this.user = {
			'name': data.username,
			'id': data.user_id
		}
		this.beatmapId = data.beatmap_id || null;
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
		this.date = new Date(Date.parse(data.date) - 28800000 - (new Date().getTimezoneOffset() * 60000)); // UTC+8 so we subtract 8 hours to get the UTC time
		this.rank = data.rank;
		this.pp = data.pp || null

		this.mods = [];
		for (let mod in Mods) {
			if (data.enabled_mods & Mods[mod])
				this.mods.push(mod);
		}
	}

}

module.exports = Score;
