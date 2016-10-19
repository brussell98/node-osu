"use strict";

const MultiplayerScore = require('./MultiplayerScore.js'),
	Constants = require('../Constants.js');

class Game {

	constructor(data) {
		this.id = data.game_id;
		this.raw_start = data.start_time;
		this.raw_end = data.end_time;
		this.beatmapId = data.beatmap_id;
		this.mode = Constants.Beatmaps.mode[data.play_mode];
		this.matchType = data.match_type; // Unknown
		this.scoringType = Constants.Multiplayer.scoringType[data.scoring_type];
		this.teamType = Constants.Multiplayer.teamType[data.team_type];
		this.raw_mods = data.mods;
		this.scores = data.scores.map(g => new MultiplayerScore(g));
	}

	get start() {
		if (this._start !== undefined)
			return this._start;
		this._start = new Date(Date.parse(this.raw_start) - 28800000 - (new Date().getTimezoneOffset() * 60000));
		return this._start;
	}

	get end() {
		if (this._end !== undefined)
			return this._end;
		this._end = new Date(Date.parse(this.raw_end) - 28800000 - (new Date().getTimezoneOffset() * 60000));
		return this._end;
	}

	get mods() {
		if (this._mods !== undefined)
			return this._mods;
		this._mods = [];
		for (let mod in Constants.Mods) {
			if (this.raw_mods & Constants.Mods[mod])
				this._mods.push(mod);
		}
		return this._mods;
	}

}

module.exports = Game;
