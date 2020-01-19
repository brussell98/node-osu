const MultiplayerScore = require('./MultiplayerScore.js');
const Constants = require('../Constants.js');

/**
 * A multiplayer game
 * @prop {String} id
 * @prop {String} raw_start
 * @prop {String} raw_end
 * @prop {String} beatmapId
 * @prop {String} mode
 * @prop {"0"} matchType
 * @prop {String} scoringType
 * @prop {String} teamType
 * @prop {Number} raw_mods
 * @prop {MultiplayerScore[]} scores
 * @prop {Date} start
 * @prop {Date} end
 * @prop {String[]} mods
 */
class Game {
	constructor(config, data) {
		this.id = data.game_id;
		this.raw_start = data.start_time;
		this.raw_end = data.end_time;
		this.beatmapId = data.beatmap_id;
		this.mode = Constants.Beatmaps.mode[data.play_mode];
		this.matchType = data.match_type; // Unknown
		this.scoringType = Constants.Multiplayer.scoringType[data.scoring_type];
		this.teamType = Constants.Multiplayer.teamType[data.team_type];
		this.raw_mods = parseInt(data.mods);
		this.scores = data.scores.map(g => new MultiplayerScore(config, g));
	}

	get start() {
		if (this._start !== undefined)
			return this._start;

		this._start = new Date(this.raw_start + ' UTC');
		return this._start;
	}

	get end() {
		if (this._end !== undefined)
			return this._end;

		this._end = new Date(this.raw_end + ' UTC');
		return this._end;
	}

	get mods() {
		if (this._mods !== undefined)
			return this._mods;

		this._mods = [];
		for (const mod in Constants.Mods)
			if (this.raw_mods & Constants.Mods[mod])
				this._mods.push(mod);


		return this._mods;
	}
}

module.exports = Game;
