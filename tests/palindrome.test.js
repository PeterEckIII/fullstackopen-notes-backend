const palindrome = require('../utils/for_testing').palindrome;

test('Palindrome of a', () => {
    const result = palindrome('a');
    expect(result).toBe('a');
})

test('Palindrome of React', () => {
    const result = palindrome('react');
    expect(result).toBe('tcaer');
})

test('Palindrome of Releveler', () => {
    const result = palindrome('releveler');
    expect(result).toBe('releveler')
})
