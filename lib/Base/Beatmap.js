"use strict";

const Constants = require('../Constants.js');

class Beatmap {

	constructor(data) {
		this.id = data.beatmap_id;
		this.hash = data.file_md5;
		this.title = data.title;
		this.creator = data.creator;
		this.version = data.version;

		this.source = data.source;
		this.artist = data.artist;
		this.genre = Constants.Beatmaps.genre[data.genre_id];
		this.language = Constants.Beatmaps.language[data.language_id];

		this.bpm = data.bpm;
		this.mode = Constants.Beatmaps.mode[data.mode];
		this.tags = data.tags.split(' ');
		this.approvalStatus = Constants.Beatmaps.approved[data.approved];
		this.approvedDate = data.approved_date ? new Date(Date.parse(data.approved_date) - 28800000 - (new Date().getTimezoneOffset() * 60000)) : null; // UTC+8
		this.lastUpdate = new Date(Date.parse(data.last_update) - 28800000 - (new Date().getTimezoneOffset() * 60000)); // UTC+8
		this.beatmapSetId = data.beatmapset_id;
		this.maxCombo = data.max_combo;
		this.difficulty = {
			'rating': data.difficultyrating,
			'size': data.diff_size,
			'overall': data.diff_overall,
			'approach': data.diff_approach,
			'drain': data.diff_drain
		};
		this.time = {
			'total': data.total_length,
			'drain': data.hit_length
		};
		this.counts = {
			'favorites': data.favourite_count,
			'favourites': data.favourite_count,
			'plays': data.playcount,
			'passes': data.passcount
		};
	}

}

module.exports = Beatmap;
