"use strict";

const request = require('superagent'),
	userAgent = `node-osu v${require('../package.json').version} (https://github.com/brussell98/node-osu)`,
	Beatmap = require('./Base/Beatmap.js'),
	Score = require('./Base/Score.js'),
	Match = require('./Base/Match.js'),
	User = require('./Base/User.js');

class Api {

	/**
	 * Create a new node-osu object
	 * @param {string} apiKey your osu api key
	 * @param {Object} [options] 
	 * @param {string} [options.baseUrl] sets the base api url (default: https://osu.ppy.sh/api)
	 * @param {boolean} [options.notFoundAsError] Reject on not found instead of returning nothing. (default: true)
	 * @param {boolean} [options.completeScores] When fetching scores also return the beatmap (default: false)
	 */
	constructor(apiKey, options = {}) {
		this.apiKey = apiKey;
		this.baseUrl = options.baseUrl || 'https://osu.ppy.sh/api';
		this.notFoundAsError = options.notFoundAsError === undefined ? true : !!options.notFoundAsError;
		this.completeScores = !!options.completeScores;
	}

	/**
	 * Make an api call. Should generally not be used.
	 * @param {string} endpoint 
	 * @param {Object} options 
	 * @param {Date} [options.since] return all beatmaps ranked or loved since this date
	 * @param {string} [options.s] specify a beatmapsetId to return metadata from
	 * @param {string} [options.b] specify a beatmapId to return metadata from
	 * @param {string} [options.u] specify a userId or a username to return metadata from
	 * @param {"string"|"id"} [options.type] specify if `u` is a userId or a username
	 * @param {0|1|2|3} [options.m] mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {0|1} [options.a] specify whether converted beatmaps are included
	 * @param {string} [options.h] the beatmap hash
	 * @param {number} [options.limit] amount of results. Default and maximum are 500
	 * @param {number} [options.mods] mods that applies to the beatmap requested. Default is 0
	 * @param {number} [options.event_days] Max number of days between now and last event date. Range of 1-31. Default value is 1.
	 * @param {string} [options.mp] match id to get information from
	 */
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

	/**
	 * Returns an array of osu.Beatmap objects.
	 * @param {Object} options 
	 * @param {string} options.b specify a beatmapId to return metadata from
	 * @param {Date} [options.since] return all beatmaps ranked or loved since this date
	 * @param {string} [options.s] specify a beatmapsetId to return metadata from
	 * @param {string} [options.u] specify a userId or a username to return metadata from
	 * @param {"string"|"id"} [options.type] specify if `u` is a userId or a username
	 * @param {0|1|2|3} [options.m] mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {0|1} [options.a] specify whether converted beatmaps are included
	 * @param {string} [options.h] the beatmap hash
	 * @param {number} [options.limit] amount of results. Default and maximum are 500
	 * @param {number} [options.mods] mods that applies to the beatmap requested. Default is 0
	 * @returns {Promise<Beatmap[]>}
	 */
	getBeatmaps(options) {
		return new Promise((resolve, reject) => {
			this.apiCall('/get_beatmaps', options).then(response => {
				if (response.length === 0)
					return this.notFoundAsError ? reject(new Error('Beatmap not found')) : resolve(response);
				resolve(response.map(bm => new Beatmap(bm)));
			}).catch(reject);
		});
	}

	/**
	 * Returns an osu.User object.
	 * @param {Object} options 
	 * @param {string} options.u specify a userId or a username to return metadata from
	 * @param {0|1|2|3} [options.m] mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {"string"|"id"} [options.type] specify if u is a user_id or a username
	 * @param {number} [options.event_days] Max number of days between now and last event date. Range of 1-31. Default value is 1.
	 * @returns {Promise<User>}
	 */
	getUser(options) {
		return new Promise((resolve, reject) => {
			this.apiCall('/get_user', options).then(response => {
				if (response.length === 0)
					return this.notFoundAsError ? reject(new Error('User not found')) : resolve(response);
				resolve(new User(response[0]));
			}).catch(reject);
		});
	}

	/**
	 * Returns an array of osu.Score objects.
	 * @param {Object} options 
	 * @param {string} options.b specify a beatmapId to return score information from
	 * @param {string} [options.u] specify a userId or a username to return information for
	 * @param {0|1|2|3} [options.m] mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {"string"|"id"} [options.type] specify if u is a user_id or a username
	 * @param {number} [options.limit] amount of results from the top (range between 1 and 100 - defaults to 50).
	 * @returns {Promise<Score[]>} if `completeScores === true` returns `(Score, Beatmap)`
	 */
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

	/**
	 * Returns an array of osu.Score objects
	 * @param {Object} options 
	 * @param {string} options.u specify a userId or a username to return best scores from
	 * @param {0|1|2|3} [options.m] mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {"string"|"id"} [options.type] specify if u is a user_id or a username
	 * @param {number} [options.limit] amount of results (range between 1 and 100 - defaults to 10)
	 * @returns {Promise<Score[]>} if `completeScores === true` returns `[Score[], Beatmap[]]`
	 */
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

	/**
	 * Returns an array of osu.Score objects
	 * @param {Object} options 
	 * @param {string} options.u specify a userId or a username to return recent plays from
	 * @param {0|1|2|3} [options.m] mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {"string"|"id"} [options.type] specify if `u` is a user_id or a username
	 * @param {number} [options.limit] amount of results (range between 1 and 50 - defaults to 10).
	 * @returns {Promise<Score[]>} if `completeScores === true` returns `[Score[], Beatmap[]]`
	 */
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

	/**
	 * Returns an osu.Match object.
	 * @param {Object} options 
	 * @param {string} options.mp match id to get information from
	 * @returns {Promise<Match>} 
	 */
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

	/**
	 * Returns a replay object. **Do not spam this endpoint.**
	 * @param {Object} options 
	 * @param {0|1|2|3} options.m mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {string} options.b the beatmap ID in which the replay was played 
	 * @param {string} options.u the user that has played the beatmap (required)
	 * @param {"string"|"id"} [options.type] specify if u is a userId or a username
	 * @param {number} [options.mods] specify a mod or mod combination
	 * 
	 */
	getReplay(options) {
		return this.apiCall('/get_replay', options);
	}

}

module.exports = Api;
