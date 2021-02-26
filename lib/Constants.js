module.exports = {
	/**
	 * An enum of mods with their bitwise representation
	 * @readonly
	 * @enum {Number}
	 */
	Mods: {
		'None'          : 0,
		'NoFail'        : 1,
		'Easy'          : 1 << 1,
		'TouchDevice'   : 1 << 2,
		'Hidden'        : 1 << 3,
		'HardRock'      : 1 << 4,
		'SuddenDeath'   : 1 << 5,
		'DoubleTime'    : 1 << 6,
		'Relax'         : 1 << 7,
		'HalfTime'      : 1 << 8,
		'Nightcore'     : 1 << 9, // Triple speed
		'Flashlight'    : 1 << 10,
		'Autoplay'      : 1 << 11,
		'SpunOut'       : 1 << 12,
		'Relax2'        : 1 << 13, // Autopilot
		'Perfect'       : 1 << 14, // SuddenDeath mod
		'Key4'          : 1 << 15,
		'Key5'          : 1 << 16,
		'Key6'          : 1 << 17,
		'Key7'          : 1 << 18,
		'Key8'          : 1 << 19,
		'FadeIn'        : 1 << 20,
		'Random'        : 1 << 21,
		'Cinema'        : 1 << 22,
		'Target'        : 1 << 23,
		'Key9'          : 1 << 24,
		'KeyCoop'       : 1 << 25,
		'Key1'          : 1 << 26,
		'Key3'          : 1 << 27,
		'Key2'          : 1 << 28,
		'ScoreV2'       : 1 << 29,
		'Mirror'        : 1 << 30,
		'KeyMod'        : 521109504,
		'FreeModAllowed': 522171579,
		'ScoreIncreaseMods': 1049662
	},
	/** An object containing functions to generate osu protocol URLs */
	URLSchemas: {
		/** Joins a multiplayer match */
		multiplayerMatch: (id, password) => `osu://mp/${id}${password !== undefined ? '/' + password : ''}`,
		/** Links to a certain part of a map in the editor */
		edit: (position, objects) => `osu://edit/${position}${objects !== undefined ? ' ' + objects : ''}`,
		/** Joins a chat channel */
		channel: name => `osu://chan/#${name}`,
		/** Downloads a beatmap in the game */
		download: id => `osu://dl/${id}`,
		/** Spectates a player */
		spectate: user => `osu://spectate/${user}`
	},
	/** Enums for beatmaps */
	Beatmaps: {
		/**
		 * Approval states
		 * @readonly
		 * @enum {String}
		 */
		approved: {
			'-2': 'Graveyard',
			'-1': 'WIP',
			'0': 'Pending',
			'1': 'Ranked',
			'2': 'Approved',
			'3': 'Qualified',
			'4': 'Loved'
		},
		/**
		 * Song genres
		 * @readonly
		 * @enum {String}
		 */
		genre: {
			'0': 'Any',
			'1': 'Unspecified',
			'2': 'Video Game',
			'3': 'Anime',
			'4': 'Rock',
			'5': 'Pop',
			'6': 'Other',
			'7': 'Novelty',
			'9': 'Hip Hop',
			'10': 'Electronic'
		},
		/**
		 * Song languages
		 * @readonly
		 * @enum {String}
		 */
		language: {
			'0': 'Any',
			'1': 'Other',
			'2': 'English',
			'3': 'Japanese',
			'4': 'Chinese',
			'5': 'Instrumental',
			'6': 'Korean',
			'7': 'French',
			'8': 'German',
			'9': 'Swedish',
			'10': 'Spanish',
			'11': 'Italian'
		},
		/**
		 * Game modes
		 * @readonly
		 * @enum {String}
		 */
		mode: {
			'0': 'Standard',
			'1': 'Taiko',
			'2': 'Catch the Beat',
			'3': 'Mania'
		}
	},
	/** Enums for multiplayer matches */
	Multiplayer: {
		/**
		 * Scoring types
		 * @readonly
		 * @enum {String}
		 */
		scoringType: {
			'0': 'Score',
			'1': 'Accuracy',
			'2': 'Combo',
			'3': 'Score v2'
		},
		/**
		 * Team setup
		 * @readonly
		 * @enum {String}
		 */
		teamType: {
			'0': 'Head to Head',
			'1': 'Tag Co-op',
			'2': 'Team vs',
			'3': 'Tag Team vs'
		},
		/**
		 * Team of a player
		 * @readonly
		 * @enum {String}
		 */
		team: {
			'0': 'None',
			'1': 'Blue',
			'2': 'Red'
		}
	},
	/** Methods to calculate accuracy based on the game mode */
	AccuracyMethods: {
		/**
		 * Calculates accuracy based on hit counts for standard games
		 * @param {Object} c Hit counts
		 */
		Standard: c => {
			const total = c['50'] + c['100'] + c['300'] + c.miss;
			return total === 0 ? 0 : ((c['300'] * 300 + c['100'] * 100 + c['50'] * 50) / (total * 300));
		},
		/**
		 * Calculates accuracy based on hit counts for taiko games
		 * @param {Object} c Hit counts
		 */
		Taiko: c => {
			const total = c['100'] + c['300'] + c.miss;
			return total === 0 ? 0 : (((c['300'] + c['100'] * .5) * 300) / (total * 300));
		},
		/**
		 * Calculates accuracy based on hit counts for CtB games
		 * @param {Object} c Hit counts
		 */
		'Catch the Beat': c => {
			const total = c['50'] + c['100'] + c['300'] + c.katu + c.miss;
			return total === 0 ? 0 : ((c['50'] + c['100'] + c['300']) / total);
		},
		/**
		 * Calculates accuracy based on hit counts for mania games
		 * @param {Object} c Hit counts
		 */
		Mania: c => { // (count50 * 50 + count100 * 100 + countKatu * 200 + (count300 + countGeki) * 300) / (totalHits * 300)
			const total = c['50'] + c['100'] + c['300'] + c.katu + c.geki + c.miss;
			return total === 0 ? 0 : ((c['50'] * 50 + c['100'] * 100 + c.katu * 200 + (c['300'] + c.geki) * 300) / (total * 300));
		}
	}
};
