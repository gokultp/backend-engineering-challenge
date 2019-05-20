const assert = require('assert');
import Aggregator from '../src/aggregator';

describe('Test for Arggregator', function () {
  describe('Tests for parse', function () {
    this.timeout(500);
    let a = new Aggregator();
    it('should resolve while parsing a valid JSON', function () {
      a.parse('{"a":1}').then(data => {
        assert.deepEqual(data, { a: 1 })
      })
    });
    it('should reject while parsing an invalid JSON', function () {
      a.parse('{"a":1}').catch(err => {
        assert.assert(err != null);
      })
    });
  });

  describe('Tests for validate', function () {
    this.timeout(500);
    let a = new Aggregator();
    it('should resolve while parsing a valid data', function () {
      let inp = {
        "timestamp": "2018-12-26 18:12:19.903159",
        "translation_id": "5aa5b2f39f7254a75aa4",
        "source_language": "en",
        "target_language": "fr",
        "client_name": "easyjet",
        "event_name": "translation_delivered",
        "duration": 20,
        "nr_words": 100
      }
      a.validate(inp).then(data => {
        assert.deepEqual(data, inp)
      })
    });

    let cases = [
      {case : "there is no timestamp", in: {"duration": 20}, want: "Invalid value for the field timestamp"},
      {case : "invalid value for timestamp", in: {"timestamp": "asdf"}, want: "Invalid value for the field timestamp"},
      {case : "there is no duration", in: {"timestamp": "2018-12-26 18:12:19.903159"}, want: "Invalid value for the field duration"},
      {case : "invalid value for duration", in: {"timestamp": "2018-12-26 18:12:19.903159", "duration": "asdf"}, want: "Invalid value for the field duration"},

    ] 

    cases.forEach(tCase=>{
      it(`should reject if ${tCase.case}`, function () {
        a.validate(tCase.in).catch(err => {
          assert.equal(err.message, tCase.want);
        })
      });
    })
    
  });
});