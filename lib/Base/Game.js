"use strict";

const MultiplayerScore = require('./MultiplayerScore.js'),
	Constants = require('../Constants.js');

class Game {

	constructor(data) {
		this.id = data.game_id;
		this.start = new Date(Date.parse(data.start_time) - 28800000 - (new Date().getTimezoneOffset() * 60000)); // UTC+8
		this.end = data.end_time === null ? null : new Date(Date.parse(data.end_time) - 28800000 - (new Date().getTimezoneOffset() * 60000)); // UTC+8
		this.beatmapId = data.beatmap_id;
		this.mode = Constants.Beatmaps.mode[data.play_mode];
		this.matchType = data.match_type; // Unknown
		this.scoringType = Constants.Multiplayer.scoringType[data.scoring_type];
		this.teamType = Constants.Multiplayer.teamType[data.team_type];

		this.mods = [];
		for (let mod in Constants.Mods) {
			if (data.mods & Constants.Mods[mod])
				this.mods.push(mod);
		}


		this.scores = data.scores.map(g => new MultiplayerScore(g));
	}

}

module.exports = Game;
