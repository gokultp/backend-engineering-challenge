const assert = require('assert');
import { isValidDate, isValidNumber } from '../src/utils';

describe('Test for Utils', function () {
    describe('Tests for date validator', function () {
        let cases = [
            { in: "2018-12-26 18:12:19.903159", want: true },
            { in: "2018-12-26 18:12:19", want: true },
            { in: "2018-12-26 18:12", want: true },
            { in: "2018-12-26", want: true },
            { in: "2018-12", want: true },
            { in: "2018", want: true },
            { in: "2018-as", want: false },
            { in: null, want: false },


        ]

        cases.forEach(tCase => {
            it(`should resolve return true for date format ${tCase.in}`, function () {
                assert.equal(isValidDate(tCase.in), tCase.want)
            });
        })

    });

    describe('Tests for number validator', function () {
        let cases = [
            { in: 1, want: true },
            { in: 10, want: true },
            { in: "as", want: false },
            { in: "2018-12-26", want: false },
            { in: null, want: false}

        ]

        cases.forEach(tCase => {
            it(`should resolve return true for number input ${tCase.in}`, function () {
                assert.equal(isValidNumber(tCase.in), tCase.want)
            });
        })

    });
});