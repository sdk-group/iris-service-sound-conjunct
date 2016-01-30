'use strict'

let events = {
	sound_conjunct: {}
};

let tasks = [];

module.exports = {
	module: require('./sound-conjunct.js'),
	permissions: [],
	exposed: true,
	tasks: tasks,
	events: {
		group: 'sound-conjunct',
		shorthands: events.sound_conjunct
	}
};