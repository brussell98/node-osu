"use strict";

class Event {

	constructor(data) {
		this.html = data.display_html;
		this.beatmapId = data.beatmap_id;
		this.beatmapsetId = data.beatmapset_id;
		this.date = data.date // UTC+8
		this.epicfactor = data.epicfactor; // 1-32
	}

	get dateUTC() {
		return new Date(Date.parse(this.date) - 28800000 - (new Date().getTimezoneOffset() * 60000)); // UTC+8 so we subtract 28,800,000 (8 hours) to get the UTC time
	}

}

module.exports = Event;
