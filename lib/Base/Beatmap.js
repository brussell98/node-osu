const { getNumeric } = require('../utils.js');
const Constants = require('../Constants.js');

/**
 * A beatmap
 * @prop {String} id
 * @prop {String} beatmapSetId
 * @prop {String} hash
 * @prop {String} title
 * @prop {String} creator
 * @prop {String} version
 * @prop {String} source
 * @prop {String} artist
 * @prop {String} genre
 * @prop {String} language
 * @prop {String|Number} rating
 * @prop {String|Number} bpm
 * @prop {String} mode
 * @prop {String[]} tags
 * @prop {String} approvalStatus
 * @prop {String} raw_submitDate
 * @prop {String} raw_approvedDate
 * @prop {String} raw_lastUpdate
 * @prop {String|Number} maxCombo
 * @prop {Object} objects
 * @prop {String|Number} objects.normal
 * @prop {String|Number} objects.slider
 * @prop {String|Number} objects.spinner
 * @prop {Object} difficulty
 * @prop {String|Number} difficulty.rating
 * @prop {String|Number} difficulty.aim
 * @prop {String|Number} difficulty.speed
 * @prop {String|Number} difficulty.size
 * @prop {String|Number} difficulty.overall
 * @prop {String|Number} difficulty.approach
 * @prop {String|Number} difficulty.drain
 * @prop {Object} length
 * @prop {String|Number} length.total
 * @prop {String|Number} length.drain
 * @prop {Object} counts
 * @prop {String|Number} counts.favorites
 * @prop {String|Number} counts.favourites
 * @prop {String|Number} counts.plays
 * @prop {String|Number} counts.passes
 * @prop {Boolean} hasDownload
 * @prop {Boolean} hasAudio
 * @prop {Date} submitDate
 * @prop {Date} approvedDate
 * @prop {Date} lastUpdate
 */
class Beatmap {
	constructor(config, data) {
		const num = getNumeric(config.parseNumeric);

		this.id = data.beatmap_id;
		this.beatmapSetId = data.beatmapset_id;
		this.hash = data.file_md5;
		this.title = data.title;
		this.creator = data.creator;
		this.version = data.version;

		this.source = data.source;
		this.artist = data.artist;
		this.genre = Constants.Beatmaps.genre[data.genre_id];
		this.language = Constants.Beatmaps.language[data.language_id];

		this.rating = num(data.rating);
		this.bpm = num(data.bpm);
		this.mode = Constants.Beatmaps.mode[data.mode];
		this.tags = data.tags.split(' ');
		this.approvalStatus = Constants.Beatmaps.approved[data.approved];
		this.raw_submitDate = data.submit_date;
		this.raw_approvedDate = data.approved_date;
		this.raw_lastUpdate = data.last_update;
		this.maxCombo = num(data.max_combo);
		this.objects = {
			normal: num(data.count_normal),
			slider: num(data.count_slider),
			spinner: num(data.count_spinner)
		};
		this.difficulty = {
			rating: num(data.difficultyrating),
			aim: num(data.diff_aim),
			speed: num(data.diff_speed),
			size: num(data.diff_size),
			overall: num(data.diff_overall),
			approach: num(data.diff_approach),
			drain: num(data.diff_drain)
		};
		this.length = {
			total: num(data.total_length),
			drain: num(data.hit_length)
		};
		this.counts = {
			favorites: num(data.favourite_count),
			favourites: num(data.favourite_count),
			plays: num(data.playcount),
			passes: num(data.passcount)
		};
		this.hasDownload = data.download_unavailable === '0';
		this.hasAudio = data.audio_unavailable === '0';
	}

	get submitDate() {
		if (this._submitDate !== undefined)
			return this._submitDate;

		this._submitDate = new Date(this.raw_submitDate + ' UTC');
		return this._submitDate;
	}

	get approvedDate() {
		if (this._approvedDate !== undefined)
			return this._approvedDate;

		this._approvedDate = this.raw_approvedDate ? new Date(this.raw_approvedDate + ' UTC') : null;
		return this._approvedDate;
	}

	get lastUpdate() {
		if (this._lastUpdate !== undefined)
			return this._lastUpdate;

		this._lastUpdate = new Date(this.raw_lastUpdate + ' UTC');
		return this._lastUpdate;
	}

}

module.exports = Beatmap;
