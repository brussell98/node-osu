"use strict";

class Event {

	constructor(data) {
		this.html = data.display_html;
		this.beatmapId = data.beatmap_id;
		this.beatmapsetId = data.beatmapset_id;
		this.date = new Date(Date.parse(data.date) - 28800000 - (new Date().getTimezoneOffset() * 60000));
		this.epicFactor = data.epicfactor; // 1-32
	}

}

module.exports = Event;
