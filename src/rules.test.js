import getNextGeneration from './rules'
import math from "mathjs"

// TODO - reuse test code for cleaner testing
function describeNextGeneration(description, expected_result, prev_generation) {
    it(description, () => {
        let nextGen = getNextGeneration(math.matrix(prev_generation));
        expect(nextGen).toEqual(math.matrix(expected_result));
    });
}

const t = true;
const f = false;

describeNextGeneration(
    "Handle starvation center alive, all dead neighbors 3x3",
    [
        [f, f, f],
        [f, f, f],
        [f, f, f],
    ], [
        [f, f, f],
        [f, t, f],
        [f, f, f],
    ],
);

describe("Trivial matrices", () => {

    it('Handles empty matrix', () => {
        let nextGen = getNextGeneration(math.matrix());
        expect(nextGen).toEqual(math.matrix());
    });

    it('Handles 1x1 matrix dead', () => {
        let nextGen = getNextGeneration(math.matrix([[false]]));
        expect(nextGen).toEqual(math.matrix([[false]]));
    });

    it('Handles 1x1 matrix alive', () => {
        let nextGen = getNextGeneration(math.matrix([[true]]));
        expect(nextGen).toEqual(math.matrix([[false]]));
    });
});

describe("Edge matrices", () => {

    it('Handles 1x3 matrix, all dead', () => {
        let nextGen = getNextGeneration(math.matrix([[false, false, false]]))
        expect(nextGen).toEqual(math.matrix([[false, false, false]]));
    });

    it('Handles 1x3 matrix, bottom alive', () => {
        let nextGen = getNextGeneration(math.matrix([[false, false, true]]))
        expect(nextGen).toEqual(math.matrix([[false, false, false]]));
    });

    it('Handles 1x3 matrix, all alive', () => {
        let nextGen = getNextGeneration(math.matrix([[true, true, true]]))
        expect(nextGen).toEqual(math.matrix([[false, true, false]]));
    });
})

describe("3x3 all scenarios", () => {

    it('Handles starvation all dead (trivial)', () => {
        let nextGen = getNextGeneration(math.matrix([[false, false, false],
                                                     [false, false, false], 
                                                     [false, false, false]]));
        expect(nextGen).toEqual(math.matrix([[false, false, false],
                                             [false, false, false], 
                                             [false, false, false]]));
    });

    it('Handles survival with 3 live neighbors', () => {
        let nextGen = getNextGeneration(math.matrix([[true, true, false],
                                                     [true, true, false], 
                                                     [false, false, false]]));
        expect(nextGen).toEqual(math.matrix([[true, true, false],
                                             [true, true, false], 
                                             [false, false, false]]));
    });

    it('Handles starvation <2 live neighbors', () => {
        let nextGen = getNextGeneration(math.matrix([[true, true, false],
                                                     [false, false, true], 
                                                     [false, false, true]]));
        expect(nextGen).toEqual(math.matrix([[false, true, false],
                                             [false, false, true], 
                                             [false, false, false]]));
    });

    it('Handles birth with exactly 3 live neighbors', () => {
        let nextGen = getNextGeneration(math.matrix([[false, true, false],
                                                     [true, true, false], 
                                                     [false, false, false]]));
        expect(nextGen).toEqual(math.matrix([[true, true, false],
                                             [true, true, false], 
                                             [false, false, false]]));
    });

    it('Handles overpopulation >3 live neighbors', () => {
        let nextGen = getNextGeneration(math.matrix([[false, true, false],
                                                     [true, true, true], 
                                                     [false, true, false]]));
        expect(nextGen).toEqual(math.matrix([[true, true, true],
                                             [true, false, true], 
                                             [true, true, true]]));
    });
});