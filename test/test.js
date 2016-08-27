"use strict";

var expect = require('chai').expect,
	osu = require('../index.js');

try {
	var apiKey = process.env.osuApiKey || (require('fs')).readFileSync(__dirname + '/auth.txt'),
		osuApi = new osu.Api(apiKey);
} catch(error) {
	if (error.code === 'ENOENT') {
		console.error('No osuApiKey environment variable or auth.txt file found.\nPlease create one and place your api key in it.');
		process.exit(0);
	} else
		throw error;
}

describe('osu!api methods', function() {
	describe('getUser()', function() {
		it('Should resolve with a valid User', function() {
			osuApi.getUser({u: 'brussell98'}).then(user => {
				expect(user).to.be.an.instanceof(osu.User);
				expect(user.username).to.equal('brussell98');
				expect(user.scores.total).to.be.a('string');
				if (user.events.length !== 0)
					expect(user.events[0]).to.be.instanceof(osu.Event);
					expect(parseInt(user.events[0].epicFactor)).to.be.within(1, 32);
					expect(user.events[0].dateUTC).to.be.a('date');
			});
		});

		it('Should reject when given an invalid user', function() {
			osuApi.getUser({u: ''}).catch(error => {
				expect(error).to.be.an('error');
				expect(error.message).to.be('User not found');
			})
		});
	});

	describe('getScores()', function() {
		it('Should resolve with an array of valid Scores', function() {
			osuApi.getScores({b: '1036655'}).then(scores => {
				expect(scores).to.be.an('array');
				expect(scores).to.have.length(50);
				expect(scores[0]).to.be.an.instanceof(osu.Score);
				expect(scores[0].user.username).to.be.a('string');
				expect(scores[0].perfect).to.be.a('boolean');
				expect(scores[0].pp).to.not.equal(null);
				expect(scores[0].dateUTC).to.be.a('date');
				if (scores[0].mods.length !== 0)
					expect(scores[0].mods[0]).to.be.a('string');
			});
		});
	});

	describe('getBeatmaps()', function() {
		it('Should resolve with an array of valid Beatmaps', function() {
			osuApi.getBeatmaps({b: '765567'}).then(beatmaps => {
				expect(beatmaps).to.be.an('array');
				expect(beatmaps).to.have.length(1);
				expect(beatmaps[0]).to.be.an.instanceof(osu.Beatmap);
				expect(beatmaps[0].source).to.equal('GATE 自衛隊 彼の地にて、斯く戦えり');
				expect(beatmaps[0].tags).to.be.an('array');
				expect(beatmaps[0].approvedDate).to.be.a('date');
				expect(beatmaps[0].language).to.be.one.of(osu.Constants.Beatmaps.language);
			});
		});
	});
});
