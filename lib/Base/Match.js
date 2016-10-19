"use strict";

const Game = require('./Game.js');

class Match {

	constructor(data) {
		this.id = data.match.match_id;
		this.name = data.match.name;
		this.raw_start = data.match.start_time;
		this.raw_end = data.match.end_time;

		this.games = data.games.map(g => new Game(g));
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

}

module.exports = Match;
