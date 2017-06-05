"use strict";

const Constants = require('../Constants.js'),
    Beatmap = require('./Beatmap.js');

class BeatmapSet{

    constructor(data) {
        this.beatmapSetId = data[0].beatmapset_id;
        this.title = data[0].title;
        this.creator = data[0].creator;

        this.source = data[0].source;
        this.artist = data[0].artist;
        this.genre = Constants.Beatmaps.genre[data[0].genre_id];
        this.language = Constants.Beatmaps.language[data[0].language_id];

        this.bpm = data[0].bpm;
        this.mode = Constants.Beatmaps.mode[data[0].mode];
        this.tags = data[0].tags.split(' ');
        this.approvalStatus = Constants.Beatmaps.approved[data[0].approved];
        this.raw_approvedDate = data[0].approved_date;
        this.raw_lastUpdate = data[0].last_update;

        this.time = {
            'total': data[0].total_length,
            'drain': data[0].hit_length
        };
        this.counts = {
            'favorites': data[0].favourite_count,
            'favourites': data[0].favourite_count
        }

        this.difficultyCount = data[0].length;
        this.difficulty = data.map(m => new Beatmap(m));
    }

	get approvedDate() {
		if (this._approvedDate !== undefined)
			return this._approvedDate;
		this._approvedDate = this.raw_approvedDate ? new Date(Date.parse(this.raw_approvedDate) - 28800000 - (new Date().getTimezoneOffset() * 60000)) : null;
		return this._approvedDate;
	}

	get lastUpdate() {
		if (this._lastUpdate !== undefined)
			return this._lastUpdate;
		this._lastUpdate = new Date(Date.parse(this.raw_lastUpdate) - 28800000 - (new Date().getTimezoneOffset() * 60000));
		return this._lastUpdate;
	}
}

module.exports = BeatmapSet;