'use strict'


let sound_util = require('sound-conjunct');
let path = require('path');
let fs = Promise.promisifyAll(require("fs"));
let getDuration = require('get-audio-duration');

class SoundConjunct {
	constructor() {
		this.emitter = message_bus;
	}

	init({
		sound_params,
		output_directory,
		theme_params
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
	actionAudioMetadata({
		fpath
	}) {
		if (!fpath)
			return false;
		return getDuration(fpath)
			.then((duration) => {
				return {
					audio: {
						length: duration
					}
				};
			})
			.catch((err) => {
				console.log("AUDIO MD ERR", err.message);
				global.logger && logger.error(
					err, {
						module: 'sound-conjunct',
						method: 'audio-metadata'
					});
				return false;
			});
	}

	actionMakePhrase({
		sound_names,
		sound_theme,
		outname
	}) {
		let fnames = _.map(sound_names, (name) => path.resolve(this.theme_folder, sound_theme, name));
		let out = path.resolve(this.output_directory, outname);

		return fs.statAsync(out)
			.then((stat) => {
				return stat.isFile();
			})
			.catch(err => false)
			.then((res) => {
				return !res && sound_util.concatenate(fnames, out, this.sound_params);
			})
			.catch((err) => {
				console.log("OUTNAME", out, err.message);
				global.logger && logger.error(
					err, {
						module: 'sound-conjunct',
						method: 'make-phrase',
						out
					});
			})
			.then(() => {
				global.logger && logger.info("Sox command finalized for %s", out);
				return out;
			});
	}


}

module.exports = SoundConjunct;