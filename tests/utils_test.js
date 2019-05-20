const assert = require('assert');
import { isValidDate, isValidNumber, formatDate } from '../src/utils';

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
            it(`should  return true for date format ${tCase.in}`, function () {
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
            it(`should  return true for number input ${tCase.in}`, function () {
                assert.equal(isValidNumber(tCase.in), tCase.want)
            });
        })

    });

    describe('Tests for date formater', function () {
        let cases = [
            { in: "2018-12-26 18:11:08.509654", want: "2018-12-26 18:11:00" },

        ]

        cases.forEach(tCase => {
            it(`should format datestring ${tCase.in}`, function () {
                assert.equal(formatDate(tCase.in), tCase.want)
            });
        })

    });
});