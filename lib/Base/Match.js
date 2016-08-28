"use strict";

const Game = require('./Game.js');

class Match {

	constructor(data) {
		this.id = data.match.match_id;
		this.name = data.match.name;
		this.start = new Date(Date.parse(data.match.start_time) - 28800000 - (new Date().getTimezoneOffset() * 60000)); // UTC+8
		this.end = data.end_time === null ? null : new Date(Date.parse(data.match.end_time) - 28800000 - (new Date().getTimezoneOffset() * 60000)); // UTC+8

		this.games = data.games.map(g => new Game(g));
	}

}

module.exports = Match;
