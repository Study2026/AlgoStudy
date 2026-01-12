// https://leetcode.com/problems/coin-change/description/
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const amCount = Array(amount + 1).fill(-1);
  amCount[0] = 0;

  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      if (amCount[i - coin] === -1) continue;
      amCount[i] = Math.min(
        amCount[i - coin] + 1,
        amCount[i] === -1 ? Infinity : amCount[i]
      );
    }
  }

  return amCount[amount];
};
