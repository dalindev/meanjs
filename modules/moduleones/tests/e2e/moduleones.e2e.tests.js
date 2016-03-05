'use strict';

describe('Moduleones E2E Tests:', function () {
  describe('Test Moduleones page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/moduleones');
      expect(element.all(by.repeater('moduleone in moduleones')).count()).toEqual(0);
    });
  });
});
