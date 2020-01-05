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
 * @prop {String} rating
 * @prop {String} bpm
 * @prop {String} mode
 * @prop {String[]} tags
 * @prop {String} approvalStatus
 * @prop {String} raw_submitDate
 * @prop {String} raw_approvedDate
 * @prop {String} raw_lastUpdate
 * @prop {String} maxCombo
 * @prop {Object} objects
 * @prop {String} objects.normal
 * @prop {String} objects.slider
 * @prop {String} objects.spinner
 * @prop {Object} difficulty
 * @prop {String} difficulty.rating
 * @prop {String} difficulty.aim
 * @prop {String} difficulty.speed
 * @prop {String} difficulty.size
 * @prop {String} difficulty.overall
 * @prop {String} difficulty.approach
 * @prop {String} difficulty.drain
 * @prop {Object} length
 * @prop {String} length.total
 * @prop {String} length.drain
 * @prop {Object} counts
 * @prop {String} counts.favorites
 * @prop {String} counts.favourites
 * @prop {String} counts.plays
 * @prop {String} counts.passes
 * @prop {Boolean} hasDownload
 * @prop {Boolean} hasAudio
 * @prop {Date} submitDate
 * @prop {Date} approvedDate
 * @prop {Date} lastUpdate
 */
class Beatmap {
	constructor(data) {
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

		this.rating = data.rating;
		this.bpm = data.bpm;
		this.mode = Constants.Beatmaps.mode[data.mode];
		this.tags = data.tags.split(' ');
		this.approvalStatus = Constants.Beatmaps.approved[data.approved];
		this.raw_submitDate = data.submit_date;
		this.raw_approvedDate = data.approved_date;
		this.raw_lastUpdate = data.last_update;
		this.maxCombo = data.max_combo;
		this.objects = {
			normal: data.count_normal,
			slider: data.count_slider,
			spinner: data.count_spinner
		};
		this.difficulty = {
			rating: data.difficultyrating,
			aim: data.diff_aim,
			speed: data.diff_speed,
			size: data.diff_size,
			overall: data.diff_overall,
			approach: data.diff_approach,
			drain: data.diff_drain
		};
		this.length = {
			total: data.total_length,
			drain: data.hit_length
		};
		this.counts = {
			favorites: data.favourite_count,
			favourites: data.favourite_count,
			plays: data.playcount,
			passes: data.passcount
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
