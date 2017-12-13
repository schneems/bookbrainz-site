/*
 * Copyright (C) 2016  Max Prettyjohns
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import * as common from './common';
import * as testData from '../data/test-data.js';
import orm from './bookbrainz-data';
import rewire from 'rewire';


const Achievement = rewire('../lib/server/helpers/achievement.js');

const thresholdI = 1;
const thresholdII = 10;
const thresholdIII = 100;

function rewireTypeCreation(threshold) {
	return common.rewireAchievementTypeCreation(Achievement, 'work', threshold);
}

function generate() {
	return common.generate(Achievement, orm, true, 'workerBee');
}

function generateLabeled(rev) {
	return common.generate(
		Achievement, orm, true, 'workerBee', `Worker Bee ${rev}`
	);
}

function expectIds(rev) {
	return common.expectIds('workerBee', rev);
}

function expectAllNamedIds(rev) {
	return common.expectIdsNested('Worker Bee', 'workerBee', rev);
}

export default function tests() {
	beforeEach(() => testData.createWorkerBee());
	afterEach(testData.truncate);

	const test1 = common.testAchievement(
		rewireTypeCreation(thresholdI),
		generateLabeled('I'),
		expectIds('I')
	);
	it('I should be given to someone with a work creation', test1);

	const test2 = common.testAchievement(
		rewireTypeCreation(thresholdII),
		generateLabeled('II'),
		expectIds('II')
	);
	it('II should be given to someone with 10 work creations', test2);

	const test3 = common.testAchievement(
		rewireTypeCreation(thresholdIII),
		generate(),
		expectAllNamedIds('III')
	);
	it('III should be given to someone with 100 work creations', test3);

	const test4 = common.testAchievement(
		rewireTypeCreation(0),
		generateLabeled('I'),
		common.expectFalse()
	);
	it('should not be given to someone with 0 work creations', test4);
}
