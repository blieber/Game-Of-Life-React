import getNextGeneration from './rules'
import math from "mathjs"

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