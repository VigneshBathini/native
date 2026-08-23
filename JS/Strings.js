// ============================================================
// STRING QUESTIONS — OVERALL REVISION
// ============================================================


// ============================================================
// String Q1 — Reverse a String
// ============================================================

// Given:
// const str = "hello";

// Expected:
// "olleh"

// Don't use:
// reverse()

// Index:
// 0 → h
// 1 → e
// 2 → l
// 3 → l
// 4 → o

const str = "hello";

let result = "";

// Start from last index
for (let i = str.length - 1; i >= 0; i--) {

    // Add current character
    result = result + str[i];
}

console.log("res", result);
// "olleh"


// ============================================================
// String Q2 — Palindrome
// ============================================================

// A palindrome reads the same forward and backward.

// "madam" → true
// "hello" → false
// "level" → true

function isPalindrome(str) {

    let res = "";

    // Reverse the string
    for (let i = str.length - 1; i >= 0; i--) {

        // Build reversed string
        res += str[i];
    }

    // Compare original with reversed
    return str === res;
}

const palindromeResult = isPalindrome("madam");

console.log("result", palindromeResult);
// true

// Interview explanation:
// I reverse the string using a backward loop and compare
// the reversed string with the original.
// If both are equal, it is a palindrome.


// ============================================================
// String Q3 — Count Characters
// ============================================================

// Given:
// const str = "hello";

// Expected:
// h → 1
// e → 1
// l → 2
// o → 1

function countCharacters(str) {

    let count = {};

    // Traverse every character
    for (let i = 0; i < str.length; i++) {

        // Get current character
        let char = str[i];

        // Character already exists
        if (count[char]) {

            // Increase count
            count[char]++;

        } else {

            // First occurrence
            count[char] = 1;
        }
    }

    return count;
}

console.log("count", countCharacters("hello"));

// Important pattern:
//
// if exists → ++
// else → 1


// ============================================================
// String Q4 — First Non-Repeating Character
// ============================================================

// Given:
// "aabbcde"

// Expected:
// c

// Because:
// a → 2
// b → 2
// c → 1 ← first non-repeating
// d → 1
// e → 1

function firstNonRepeating(str) {

    let count = {};

    // Step 1: Count each character
    for (let i = 0; i < str.length; i++) {

        let char = str[i];

        if (count[char]) {

            // Already exists
            count[char]++;

        } else {

            // First occurrence
            count[char] = 1;
        }
    }

    // Step 2: Traverse again
    for (let i = 0; i < str.length; i++) {

        // Find first character with count 1
        if (count[str[i]] === 1) {

            // Return character, not count
            return str[i];
        }
    }

    // Nothing found
    return null;
}

console.log(firstNonRepeating("aabbcde"));
// c

// Important pattern:
//
// Pass 1 → count
// Pass 2 → find first count === 1


// ============================================================
// String Q5 — Remove Duplicate Characters
// ============================================================

// Given:
// "programming"

// Expected:
// "progamin"

function removeDup(str) {

    let res = "";

    // Traverse every character
    for (let i = 0; i < str.length; i++) {

        // Add only if character is not present
        if (!res.includes(str[i])) {

            // Add character
            res = res + str[i];
        }
    }

    return res;
}

console.log(removeDup("programming"));
// "progamin"


// ============================================================
// String Q6 — Anagram
// ============================================================

// Example:
// "listen" and "silent" → true

function isAnagram(str1, str2) {

    // Different lengths → not anagrams
    if (str1.length !== str2.length) {
        return false;
    }

    let count = {};

    // Step 1: Count characters in str1
    for (let i = 0; i < str1.length; i++) {

        if (count[str1[i]]) {

            // Character already exists
            count[str1[i]]++;

        } else {

            // First occurrence
            count[str1[i]] = 1;
        }
    }

    // Step 2: Consume characters using str2
    for (let i = 0; i < str2.length; i++) {

        // Character exists
        if (count[str2[i]]) {

            // Use one occurrence
            count[str2[i]]--;

        } else {

            // Character missing
            return false;
        }
    }

    // All characters matched
    return true;
}

console.log(isAnagram("listen", "silent"));
// true

console.log(isAnagram("hello", "world"));
// false

console.log(isAnagram("anagram", "nagaram"));
// true

// Interview explanation:
//
// First check length.
// Then count characters in str1.
// While traversing str2, decrease the count.
// If a character doesn't exist or its count is 0,
// return false.
// Otherwise return true.


// ============================================================
// Extra — Understanding Object Access
// ============================================================

let str1 = "hello";

let count1 = {
    h: 1
};

for (let i = 0; i < str1.length; i++) {

    // Current character
    console.log(str1[i]);

    // Access value using key
    console.log(count1["h"]);
}

// h → 1
// e → 1
// l → 1
// l → 1
// o → 1

// Important:
//
// count1["h"]
//
// means:
// Go to object → find key "h" → get its value


// ============================================================
// String Q7 — Longest Word
// ============================================================

// Expected:
// developer

// Hint:
// Get each word.
// Keep longest word.
// Compare lengths.

function longestWord(str) {

    // Convert string into words
    const words = str.split(" ");

    let longest = "";

    // Traverse all words
    for (let i = 0; i < words.length; i++) {

        // Current word is longer
        if (words[i].length > longest.length) {

            // Update longest word
            longest = words[i];
        }
    }

    return longest;
}

console.log(
    longestWord(
        "I am a React Native developer having Architect role"
    )
);

// "developer"

// developer and Architect both have 9 characters.
// Because we use > instead of >=,
// the first 9-character word remains.


// ============================================================
// String Q8 — Count Vowels
// ============================================================

// Given:
// "react native"

// Expected:
// 5

// Vowels:
// a e i o u

function countVowels(str) {

    const vowels = ["a", "e", "i", "o", "u"];

    let count = 0;

    // Traverse string
    for (let i = 0; i < str.length; i++) {

        // Check whether current character is a vowel
        if (vowels.includes(str[i].toLowerCase())) {

            // Increase vowel count
            count++;
        }
    }

    return count;
}

console.log(countVowels("react native"));
// 5


// ============================================================
// String Q9 — First Repeating Character
// ============================================================

// Given:
// "abcdefca"

// Expected:
// c

// Because:
// a → first
// b → first
// c → first
// d → first
// e → first
// f → first
// c → repeated ← answer

function firstRepeating(str) {

    let count = {};

    // Traverse characters
    for (let i = 0; i < str.length; i++) {

        // Already seen → repeating
        if (count[str[i]]) {

            // Return first repeated character
            return str[i];
        }

        // First time → mark as seen
        count[str[i]] = 1;
    }

    // No repeating character
    return null;
}

console.log(firstRepeating("abcdefca"));
// c

// Important:
//
// Check first
// ↓
// If exists → repeating
// ↓
// Otherwise → store 1


// ============================================================
// String Q10 — Reverse Words
// ============================================================

// Given:
// "I love React Native"

// Expected:
// "Native React love I"

function reverseWords(str) {

    // Convert string into array of words
    let words = str.split(" ");

    let arr = [];

    // Start from last word
    for (let i = words.length - 1; i >= 0; i--) {

        // Add word to result array
        arr[arr.length] = words[i];
    }

    // Convert array back to string
    return arr.join(" ");
}

console.log(reverseWords("I love React Native"));
// "Native React love I"


// ============================================================
// String Q11 — Most Frequent Character
// ============================================================

// Given:
// "javascript"

// Expected:
// a

// Because:
// j → 1
// a → 2 ← highest
// v → 1
// s → 1
// c → 1
// r → 1
// i → 1
// p → 1
// t → 1

function freqChar(str) {

    let count = {};

    // Step 1: Count every character
    for (let i = 0; i < str.length; i++) {

        if (count[str[i]]) {

            // Already exists → increase
            count[str[i]]++;

        } else {

            // First occurrence
            count[str[i]] = 1;
        }
    }

    let max = 0;
    let result = "";

    // Get all character keys
    let keys = Object.keys(count);

    // Step 2: Find highest frequency
    for (let i = 0; i < keys.length; i++) {

        // Current character
        let key = keys[i];

        // Current count is greater than max
        if (count[key] > max) {

            // Update highest count
            max = count[key];

            // Store character
            result = key;
        }
    }

    return result;
}

console.log(freqChar("javascript"));
// a


// ============================================================
// STRING CORE PATTERNS
// ============================================================

// 1. Reverse
//
// Start from last index:
//
// for (let i = str.length - 1; i >= 0; i--)


// 2. Frequency
//
// if (count[char]) {
//     count[char]++;
// } else {
//     count[char] = 1;
// }


// 3. First Repeating
//
// Check before storing:
//
// if (count[char]) {
//     return char;
// }
//
// count[char] = 1;


// 4. First Non-Repeating
//
// Two passes:
//
// Pass 1 → count
// Pass 2 → find count === 1


// 5. Anagram
//
// str1 → increase count
// str2 → decrease count


// 6. Longest Word
//
// Compare lengths:
//
// if (word.length > longest.length) {
//     longest = word;
// }


// 7. Most Frequent
//
// Track both:
//
// max    → highest count
// result → character


// 8. Reverse Words
//
// split → traverse backwards → join


// 9. Remove Duplicates
//
// includes() → if not present → add


// 10. Count Vowels
//
// includes() → check vowel → count++