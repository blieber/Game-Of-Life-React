// Learning tests for using matrix from mathjs

import math from 'mathjs'
import range from 'range-function'

describe("2D Matrix", () => {
    const m = math.matrix([[true, false], [true, true]]);

    it('Has expected size.', () => {
        expect(m.size()).toEqual([2, 2]);
    });

    it('Can be accessed by nested-index', () => {
        expect(m.get([0, 0])).toBe(true);
        expect(m.get([0, 1])).toBe(false);
        expect(m.get([1, 0])).toBe(true);
        expect(m.get([1, 1])).toBe(true);
    });

    it('Can be cloned', () => {
        const copy = m.clone();
        expect(copy).toEqual(m);
        expect(copy).not.toBe(m);
    });

    it('Can set by nested-index', () => {
        let m2 = m.clone();
        m2.set([0, 0], false)
        expect(m2.get([0, 0])).toBe(false);
    });

    it('Can map range', () => {
        let mapped_range = range(0, m.size()[0]).map(i => i+1)
        expect(mapped_range).toEqual([1, 2])
    });
});