"use strict";

module.exports = {
	Mods: {
		"None"          : 0,
		"NoFail"        : 1,
		"Easy"          : 1 << 1,
		"NoVideo"       : 1 << 2,
		"Hidden"        : 1 << 3,
		"HardRock"      : 1 << 4,
		"SuddenDeath"   : 1 << 5,
		"DoubleTime"    : 1 << 6,
		"Relax"         : 1 << 7,
		"HalfTime"      : 1 << 8,
		"Nightcore"     : 1 << 9,
		"Flashlight"    : 1 << 10,
		"Autoplay"      : 1 << 11,
		"SpunOut"       : 1 << 12,
		"Autopilot"     : 1 << 13,
		"Perfect"       : 1 << 14,
		"Key4"          : 1 << 15,
		"Key5"          : 1 << 16,
		"Key6"          : 1 << 17,
		"Key7"          : 1 << 18,
		"Key8"          : 1 << 19,
		"keyMod"        : 1015808,
		"FadeIn"        : 1 << 20,
		"Random"        : 1 << 21,
		"LastMod"       : 1 << 22,
		"FreeModAllowed": 2077883,
		"Key9"          : 1 << 23,
		"Key10"         : 1 << 24,
		"Key1"          : 1 << 25,
		"Key3"          : 1 << 26,
		"Key2"          : 1 << 27
	},
	URLSchemas: {
		multiplayerMatch: (id, password) => `osu://mp/${id}${password !== undefined ? '/' + password : ''}`,
		edit: (position, objects) => `osu://edit/${position}${objects !== undefined ? ' ' + objects : ''}`,
		channel: (name) => `osu://chan/#${name}`,
		download: (id) => `osu://dl/${id}`,
		spectate: (user) => `osu://spectate/${user}`
	},
	Beatmaps: {
		approved: {
			"-2": "Graveyard",
			"-1": "WIP",
			"0": "Pending",
			"1": "Ranked",
			"2": "Approved",
			"3": "Qualified",
			"4": "Loved"
		},
		genre: {
			"0": "Any",
			"1": "Unspecified",
			"2": "Video Game",
			"3": "Anime",
			"4": "Rock",
			"5": "Pop",
			"6": "Other",
			"7": "Novelty",
			"9": "Hip Hop",
			"10": "Electronic"
		},
		language: {
			"0": "Any",
			"1": "Other",
			"2": "English",
			"3": "Japanese",
			"4": "Chinese",
			"5": "Instrumental",
			"6": "Korean",
			"7": "French",
			"8": "German",
			"9": "Swedish",
			"10": "Spanish",
			"11": "Italian"
		},
		mode: {
			"0": "Standard",
			"1": "Taiko",
			"2": "Catch the Beat",
			"3": "Mania"
		}
	},
	Multiplayer: {
		scoringType: {
			"0": "Score",
			"1": "Accuracy",
			"2": "Combo",
			"3": "Score v2"
		},
		teamType: {
			"0": "Head to Head",
			"1": "Tag Co-op",
			"2": "Team vs",
			"3": "Tag Team vs"
		},
		team: {
			"0": "None",
			"1": "Blue",
			"2": "Red"
		}
	},

	AccuracyMethods: {
		Standard: c => {
			const total = c['50'] + c['100'] + c['300'] + c.miss;
			return total === 0 ? 0 : ((c['300'] * 300 + c['100'] * 100 + c['50'] * 50) / (total * 300));
		},
		Taiko: c => {
			const total = c['100'] + c['300'] + c.miss;
			return total === 0 ? 0 : (((c['300'] + c['100'] * .5) * 300) / (total * 300));
		},
		'Catch the Beat': c => {
			const total = c['50'] + c['100'] + c['300'] + c.katu + c.miss;
			return total === 0 ? 0 : ((c['50'] + c['100'] + c['300']) / total);
		},
		Mania: c => { // (count50 * 50 + count100 * 100 + countKatu * 200 + (count300 + countGeki) * 300) / (totalHits * 300)
			const total = c['50'] + c['100'] + c['300'] + c.katu + c.geki + c.miss;
			return total === 0 ? 0 : ((c['50'] * 50 + c['100'] * 100 + c.katu * 200 + (c['300'] + c.geki) * 300) / (total * 300));
		}
	}
}
