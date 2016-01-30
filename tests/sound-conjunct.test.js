'use strict'

let SoundConjunct = require("./SoundConjunct/sound-conjunct");
let config = require("./config/db_config.json");

describe("SoundConjunct service", () => {
	let service = null;
	let bucket = null;
	before(() => {
		service = new SoundConjunct();
		service.init();
	});
	describe("SoundConjunct service", () => {
		it("should mark ticket called", (done) => {
			return service.actionTicketCalled()
				.then((res) => {
					console.log(res);
					done();
				})
				.catch((err) => {
					done(err);
				});
		})
	})

});