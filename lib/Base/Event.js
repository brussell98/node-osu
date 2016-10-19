"use strict";

class Event {

	constructor(data) {
		this.html = data.display_html;
		this.beatmapId = data.beatmap_id;
		this.beatmapsetId = data.beatmapset_id;
		this.raw_date = data.date;
		this.epicFactor = data.epicfactor; // 1-32
	}

	get date() {
		if (this._date !== undefined)
			return this._date;
		this._date = new Date(Date.parse(this.raw_date) - 28800000 - (new Date().getTimezoneOffset() * 60000)); // UTC+8 so we subtract 8 hours to get the UTC time
		return this._date;
	}

}

module.exports = Event;
