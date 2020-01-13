# node-osu
[![Code Climate](https://codeclimate.com/github/brussell98/node-osu/badges/gpa.svg)](https://codeclimate.com/github/brussell98/node-osu)

Making the osu api easy to use.

*NOTE: This is for version 1.0 of the osu!api.*

## Getting Started
Get your osu api key from https://osu.ppy.sh/p/api

Install node-osu   
`yarn add node-osu` / `npm i node-osu`

## Running tests
Install the dev dependencies: `mocha` and `chai`

Run `yarn/npm test`

## Contributing
- Follow the rules in `.eslintrc.js`
- Separate changes into different PRs
- Prioritize backwards-compatibility

## Documentation

Require node-osu
```js
const osu = require('node-osu');
```

### osu.Constants
- Mods: An object containing the bitwise representation for each mod
- URLSchemas: An object containing osu url schema generating functions
	- multiplayerMatch: Function taking `<id>, [password]`
	- edit: Function taking `<position>, [objects]`
	- channel: Function taking `<name>`
	- download: Function taking `<id>`
	- spectate: Function taking `<user>`
- Beatmaps: Beatmap constants
	- approved: Get approval state from a number representation
	- genre: Get map genre from a number representation
	- language: Get map language from a number representation
	- mode: Get game mode from a number representation
- Multiplayer: Multiplayer match constants
	- scoringType: Get a game's scoring mode from a number representation
	- teamType: Get a game's team mode from a number representation
	- team: Get a user's team from a number representation
- AccuracyMethods: Calculate accuracy from a score's counts

### osu.Api
All methods return a Promise.   
`options` refers to the url parameters listed here: https://github.com/ppy/osu-api/wiki

#### Constructor
```js
const osuApi = new osu.Api('A3tGREAemXk213gfJJUewH9675g', {
	// baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
	notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
	completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
	parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});
```

#### apiCall(endpoint, options)
Make an api call. Should generally not be used.
```js
osuApi.apiCall('/get_user', { u: 'brussell98' }).then(user => {
	console.log(user[0].username);
});
```

#### getBeatmaps(options)
Returns an array of Beatmap objects.
```js
osuApi.getBeatmaps({ b: '765567' }).then(beatmaps => {
	console.log(beatmaps[0].title);
});
```

#### getUser(options)
Returns an User object.
```js
osuApi.getUser({ u: 'brussell98' }).then(user => {
	console.log(user.name);
});
```

#### getScores(options)
Returns an array of Score objects.
```js
osuApi.getScores({ b: '1036655' }).then(scores => {
	console.log(scores[0].score);
});

// or with completeScores set to true
osuApi.getScores({ b: '1036655' }).then(scores => {
	console.log(scores[0].score);
	console.log(scores[0].beatmap.title);
	console.log(scores[0].accuracy);
});
```

#### getUserBest(options)
Returns an array of Score objects.
```js
osuApi.getUserBest({ u: 'brussell98' }).then(scores => {
	console.log(scores[0].score);
});

// or with completeScores set to true
osuApi.getUserBest({ u: 'brussell98' }).then(scores => {
	console.log(scores[0].score);
	console.log(scores[0].beatmap.title);
	console.log(scores[0].accuracy);
});
```

#### getUserRecent(options)
Returns an array of Score objects. If the user has not submitted a score in the past 24 hours, this will return as not found.
```js
osuApi.getUserRecent({ u: 'brussell98' }).then(scores => {
	console.log(scores[0].score);
});

// or with completeScores set to true
osuApi.getUserRecent({ u: 'brussell98' }).then(scores => {
	console.log(scores[0].score);
	console.log(scores[0].beatmap.title);
	console.log(scores[0].accuracy);
});
```

#### getMatch(options)
Returns an Match object.
```js
osuApi.getMatch({ mp: '25576650' }).then(match => {
	console.log(match.name);
});
```

#### getReplay(options)
Returns a replay object. **Do not spam this endpoint**.
```js
const fs = require('fs');
osuApi.getReplay({ m: '0', b: '1337', u: 'brussell98' }).then(replay => {
	fs.writeFile('replay.txt', replay.content);
});
```

### osu.User
```js
User {
	id: '7541046',
	name: 'brussell98',
	counts: {
		'50': '34327',
		'100': '393959',
		'300': '4008334',
		SSH: '2',
		SS: '4',
		SH: '14',
		S: '379',
		A: '1785',
		plays: '16951'
	},
	scores: {
		ranked: '8625602786',
		total: '20612840665'
	},
	pp: {
		raw: '2669.26',
		rank: '134346',
		countryRank: '22842'
	},
	country: 'US',
	level: '99.3151',
	accuracy: '98.3110122680664',
	secondsPlayed: '1239538',
	raw_joinDate: '2015-12-09 02:27:02',
	events: [ Event {...}, ...],

	// Getters
	accuracyFormatted: String
	joinDate: Date
}
```

### osu.Event
```js
Event {
	html: '<img src=\'/images/A_small.png\'/> <b><a href=\'/u/7541046\'>brussell98</a></b> achieved rank #62 on <a href=\'/b/2244449?m=1\'>Morimori Atsushi - Toono Gensou Monogatari (MRM REMIX) [Nardo\'s Futsuu]</a> (osu!taiko)',
	beatmapId: '2244449',
	beatmapsetId: '812992',
	raw_date: '2020-01-04 05:02:09',
	epicFactor: '1',

	// Getters
	date: Date
}
```

### osu.Beatmap
```js
Beatmap {
	id: '765567',
	beatmapSetId: '346872',
	hash: '49ae1a43f732d07aff8efab2b0f22bdf',
	title: 'GATE~Sore wa Akatsuki no you ni~ (TV size)',
	creator: 'Del05',
	version: 'Insane',
	source: 'GATE 自衛隊 彼の地にて、斯く戦えり',
	artist: 'KISIDA KYODAN & THE AKEBOSI ROCKETS',
	genre: 'Anime',
	language: 'Japanese',
	rating: '9.45067',
	bpm: '200',
	mode: 'Standard',
	tags: [
		'jieitai',
		'kanochi',
		'nite',
		'kaku',
		'tatakaeri',
		'opening',
		'kyle',
		'y',
		'walaowey',
		'rory',
		'tuka',
		'ゲート'
	],
	approvalStatus: 'Ranked',
	raw_submitDate: '2015-08-18 14:01:13',
	raw_approvedDate: '2016-03-18 18:21:22',
	raw_lastUpdate: '2016-03-02 15:14:22',
	maxCombo: '549',
	objects: {
		normal: '213',
		slider: '165',
		spinner: '0'
	},
	difficulty: {
		rating: '4.68783',
		aim: '2.36005',
		speed: '2.29552',
		size: '4',
		overall: '7',
		approach: '9',
		drain: '6'
	},
	length: {
		total: '89',
		drain: '89'
	},
	counts: {
		favorites: '1127',
		favourites: '1127',
		plays: '1506571',
		passes: '262113'
	},
	hasDownload: true,
	hasAudio: true,

	// Getters
	submitDate: Date,
	approvedDate: Date,
	lastUpdate: Date
}
```

### osu.Score
```js
Score {
	score: '10380039',
	user: {
		name: 'Sarah', // null when using a getUserX method
		id: '7777836'
	},
	beatmapId: null, // When using getScores() without completeScores this will be null
	counts: {
		'50': '0',
		'100': '5',
		'300': '414',
		geki: '92',
		katu: '5',
		miss: '0'
	},
	maxCombo: '826',
	perfect: true,
	raw_date: '2018-09-10 22:36:08',
	rank: 'SH',
	pp: '240.73', // Can be null (in recent user scores for example)
	hasReplay: true,
	raw_mods: 88,
	beatmap: undefined, // or `Beatmap {...}` with completeScores

	// Getters
	date: Date,
	mods: [Constants.Mods],
	accuracy: Number
}
```

### osu.Match
```js
Match {
	id: '57155016',
	name: 'OWC2019: (United States) vs (South Korea)',
	raw_start: '2019-12-22 02:48:47',
	raw_end: '2019-12-22 04:29:11',
	games: [ Game {...}, ...],

	// Getters
	start: Date,
	end: Date
}
```

### osu.Game
```js
Game {
	id: '298230665',
	raw_start: '2019-12-22 03:57:20',
	raw_end: '2019-12-22 04:00:19',
	beatmapId: '1656914',
	mode: 'Standard',
	matchType: '0', // Unknown purpose
	scoringType: 'Score v2',
	teamType: 'Team vs',
	raw_mods: 64,
	scores: [ MultiplayerScore {...}, ...] // Will be empty if in progress

	// Getters
	start: Date,
	end: Date,
	mods: [ 'DoubleTime' ] // Array of `Constants.Mods` required for all players
}
```

### osu.MultiplayerScore
```js
MultiplayerScore {
	slot: '0',
	team: 'Red',
	userId: '4194445',
	score: '353891',
	maxCombo: '710',
	rank: null, // Not used
	counts: {
		'50': '27',
		'100': '73',
		'300': '690',
		geki: '129',
		katu: '38',
		miss: '38'
	},
	perfect: false,
	pass: true,
	raw_mods: 1,

	// Getters
	mods: [ 'NoFail' ] // Array of `Constants.Mods` used by the player
}
```
