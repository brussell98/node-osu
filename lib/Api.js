"use strict";

var request = require('superagent'),
	Beatmap = require('./Base/Beatmap.js'),
	Score = require('./Base/Score.js'),
	User = require('./Base/User.js');

class Api {

	constructor(apiKey) {
		this.apiKey = apiKey;
		this.baseUrl = 'https://osu.ppy.sh/api'
	}

	apiCall(endpoint, options) {
		return new Promise((resolve, reject) => {
			if (!this.apiKey)
				return reject(new Error('apiKey not set'));
			options['k'] = this.apiKey;
			request.get(this.baseUrl + endpoint)
				.query(options)
				.end((error, response) => {
					if (!error && response.status === 200) {
						resolve(response.body);
					} else
						reject(new Error(error.status || error.response));
				});
		});
	}

	getBeatmaps(options) {
		return new Promise((resolve, reject) => {
			this.apiCall('/get_beatmaps', options).then(response => {
				if (response.length === 0)
					return reject(new Error('Beatmap not found'));
				resolve(response.map(bm => new Beatmap(bm)));
			}).catch(reject);
		});
	}

	getUser(options) {
		return new Promise((resolve, reject) => {
			this.apiCall('/get_user', options).then(response => {
				if (response.length === 0)
					return reject(new Error('User not found'));
				resolve(new User(response[0]));
			}).catch(reject);
		});
	}

	getScores(options) {
		return new Promise((resolve, reject) => {
			this.apiCall('/get_scores', options).then(response => {
				resolve(response.map(sc => new Score(sc)));
			}).catch(reject);
		});
	}

	getUserBest(options) {
		return this.apiCall('/get_user_best', options);
	}

	getUserRecent(options) {
		return this.apiCall('/get_user_recent', options);
	}

	getMatch(options) {
		return new Promise((resolve, reject) => {
			this.apiCall('/get_match', options).then(response => {
				resolve(response[0]);
			}).catch(reject);
		});
	}

	getReplay(options) {
		return this.apiCall('/get_replay', options);
	}

}

module.exports = Api;
