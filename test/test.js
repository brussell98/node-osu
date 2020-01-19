const expect = require('chai').expect;
const osu = require('../index.js');
const osuApi = new osu.Api();

try {
	osuApi.apiKey = process.env.osuApiKey || (require('fs')).readFileSync(__dirname + '/auth.txt');
} catch(error) {
	if (error.code === 'ENOENT')
		throw new Error('No osuApiKey environment variable or auth.txt file found. Please create one and place your api key in it.');
	else
		throw error;
}

describe('osu!api methods', function() {
	describe('getUser()', function() {
		it('Should resolve with a valid User', function() {
			return osuApi.getUser({ u: 'brussell98' }).then(user => {
				expect(user).to.be.an.instanceof(osu.User);
				expect(user.name).to.equal('brussell98');
				expect(user.scores.total).to.be.a('string');

				if (user.events.length !== 0) {
					expect(user.events[0]).to.be.instanceof(osu.Event);
					expect(parseInt(user.events[0].epicFactor)).to.be.within(1, 32);
					expect(user.events[0].date).to.be.a('date');
				}
			}).catch(error => {
				throw error;
			});
		});

		it('Should reject when given an invalid user', function() {
			return osuApi.getUser({ u: '' }).catch(error => {
				expect(error).to.be.an('error');
				expect(error.message).to.equal('Not found');
			});
		});
	});

	describe('getScores()', function() {
		it('Should resolve with an array of valid Scores', function() {
			return osuApi.getScores({ b: '1036655' }).then(scores => {
				expect(scores).to.be.an('array');
				expect(scores).to.have.lengthOf(50);
				expect(scores[0]).to.be.an.instanceOf(osu.Score);
				expect(scores[0].user.name).to.be.a('string');
				expect(scores[0].perfect).to.be.a('boolean');
				expect(scores[0].pp).to.not.equal(null);
				expect(scores[0].date).to.be.a('date');

				if (scores[0].mods.length !== 0)
					expect(scores[0].mods[0]).to.be.a('string');
			}).catch(error => {
				throw error;
			});
		});
	});

	describe('getBeatmaps()', function() {
		it('Should resolve with an array of valid Beatmaps', function() {
			return osuApi.getBeatmaps({ b: '765567' }).then(beatmaps => {
				expect(beatmaps).to.be.an('array');
				expect(beatmaps).to.have.lengthOf(1);
				expect(beatmaps[0]).to.be.an.instanceOf(osu.Beatmap);
				expect(beatmaps[0].source).to.equal('GATE 自衛隊 彼の地にて、斯く戦えり');
				expect(beatmaps[0].tags).to.be.an('array');
				expect(beatmaps[0].approvedDate).to.be.a('date');
				expect(beatmaps[0].hasDownload).to.be.true;

				const langs = [];
				for (const lang in osu.Constants.Beatmaps.language)
					langs.push(osu.Constants.Beatmaps.language[lang]);
				expect(beatmaps[0].language).to.be.oneOf(langs);
			}).catch(error => {
				throw error;
			});
		});
	});

	describe('getUserBest()', function() {
		it('Should resolve with an array of valid Scores', function() {
			return osuApi.getUserBest({ u: 'brussell98' }).then(scores => {
				expect(scores).to.be.an('array');
				expect(scores).to.have.length.below(11);
				expect(scores[0]).to.be.an.instanceOf(osu.Score);
				expect(scores).to.satisfy(scores => scores.filter(s => s.pp && s.beatmapId).length === scores.length);
				expect(scores[4].date).to.be.a('date');
				expect(scores[7].perfect).to.be.a('boolean');
				expect(scores[2].mods).to.be.an('array');
				expect(scores[0].beatmap).to.equal(undefined);
			}).catch(error => {
				throw error;
			});
		});
	});

	describe('getUserRecent()', function() {
		it('Should resolve with an array of valid Scores', function() {
			return osuApi.getUserRecent({ u: 'brussell98' }).then(scores => {
				expect(scores).to.be.an('array');
				expect(scores).to.have.length.below(11);
				expect(scores[0]).to.be.an.instanceOf(osu.Score);
				expect(scores).to.satisfy(scores => scores.filter(s => s.score && s.beatmapId).length === scores.length);
				expect(scores[4].date).to.be.a('date');
				expect(scores[3].perfect).to.be.a('boolean');
				expect(scores[2].mods).to.be.an('array');
			}).catch(error => {
				throw error;
			});
		});
	});

	describe('new Match()', function() {
		it('Should return a valid Match', function() {
			const sampleMatch = require('./sampleMatch.json');
			const match = new osu.Match({ }, sampleMatch);
			expect(match.start).to.be.a('date');
			expect(match.name).to.equal(sampleMatch.match.name);
			expect(match.games).to.be.an('array');

			const modes = [];
			const scoringTypes = [];
			const teamTypes = [];
			const teams = [];
			for (const mode in osu.Constants.Beatmaps.mode)
				modes.push(osu.Constants.Beatmaps.mode[mode]);
			for (const st in osu.Constants.Multiplayer.scoringType)
				scoringTypes.push(osu.Constants.Multiplayer.scoringType[st]);
			for (const tt in osu.Constants.Multiplayer.teamType)
				teamTypes.push(osu.Constants.Multiplayer.teamType[tt]);
			for (const team in osu.Constants.Multiplayer.team)
				teams.push(osu.Constants.Multiplayer.team[team]);

			expect(match.games[0]).to.be.an.instanceOf(osu.Game);
			expect(match.games[7].scores[0].mods).to.include.members(['NoFail', 'DoubleTime']);
			expect(match.games[0].beatmapId).to.equal(sampleMatch.games[0].beatmap_id);
			expect(match.games[2].mode).to.be.oneOf(modes);
			expect(match.games[2].scoringType).to.be.oneOf(scoringTypes);
			expect(match.games[2].teamType).to.be.oneOf(teamTypes);

			expect(match.games[2].scores).to.be.an('array');
			expect(match.games[2].scores[0]).to.be.an.instanceOf(osu.MultiplayerScore);
			expect(match.games[2].scores[0].team).to.be.oneOf(teams);
			expect(match.games[2].scores[0].pass).to.equal(sampleMatch.games[2].scores[0].pass === '1');
		});
	});

	describe('Scores with competeScores enabled', function() {
		it('Should have a beatmap included', async function() {
			osuApi.completeScores = true;

			const scores = await osuApi.getScores({ u: 'brussell98', b: '1416386', limit: 1 });
			const scoresBest = await osuApi.getUserBest({ u: 'brussell98', limit: 1 });

			expect(scores[0].beatmapId).to.equal('1416386');
			expect(scores[0].beatmap).to.be.an.instanceof(osu.Beatmap);

			expect(scoresBest[0].beatmapId).to.exist;
			expect(scoresBest[0].beatmap).to.be.an.instanceof(osu.Beatmap);

			osuApi.completeScores = false;
		});

		it('Should compute accuracy correctly', async function() {
			osuApi.completeScores = true;

			const scores = await osuApi.getScores({ u: 'brussell98', b: '1416386', limit: 1 });

			expect(scores[0].accuracy).to.be.closeTo(.9658, .0001);

			osuApi.completeScores = false;
		});
	});

	describe('parseNumeric', function() {
		it('Should return numeric non-id values as numbers', function() {
			osuApi.parseNumeric = true;

			return osuApi.getScores({ b: '1036655' }).then(scores => {
				expect(scores[0].user.id).to.be.a('string');
				expect(scores[0].pp).to.be.a('number');

				osuApi.parseNumeric = false;
			}).catch(error => {
				throw error;
			});
		});
	});
});
