"use strict";

module.exports = {
	Mods: {
	    "None"          : 0,
	    "NoFail"        : 1,
	    "Easy"          : 2,
	    "NoVideo"       : 4,
	    "Hidden"        : 8,
	    "HardRock"      : 16,
	    "SuddenDeath"   : 32,
	    "DoubleTime"    : 64,
	    "Relax"         : 128,
	    "HalfTime"      : 256,
	    "Nightcore"     : 512,
	    "Flashlight"    : 1024,
	    "Autoplay"      : 2048,
	    "SpunOut"       : 4096,
	    "Autopilot"     : 8192,
	    "Perfect"       : 16384,
	    "Key4"          : 32768,
	    "Key5"          : 65536,
	    "Key6"          : 131072,
	    "Key7"          : 262144,
	    "Key8"          : 524288,
	    "keyMod"        : 1015808,
	    "FadeIn"        : 1048576,
	    "Random"        : 2097152,
	    "LastMod"       : 4194304,
	    "FreeModAllowed": 2077883,
	    "Key9"          : 16777216,
	    "Key10"         : 33554432,
	    "Key1"          : 67108864,
	    "Key3"          : 134217728,
	    "Key2"          : 268435456
	},
	URLSchemas: {
		multiplayerMatch: (id, password) => `osu://mp/${id}${password !== undefined ? '/' + password : ''}`,
		edit: (position, objects) => `osu://edit/${position}${objects !== undefined ? ' ' + objects : ''}`,
		channel: (name) => `osu://chan/#${name}`,
		download: (id) => `osu://dl/${id}`,
		spectate: (user) => `osu://spectate/${user}`
	},
	Beatmaps: {
		"approved": {
			"-2": "Graveyard",
			"-1": "WIP",
			"0": "Pending",
			"1": "Ranked",
			"2": "Approved",
			"3": "Qualified"
		},
		"genre": {
			"0": "any",
			"1": "unspecified",
			"2": "video game",
			"3": "anime",
			"4": "rock",
			"5": "pop",
			"6": "other",
			"7": "novelty",
			"9": "hip hop",
			"10": "electronic"
		},
		"language": {
			"0": "any",
			"1": "other",
			"2": "english",
			"3": "japanese",
			"4": "chinese",
			"5": "instrumental",
			"6": "korean",
			"7": "french",
			"8": "german",
			"9": "swedish",
			"10": "spanish",
			"11": "italian"
		}
	}
}
