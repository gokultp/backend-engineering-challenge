const assert = require('assert');
import Aggregator from '../src/aggregator';

describe('Test for Arggregator', function() {
  describe('Tests for parse', function() {
    this.timeout(500);
    let a = new Aggregator();
    it('should resolve while parsing a valid JSON', function() {
      a.parse('{"a":1}').then(data=>{
        assert.deepEqual(data, {a:1})
      })
    });
    it('should reject while parsing an invalid JSON', function() {
      a.parse('{"a":1}').catch(err=>{
        asser.asser(err != null);
      })
    });
  });
});