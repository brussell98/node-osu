const request = require('superagent');
const userAgent = `node-osu v${require('../package.json').version} (https://github.com/brussell98/node-osu)`;
const Beatmap = require('./base/Beatmap.js');
const Score = require('./base/Score.js');
const Match = require('./base/Match.js');
const User = require('./base/User.js');

class Api {
	/**
	 * Creates a new node-osu object
	 * @param {String} apiKey your osu api key
	 * @param {Object} [options]
	 * @param {String} [options.baseUrl="https://osu.ppy.sh/api"] Sets the base api url
	 * @param {Boolean} [options.notFoundAsError=true] Throw an error on not found instead of returning nothing
	 * @param {Boolean} [options.completeScores=false] When fetching scores also fetch the beatmap they are for (Allows getting accuracy)
	 * @param {Boolean} [options.parseNumeric=false] Parse numeric properties into numbers. May have overflow
	 */
	constructor(apiKey, options = { }) {
		this.apiKey = apiKey;
		this.baseUrl = options.baseUrl || 'https://osu.ppy.sh/api';
		this.notFoundAsError = options.notFoundAsError === undefined ? true : !!options.notFoundAsError;
		this.completeScores = !!options.completeScores;
		this.parseNumeric = !!options.parseNumeric;
	}

	get config() {
		return {
			notFoundAsError: this.notFoundAsError,
			completeScores: this.completeScores,
			parseNumeric: this.parseNumeric
		};
	}

	/**
	 * Makes an api call
	 * @param {String} endpoint
	 * @param {Object} options
	 * @param {Date} [options.since] Return all beatmaps ranked or loved since this date
	 * @param {String} [options.s] Specify a beatmapSetId to return metadata from
	 * @param {String} [options.b] Specify a beatmapId to return metadata from
	 * @param {String} [options.u] Specify a userId or a username to return metadata from
	 * @param {"string"|"id"} [options.type] Specify if `u` is a userId or a username
	 * @param {0|1|2|3} [options.m] Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {0|1} [options.a] Specify whether converted beatmaps are included
	 * @param {String} [options.h] The beatmap hash
	 * @param {Number} [options.limit] Amount of results. Default and maximum are 500
	 * @param {Number} [options.mods] Mods that apply to the beatmap requested. Default is 0
	 * @param {Number} [options.event_days] Max number of days between now and last event date. Range of 1-31. Default value is 1
	 * @param {String} [options.mp] Match id to get information from
	 * @returns {Promise<Object>} The response body
	 */
	async apiCall(endpoint, options) {
		if (!this.apiKey)
			throw new Error('apiKey not set');
		options.k = this.apiKey;

		try {
			const resp = await request.get(this.baseUrl + endpoint)
				.set('User-Agent', userAgent)
				.query(options);

			return resp.body;
		} catch (error) {
			throw new Error(error.response || error);
		}
	}

	/**
	 * Returns a not found error or the response, depending on the config
	 * @param {Object} response
	 * @returns {Object}
	 */
	notFound(response) {
		if (this.notFoundAsError)
			throw new Error('Not found');

		return response;
	}

	/**
	 * Returns an array of Beatmap objects
	 * @param {Object} options
	 * @param {String} options.b Specify a beatmapId to return metadata from
	 * @param {Date} [options.since] Return all beatmaps ranked or loved since this date
	 * @param {String} [options.s] Specify a beatmapSetId to return metadata from
	 * @param {String} [options.u] Specify a userId or a username to return metadata from
	 * @param {"string"|"id"} [options.type] Specify if `u` is a userId or a username
	 * @param {0|1|2|3} [options.m] Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {0|1} [options.a] Specify whether converted beatmaps are included
	 * @param {String} [options.h] The beatmap hash
	 * @param {Number} [options.limit] Amount of results. Default and maximum are 500
	 * @param {Number} [options.mods] Mods that apply to the beatmap requested. Default is 0
	 * @returns {Promise<Beatmap[]>}
	 */
	async getBeatmaps(options) {
		const resp = await this.apiCall('/get_beatmaps', options);

		if (resp.length === 0)
			return this.notFound(resp);

		return resp.map(bm => new Beatmap(this.config, bm));
	}

	/**
	 * Returns a User object
	 * @param {Object} options
	 * @param {String} options.u Specify a userId or a username to return metadata from
	 * @param {0|1|2|3} [options.m] Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {"string"|"id"} [options.type] Specify if u is a user_id or a username
	 * @param {Number} [options.event_days] Max number of days between now and last event date. Range of 1-31. Default value is 1
	 * @returns {Promise<User>}
	 */
	async getUser(options) {
		const resp = await this.apiCall('/get_user', options);

		if (resp.length === 0)
			return this.notFound(resp);

		return new User(this.config, resp[0]);
	}

	/**
	 * Returns an array of Score objects
	 * @param {Object} options
	 * @param {String} options.b Specify a beatmapId to return score information from
	 * @param {String} [options.u] Specify a userId or a username to return information for
	 * @param {0|1|2|3} [options.m] Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {"string"|"id"} [options.type] Specify if u is a user_id or a username
	 * @param {Number} [options.limit] Amount of results from the top (range between 1 and 100 - defaults to 50)
	 * @returns {Promise<Score[]>}
	 */
	async getScores(options) {
		const resp = await this.apiCall('/get_scores', options);

		if (resp.length === 0)
			return this.notFound(resp);

		if (!this.completeScores)
			return resp.map(sc => new Score(this.config, sc));

		const beatmaps = await this.getBeatmaps({ b: options.b });
		return resp.map(sc => new Score(this.config, sc, beatmaps[0]));
	}

	/**
	 * Returns an array of Score objects
	 * @param {Object} options
	 * @param {String} options.u Specify a userId or a username to return best scores from
	 * @param {0|1|2|3} [options.m] Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {"string"|"id"} [options.type] Specify if u is a user_id or a username
	 * @param {Number} [options.limit] Amount of results (range between 1 and 100 - defaults to 10)
	 * @returns {Promise<Score[]>}
	 */
	async getUserBest(options) {
		const resp = await this.apiCall('/get_user_best', options);

		if (resp.length === 0)
			return this.notFound(resp);

		if (!this.completeScores)
			return resp.map(sc => new Score(this.config, sc));

		const scores = resp.map(sc => new Score(this.config, sc));
		for (const score of scores)
			score.beatmap = (await this.getBeatmaps({ b: score.beatmapId }))[0];

		return scores;
	}

	/**
	 * Returns an array of Score objects.
	 * Will return not found if the user has not submitted any scores in the past 24 hours
	 * @param {Object} options
	 * @param {String} options.u Specify a userId or a username to return recent plays from
	 * @param {0|1|2|3} [options.m] Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {"string"|"id"} [options.type] Specify if `u` is a user_id or a username
	 * @param {Number} [options.limit] Amount of results (range between 1 and 50 - defaults to 10)
	 * @returns {Promise<Score[]>}
	 */
	async getUserRecent(options) {
		const resp = await this.apiCall('/get_user_recent', options);

		if (resp.length === 0)
			return this.notFound(resp);

		if (!this.completeScores)
			return resp.map(sc => new Score(this.config, sc));

		const scores = resp.map(sc => new Score(this.config, sc));
		for (const score of scores)
			score.beatmap = (await this.getBeatmaps({ b: score.beatmapId }))[0];

		return scores;
	}

	/**
	 * Returns a Match object.
	 * @param {Object} options
	 * @param {String} options.mp Match id to get information from
	 * @returns {Promise<Match>}
	 */
	async getMatch(options) {
		const resp = await this.apiCall('/get_match', options);

		if (resp.match === 0)
			return this.notFound(resp);

		return new Match(this.config, resp);
	}

	/**
	 * Returns a replay object. **Do not spam this endpoint.**
	 * @param {Object} options
	 * @param {0|1|2|3} options.m Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
	 * @param {String} options.b The beatmapId in which the replay was played
	 * @param {String} options.u The user that has played the beatmap (required)
	 * @param {"string"|"id"} [options.type] Specify if u is a userId or a username
	 * @param {Number} [options.mods] Specify a mod or mod combination
	 *
	 */
	async getReplay(options) {
		return await this.apiCall('/get_replay', options);
	}
}

module.exports = Api;
