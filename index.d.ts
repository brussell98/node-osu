/** Declaration file generated by dts-gen */
export class Api {
    /**
     * Creates a new node-osu object
     * @param {String} apiKey your osu api key
     * @param {Object} [options]
     * @param {String} [options.baseUrl="https://osu.ppy.sh/api"] Sets the base api url
     * @param {Boolean} [options.notFoundAsError=true] Throw an error on not found instead of returning nothing
     * @param {Boolean} [options.completeScores=false] When fetching scores also fetch the beatmap they are for (Allows getting accuracy)
     * @param {Boolean} [options.parseNumeric=false] Parse numeric properties into numbers. May have overflow
     */
    constructor(apiKey: string, options: constructorOptions);

    /**
     * Makes an api call
     * @param {String} endpoint
     * @param {Object} options
     * @param {Date} [options.since] Return all beatmaps ranked or loved since this date
     * @param {String} [options.s] Specify a beatmapSetId to return metadata from
     * @param {String} [options.b] Specify a beatmapId to return metadata from
     * @param {String} [options.u] Specify a userId or a username to return metadata from
     * @param {"string"|"id"} [options.type] Specify if `u` is a userId or a username
     * @param {0|1|2|3} [options.m] Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
     * @param {0|1} [options.a] Specify whether converted beatmaps are included
     * @param {String} [options.h] The beatmap hash
     * @param {Number} [options.limit] Amount of results. Default and maximum are 500
     * @param {Number} [options.mods] Mods that apply to the beatmap requested. Default is 0
     * @param {Number} [options.event_days] Max number of days between now and last event date. Range of 1-31. Default value is 1
     * @param {String} [options.mp] Match id to get information from
     * @returns {Promise<Object>} The response body
     */
    apiCall(endpoint, options: apiCallOptions): Promise<Object>;

    /**
     * Returns an array of Beatmap objects
     * @param {Object} options
     * @param {String} options.b Specify a beatmapId to return metadata from
     * @param {Date} [options.since] Return all beatmaps ranked or loved since this date
     * @param {String} [options.s] Specify a beatmapSetId to return metadata from
     * @param {String} [options.u] Specify a userId or a username to return metadata from
     * @param {"string"|"id"} [options.type] Specify if `u` is a userId or a username
     * @param {0|1|2|3} [options.m] Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
     * @param {0|1} [options.a] Specify whether converted beatmaps are included
     * @param {String} [options.h] The beatmap hash
     * @param {Number} [options.limit] Amount of results. Default and maximum are 500
     * @param {Number} [options.mods] Mods that apply to the beatmap requested. Default is 0
     * @returns {Promise<Beatmap[]>}
     */
    getBeatmaps(options: getBeatmapsOptions): Promise<Beatmap[]>;

    /**
         * Returns a Match object.
         * @param {Object} options
         * @param {String} options.mp Match id to get information from
         * @returns {Promise<Match>}
         */
    getMatch(options: getMatchOptions): Promise<Match>;

    /**
     * Returns a replay object. **Do not spam this endpoint.**
     * @param {Object} options
     * @param {0|1|2|3} options.m Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
     * @param {String} options.b The beatmapId in which the replay was played
     * @param {String} options.u The user that has played the beatmap (required)
     * @param {"string"|"id"} [options.type] Specify if u is a userId or a username
     * @param {Number} [options.mods] Specify a mod or mod combination
     *
     */
    getReplay(options: getReplayOptions): Promise<any>;

    /**
     * Returns an array of Score objects
     * @param {Object} options
     * @param {String} options.b Specify a beatmapId to return score information from
     * @param {String} [options.u] Specify a userId or a username to return information for
     * @param {0|1|2|3} [options.m] Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
     * @param {"string"|"id"} [options.type] Specify if u is a user_id or a username
     * @param {Number} [options.limit] Amount of results from the top (range between 1 and 100 - defaults to 50)
     * @returns {Promise<Score[]>}
     */
    getScores(options: getScoresOptions): Promise<Score[]>;

    /**
     * Returns a User object
     * @param {Object} options
     * @param {String} options.u Specify a userId or a username to return metadata from
     * @param {0|1|2|3} [options.m] Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
     * @param {"string"|"id"} [options.type] Specify if u is a user_id or a username
     * @param {Number} [options.event_days] Max number of days between now and last event date. Range of 1-31. Default value is 1
     * @returns {Promise<User>}
     */
    getUser(options: getUserOptions): Promise<User>;


    /**
     * Returns an array of Score objects
     * @param {Object} options
     * @param {String} options.u Specify a userId or a username to return best scores from
     * @param {0|1|2|3} [options.m] Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
     * @param {"string"|"id"} [options.type] Specify if u is a user_id or a username
     * @param {Number} [options.limit] Amount of results (range between 1 and 100 - defaults to 10)
     * @returns {Promise<Score[]>}
     */
    getUserBest(options: getUserBestOptions): Promise<Score[]>;


    /**
     * Returns an array of Score objects.
     * Will return not found if the user has not submitted any scores in the past 24 hours
     * @param {Object} options
     * @param {String} options.u Specify a userId or a username to return recent plays from
     * @param {0|1|2|3} [options.m] Mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania)
     * @param {"string"|"id"} [options.type] Specify if `u` is a user_id or a username
     * @param {Number} [options.limit] Amount of results (range between 1 and 50 - defaults to 10)
     * @returns {Promise<Score[]>}
     */
    getUserRecent(options: getUserRecentOptions): Promise<Score[]>;

    /**
     * Returns a not found error or the response, depending on the config
     * @param {Object} response
     * @returns {Object}
     */
    notFound(response: notFoundResponse): any;

}

export class Beatmap {
    id: string;
    beatmapSetId: string;
    hash: string;
    title: string;
    creator: string;
    version: string;

    source: string;
    artist: string;
    genre: Constants['Beatmaps']['genre'];
    language: Constants['Beatmaps']['language'];

    rating: number;
    bpm: number;
    mode: Constants['Beatmaps']['mode'];
    tags: string[];
    approvalStatus: Constants['Beatmaps']['approved'];
    raw_submitDate: string;
    raw_approvedDate: string;
    raw_lastUpdate: string;
    maxCombo: number;
    objects: {
        normal: number,
        slider: number,
        spinner: number
    };
    difficulty: {
        rating: number,
        aim: number,
        speed: number,
        size: number,
        overall: number,
        approach: number,
        drain: number
    };
    length: {
        total: number,
        drain: number
    };
    counts: {
        favorites: number,
        favourites: number,
        plays: number,
        passes: number
    };
    hasDownload: boolean;
    hasAudio: boolean;

}

export class Event {
    html: string;
    beatmapId: string;
    beatmapsetId: string;
    raw_date: string;
    epicFactor: number;

}

export class Match {
    id: string;
    name: string;
    raw_start: string;
    raw_end: string;
    games: Game[];

    // Getters
    start: Date;
    end: Date

}

export class Game {
    id: string;
    raw_start: string;
    raw_end: string;
    beatmapId: string;
    mode: string;
    matchType: string; // Unknown purpose
    scoringType: string;
    teamType: string;
    raw_mods: number;
    scores: MultiplayerScore[] // Will be empty if in progress

    // Getters
    start: Date;
    end: Date;
    mods: Constants['Mods'][] // Array of `Constants.Mods` required for all players

}

export class MultiplayerScore {
    constructor(...args: any[]);

}

export class Score {
    score: number;
    user: {
        'name': string | null,
        'id': string
    };
    beatmapId: string | Beatmap;
    counts: {
        '300': number,
        '100': number,
        '50': number,
        'geki': number,
        'katu': number,
        'miss': number
    };
    maxCombo: number;
    perfect: boolean;
    raw_date: string;
    rank: string;
    pp: number;
    hasReplay: boolean;

    raw_mods: number;

    beatmap: Beatmap;

    date: Date | string;

    mods: string[] | string;

    accuracy: undefined | string | number;
}

export class User {
    id: number;
    name: string;
    counts: {
        '300': number,
        '100': number,
        '50': number,
        'SSH': number,
        'SS': number,
        'SH': number,
        'S': number,
        'A': number,
        'plays': number
    };
    scores: {
        ranked: number;
        total: number;
    };
    pp: {
        raw: Number,
        rank: Number,
        countryRank: Number
    };
    country: string;
    level: number;
    accuracy: number;
    secondsPlayed: number;
    raw_joinDate: string;
    events;

    joinDate: Date | string;
    accuracyFormatted: string
}

export class Constants {
    AccuracyMethods: {
        "Catch the Beat": any;
        Mania: any;
        Standard: any;
        Taiko: any;
    };
    Beatmaps: {
        approved: {
            "-1": string;
            "-2": string;
            "0": string;
            "1": string;
            "2": string;
            "3": string;
            "4": string;
        };
        genre: {
            "0": string;
            "1": string;
            "10": string;
            "2": string;
            "3": string;
            "4": string;
            "5": string;
            "6": string;
            "7": string;
            "9": string;
        };
        language: {
            "0": string;
            "1": string;
            "10": string;
            "11": string;
            "2": string;
            "3": string;
            "4": string;
            "5": string;
            "6": string;
            "7": string;
            "8": string;
            "9": string;
        };
        mode: {
            "0": string;
            "1": string;
            "2": string;
            "3": string;
        };
    };
    Mods: {
        Autoplay: number;
        Cinema: number;
        DoubleTime: number;
        Easy: number;
        FadeIn: number;
        Flashlight: number;
        FreeModAllowed: number;
        HalfTime: number;
        HardRock: number;
        Hidden: number;
        Key1: number;
        Key2: number;
        Key3: number;
        Key4: number;
        Key5: number;
        Key6: number;
        Key7: number;
        Key8: number;
        Key9: number;
        KeyCoop: number;
        KeyMod: number;
        Nightcore: number;
        NoFail: number;
        None: number;
        Perfect: number;
        Random: number;
        Relax: number;
        Relax2: number;
        ScoreIncreaseMods: number;
        SpunOut: number;
        SuddenDeath: number;
        Target: number;
        TouchDevice: number;
    };
    Multiplayer: {
        scoringType: {
            "0": string;
            "1": string;
            "2": string;
            "3": string;
        };
        team: {
            "0": string;
            "1": string;
            "2": string;
        };
        teamType: {
            "0": string;
            "1": string;
            "2": string;
            "3": string;
        };
    };
    URLSchemas: {
        channel: any;
        download: any;
        edit: any;
        multiplayerMatch: any;
        spectate: any;
    };
}


//Options

declare class constructorOptions {
    baseUrl?: boolean;
    notFoundAsError?: boolean;
    completeScores?: boolean;
    parseNumeric?: boolean;
}

declare class apiCallOptions {
    since?: Date
    s?: string;
    b?: string
    u?: string;
    type?: 'string' | 'id';
    m?: 0 | 1 | 2 | 3;
    a?: 0 | 1;
    h?: string;
    limit?: number;
    mods?: number;
    event_days?: number;
    mp?: string;
}

declare class getBeatmapsOptions {
    b?: string;
    since?: Date;
    s?: string;
    u?: string;
    type?: 'string' | 'id';
    m?: 0 | 1 | 2 | 3;
    a?: 0 | 1;
    h?: string;
    limit?: number;
    mods?: number;
}
declare class getMatchOptions {
    mp?: string;
}

declare class getReplayOptions {
    m?: 0 | 1 | 2 | 3;
    b?: string;
    u?: string;
    type?: 'string' | 'id';
    mods?: number;
}

declare class getScoresOptions {
    b?: string;
    u?: string;
    m?: 0 | 1 | 2 | 3;
    type?: 'string' | 'id';
    limit?: number;
}

declare class getUserOptions {
    u?: string;
    m?: 0 | 1 | 2 | 3;
    type?: 'string' | 'id';
    event_days?: number;
}

declare class getUserBestOptions {
    u?: string;
    m?: 0 | 1 | 2 | 3;
    type?: 'string' | 'id';
    limit?: number;
}

declare class getUserRecentOptions {
    u?: string;
    m?: 0 | 1 | 2 | 3;
    type?: 'string' | 'id';
    limit?: number;
}

declare class notFoundResponse {
    response?: object;
}
