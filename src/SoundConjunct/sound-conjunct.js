'use strict'

let emitter = require("global-queue");
let sound_util = require('sound-conjunct');
let path = require('path');

class SoundConjunct {
	constructor() {
		this.emitter = emitter;
	}

	init({
		sound_params, output_directory, theme_params
	}) {
		let def_opts = {
			bits: 16,
			rate: 24000,
			voice_pause: 200
		};

		this.theme_folder = path.resolve(__dirname, "../../themes");
		this.sound_params = _.assignWith(def_opts, sound_params, (objValue, srcValue) => {
			return _.isUndefined(objValue) ? srcValue : objValue;
		});

		this.output_directory = output_directory || __dirname;
	}

	//API
	actionMakePhrase({
		sound_names,
		sound_theme,
		outname
	}) {
		let fnames = _.map(sound_names, (name) => path.resolve(this.theme_folder, sound_theme, name));
		let out = path.resolve(this.output_directory, outname);
		return sound_util.concatenate(fnames, out, this.sound_params);
	}



}

module.exports = SoundConjunct;