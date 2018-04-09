
// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"
// Write the code that will take a string and make this conversion given a number of rows:
// string convert(string text, int nRows);
// convert("PAYPALISHIRING", 3) should return "PAHNAPLSIIGYIR".
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */


//20180409 update
//Your runtime beats 16.52 % of javascript submissions.
//184ms
var ans, max_column;
function dfs(x, y, s, n, numRows) {
  ans[x][y] = s[n];

  if (s.length === n) {
    max_column = y;
    return;
  }

  if (y % (numRows - 1) === 0 && x !== numRows - 1) 
    dfs(x + 1, y, s, n + 1, numRows);
  else 
    dfs(x - 1, y + 1, s, n + 1, numRows);
}
var convert = function(s, numRows) {
  if (numRows === 1) 
    return s;

  ans = [];

  for (var i = 0; i < numRows; i++)
    ans[i] = [];

  dfs(0, 0, s, 0, numRows);

  var tmp = '';
  for (var i = 0; i < numRows; i++)
    for (var j = 0; j <= max_column; j++)
      if (ans[i][j] !== undefined)
        tmp += ans[i][j];

  return tmp;
};


//84ms
var convert_s = function(s, numRows) {
    let res = '';
    if (numRows == 1) return s;
    for (let i = 0; i < numRows; i++) {
        let k = i;
        for (let j = numRows - 1; k < s.length; j += numRows - 1) {
            res += s.charAt(k)
            if (k % (numRows - 1) == 0) {
                k += 2 * (numRows - 2) + 2;
            } else {
                k += (j - k - 1) * 2 + 2;
            }
        }
    }
    return res
};