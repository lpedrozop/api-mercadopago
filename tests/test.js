import calculator from '../helpers/calculator.js'

test('adding two numbers', () => {
    expect(calculator.sum(3,4).toBe(7))
});

test('subtracting two numbers', () => {
    expect(calculator.subtract(3,4).toBe(-1));
});