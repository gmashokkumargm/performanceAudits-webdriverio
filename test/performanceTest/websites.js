import allure from '@wdio/allure-reporter';
import data from '../../data/urls';

describe('Performance test', () => {
	before(() => {
		browser.enablePerformanceAudits();
	});

	it('Verify the performance matrices', () => {
		data.URLS.forEach((ele) => {
			browser.url(ele);
			let url = browser.getUrl().split('.com');
			url = url[1];
			let score = browser.getPerformanceScore();
			let status = score >= 0.8 ? 'passed' : 'failed';
			allure.addStep(`Performance Score: ${url} --> ${score * 100}%`, {}, status);
		});
	});

	after(() => {
		browser.disablePerformanceAudits();
	});
});
