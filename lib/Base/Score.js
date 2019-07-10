"use strict";

const { Mods, AccuracyMethods } = require('../Constants.js');

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
		this.raw_date = data.date;
		this.rank = data.rank;
		this.pp = data.pp || null

		this.raw_mods = data.enabled_mods;
	}

	get date() {
		if (this._date !== undefined)
			return this._date;
		this._date = new Date(Date.parse(this.raw_date) - 28800000 - (new Date().getTimezoneOffset() * 60000)); // UTC+8 so we subtract 8 hours to get the UTC time
		return this._date;
	}

	get mods() {
		if (this._mods !== undefined)
			return this._mods;
		this._mods = [];
		for (let mod in Mods) {
			if (this.raw_mods & Mods[mod])
				this._mods.push(mod);
		}
		return this._mods;
	}

	getAccuracyFromBeatmap(beatmap) {
		const intCounts = { };
		for (const c in this.counts) {
			intCounts[c] = parseInt(this.counts[c], 10);
		}

		return AccuracyMethods[beatmap.mode](intCounts);
	}

}

module.exports = Score;
