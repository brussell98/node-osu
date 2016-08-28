"use strict";

const Team = require('../Constants.js').Multiplayer.team

class MultiplayerScore {

	constructor(data) {
		this.slot = data.slot;
		this.team = Team[data.team];
		this.userId = data.user_id;
		this.score = data.score;
		this.maxCombo = data.maxcombo;
		this.rank = null; // Not used
		this.counts = {
			'300': data.count300,
			'100': data.count100,
			'50': data.count50,
			'geki': data.countgeki,
			'katu': data.countkatu,
			'miss': data.countmiss
		};
		this.perfect = data.perfect === '1';
		this.pass = data.pass === '1';
	}

}

module.exports = MultiplayerScore;
