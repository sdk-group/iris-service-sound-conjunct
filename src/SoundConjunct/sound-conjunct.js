'use strict'

let emitter = require("global-queue");

class SoundConjunct {
	constructor() {
		this.emitter = emitter;
	}

	init() {}

	//API
	actionMakePhrase({
		sound_names,
		outname
	}) {
		var formats = ["oga", "m4a", "mp3", "ogg", "aac"];
		return transcode(sound_names, path.resolve(__dirname, outname), formats);
	}



}

module.exports = SoundConjunct;