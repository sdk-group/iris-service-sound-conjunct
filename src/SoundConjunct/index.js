'use strict'

let events = {
	sound_conjunct: {}
};

let tasks = [];

module.exports = {
	module: require('./sound-conjunct.js'),
	name: 'sound-conjunct',
	permissions: [],
	exposed: true,
	tasks: tasks,
	events: {
		group: 'sound-conjunct',
		shorthands: events.sound_conjunct
	}
};