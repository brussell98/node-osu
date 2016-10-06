"use strict";

const request = require('superagent'),
	userAgent = `node-osu v${require('../package.json').version} (https://github.com/brussell98/node-osu)`,
	Beatmap = require('./Base/Beatmap.js'),
	Score = require('./Base/Score.js'),
	Match = require('./Base/Match.js'),
	User = require('./Base/User.js');

class Api {

	constructor(apiKey, options = {}) {
		this.apiKey = apiKey;
		this.baseUrl = options.baseUrl || 'https://osu.ppy.sh/api';
		this.notFoundAsError = options.notFoundAsError === undefined ? true : !!options.notFoundAsError;
		this.completeScores = !!options.completeScores;
	}

	apiCall(endpoint, options) {
		return new Promise((resolve, reject) => {
			if (!this.apiKey)
				return reject(new Error('apiKey not set'));
			options['k'] = this.apiKey;
			request.get(this.baseUrl + endpoint)
				.set('User-Agent', userAgent)
				.query(options)
				.end((error, response) => {
					if (!error && response.status === 200)
						resolve(response.body);
					else
						reject(new Error(error.status || error.response));
				});
		});
	}

	getBeatmaps(options) {
		return new Promise((resolve, reject) => {
			this.apiCall('/get_beatmaps', options).then(response => {
				if (response.length === 0)
					return this.notFoundAsError ? reject(new Error('Beatmap not found')) : resolve(response);
				resolve(response.map(bm => new Beatmap(bm)));
			}).catch(reject);
		});
	}

	getUser(options) {
		return new Promise((resolve, reject) => {
			this.apiCall('/get_user', options).then(response => {
				if (response.length === 0)
					return this.notFoundAsError ? reject(new Error('User not found')) : resolve(response);
				resolve(new User(response[0]));
			}).catch(reject);
		});
	}

	getScores(options) {
		return new Promise((resolve, reject) => {
			this.apiCall('/get_scores', options).then(response => {
				if (response.length === 0)
					return this.notFoundAsError ? reject(new Error('No scores')) : resolve(response);
				if (this.completeScores === false)
					return resolve(response.map(sc => new Score(sc)));

				this.getBeatmaps({b: options.b}).then(beatmap => {
					return resolve(response.map(sc => new Score(sc)), beatmap[0]);
				}).catch(reject);
			}).catch(reject);
		});
	}

	getUserBest(options) {
		return new Promise((resolve, reject) => {
			this.apiCall('/get_user_best', options).then(response => {
				if (response.length === 0)
					return this.notFoundAsError ? reject(new Error('No scores')) : resolve(response);
				if (this.completeScores === false)
					return resolve(response.map(sc => new Score(sc)));

				let scores = response.map(sc => new Score(sc));
				Promise.all(scores.map(sc => this.getBeatmaps({b: sc.beatmapId}))).then(beatmaps => {
					return resolve(scores.map((sc, i) => [sc, beatmaps[i][0]]));
				}).catch(reject);
			}).catch(reject);
		});
	}

	getUserRecent(options) {
		return new Promise((resolve, reject) => {
			this.apiCall('/get_user_recent', options).then(response => {
				if (response.length === 0)
					return this.notFoundAsError ? reject(new Error('No scores')) : resolve(response);
				if (this.completeScores === false)
					return resolve(response.map(sc => new Score(sc)));

				let scores = response.map(sc => new Score(sc));
				Promise.all(scores.map(sc => this.getBeatmaps({b: sc.beatmapId}))).then(beatmaps => {
					return resolve(scores.map((sc, i) => [sc, beatmaps[i][0]]));
				}).catch(reject);
			}).catch(reject);
		});
	}

	getMatch(options) {
		return new Promise((resolve, reject) => {
			this.apiCall('/get_match', options).then(response => {
				if (response.length === 0)
					return this.notFoundAsError ? reject(new Error('Match not found')) : resolve(response);
				if (response[0].match === 0)
					return this.notFoundAsError ? reject(new Error('Match too old')) : resolve(response);
				resolve(new Match(response[0]));
			}).catch(reject);
		});
	}

	getReplay(options) {
		return this.apiCall('/get_replay', options);
	}

}

module.exports = Api;
