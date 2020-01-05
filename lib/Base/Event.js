/**
 * A timeline event for a user
 * @prop {String} html
 * @prop {String} beatmapId
 * @prop {String} beatmapSetId
 * @prop {String} raw_date
 * @prop {String} epicFactor How "epic" this event is (from 1-32)
 * @prop {Date} date
 */
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

		this._date = new Date(this.raw_date + ' UTC');
		return this._date;
	}
}

module.exports = Event;
