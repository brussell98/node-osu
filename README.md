# node-osu [![Code Climate](https://codeclimate.com/github/brussell98/node-osu/badges/gpa.svg)](https://codeclimate.com/github/brussell98/node-osu)
Making the osu api easy to use.   
ES6 because it's awesome :wink:

## Getting Started
Get your osu api key from https://osu.ppy.sh/p/api

Install node-osu   
`npm i node-osu -S --production`

## Running tests
Install the dev dependencies: `mocha` and `chai`

Run `npm test`

## Contributing
Follow the rules in `.eslintrc` and prioritize backwards-compatibility.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Documentation

Require node-osu
```js
const osu = require('node-osu');
```

### osu.Contants
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
var osuApi = new osu.Api('A3tGREAemXk213gfJJUewH9675g', {
	// baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
	notFoundAsError: true, // Reject on not found instead of returning nothing. (default: true)
	completeScores: false // When fetching scores also return the beatmap (default: false)
})
```

#### apiCall(endpoint, options)
Make an api call. Should generally not be used.
```js
osuApi.apiCall('/get_user', {u: 'brussell98'}).then(user => {
	console.log(user[0].username);
});
```

#### getBeatmaps(options)
Returns an array of osu.Beatmap objects.
```js
osuApi.getBeatmaps({b: '765567'}).then(beatmaps => {
	console.log(beatmaps[0].title);
});
```

#### getUser(options)
Returns an osu.User object.
```js
osuApi.getUser({u: 'brussell98'}).then(user => {
	console.log(user.name);
});
```

#### getScores(options)
Returns an array of osu.Score objects.
```js
osuApi.getScores({b: '1036655'}).then(scores => {
	console.log(scores[0].score);
});

// or with completeScores set to true
osuApi.getScores({b: '1036655'}).then((scores, beatmap) => {
	console.log(scores[0].score);
	console.log(beatmap.title);
});
```

#### getUserBest(options)
Returns an array of osu.Score objects.
```js
osuApi.getUserBest({u: 'brussell98'}).then(scores => {
	console.log(scores[0].score);
});

// or with completeScores set to true
osuApi.getUserBest({u: 'brussell98'}).then(scores => {
	console.log(scores[0][0].score);
	console.log(scores[0][1].title);
});
```

#### getUserRecent(options)
Returns an array of osu.Score objects.
```js
osuApi.getUserRecent({u: 'brussell98'}).then(scores => {
	console.log(scores[0].score);
});

// or with completeScores set to true
osuApi.getUserRecent({u: 'brussell98'}).then(scores => {
	console.log(scores[0][0].score);
	console.log(scores[0][1].title);
});
```

#### getMatch(options)
Returns an osu.Match object.
```js
osuApi.getMatch({mp: '25576650'}).then(match => {
	console.log(match.name);
});
```

#### getReplay(options)
Returns a replay object. **Do not spam this endpoint**.
```js
var fs = require('fs');
osuApi.getReplay({m: '0', b: '1337', u: 'brussell98'}).then(replay => {
	fs.writeFile('replay.txt', replay.content);
});
```

### osu.User
```js
User {
	id: '7541046',
	name: 'brussell98',
	counts: {
		'50': '19387',
		'100': '171251',
		'300': '1141833',
		SSH: '2'
		SS: '4',
		S: '180',
		SH: '14'
		A: '348',
		plays: '5480'
	},
	scores: {
		ranked: '2547531697',
		total: '5417447570'
	},
	pp: {
		raw: '1478.25',
		rank: '87950',
		countryRank: '13688'
	},
	country: 'US',
	level: '92.2654',
	accuracy: '94.68416595458984',
	accuracyFormatted: '94.68%',
	events: [ Event {...}, ...]
}
```

### osu.Event
```js
Event {
	html: '<img src=\'/images/A_small.png\'/> <b><a href=\'/u/7541046\'>brussell98</a></b> achieved rank #105 on <a href=\'/b/974072?m=0\'>Yousei Teikoku - Torikago [Insane]</a> (osu!)',
	beatmapId: '974072',
	beatmapsetId: '412140',
	date: 2016-08-28T08:21:11.000Z, // a Date object (converted to UTC)
	epicFactor: '1'
}
```

### osu.Beatmap
```js
Beatmap {
	id: '765567',
	hash: '49ae1a43f732d07aff8efab2b0f22bdf',
	title: 'GATE~Sore wa Akatsuki no you ni~ (TV size)',
	creator: 'Del05',
	version: 'Insane',
	source: 'GATE 自衛隊 彼の地にて、斯く戦えり',
	artist: 'KISIDA KYODAN & THE AKEBOSI ROCKETS',
	genre: 'Anime',
	language: 'Japanese',
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
	approvedDate: 2016-03-18T18:21:22.000Z, // a Date object (converted to UTC)
	lastUpdate: 2016-03-02T16:14:22.000Z, // a Date object (converted to UTC)
	beatmapSetId: '346872',
	maxCombo: '549',
	difficulty: {
		rating: '4.496906757354736',
		size: '4',
		overall: '7',
		approach: '9',
		drain: '6'
	},
	time: {
		total: '88',
		drain: '88'
	},
	counts: {
		favorites: '470',
		favourites: '470',
		plays: '407924',
		passes: '71082'
	}
}
```

### osu.Score
```js
Score {
	score: '10223067',
	user: {
		name: 'Jeby',
		id: '3136279'
	},
	beatmapId: null, // Will be null when osu.Api.getScores() is used
	counts: {
		'50': '0',
		'100': '13',
		'300': '406',
		geki: '87',
		katu: '10',
		miss: '0'
	},
	maxCombo: '825',
	perfect: false,
	date: 2016-08-13T03:17:57.000Z, // a Date object (converted to UTC)
	rank: 'SH',
	pp: '148.653',
	mods: [ 'Hidden', 'HardRock', 'DoubleTime', 'FreeModAllowed' ]
}

Score.getAccuracyFromBeatmap(beatmap) => Number
```

### osu.Match
```js
Match {
	id: '27379205',
	name: 'TU PUTA MADREEEEE',
	start: 2016-08-28T17:22:40.000Z, // a Date object (converted to UTC)
	end: null, // Not used
	games: [ Game {...}, ...]
}
```

### osu.Game
```js
Game {
	id: '152178786',
	start: 2016-08-28T17:26:47.000Z, // a Date object (converted to UTC)
	end: 2016-08-28T17:28:22.000Z, // a Date object (converted to UTC) or null
	beatmapId: '55985',
	mode: 'Standard',
	matchType: '0', // Unknown
	scoringType: 'Score',
	teamType: 'Head to Head',
	mods: [ 'Hidden', 'DoubleTime', 'FreeModAllowed' ],
	scores: [ MultiplayerScore {...}, ...] // Will be empty if in progress
}
```

### osu.MultiplayerScore
```js
MultiplayerScore {
	slot: '0',
	team: 'None',
	userId: '7658779',
	score: '238550',
	maxCombo: '113',
	rank: null, // Not used
	counts: {
		'50': '2',
		'100': '27',
		'300': '102',
		geki: '21',
		katu: '14',
		miss: '8'
	},
	perfect: false,
	pass: false
}
```
