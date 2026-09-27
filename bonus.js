var longestCommonPrefix = function (strs) {
  let prefix = "";

  for (let i = 0; i < strs[0].length; i++) {
    let char = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || strs[j][i] !== char) {
        return prefix;
      }
    }

    prefix += char;
  }

  return prefix;
};

//test cases

let arr1 = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(arr1));

let arr2 = ["dog", "racecar", "car"];
console.log(longestCommonPrefix(arr2));