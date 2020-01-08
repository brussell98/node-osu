const Game = require('./Game.js');

/**
 * A multiplayer match
 * @prop {String} id
 * @prop {String} name
 * @prop {String} raw_start
 * @prop {?String} raw_end null if not finished
 * @prop {Game[]} games
 * @prop {Date} start
 * @prop {Date} end
 */
class Match {
	constructor(config, data) {
		this.id = data.match.match_id;
		this.name = data.match.name;
		this.raw_start = data.match.start_time;
		this.raw_end = data.match.end_time;

		this.games = data.games.map(g => new Game(config, g));
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
}

module.exports = Match;
