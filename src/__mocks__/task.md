## Two Sum

## 🤔 Why This Problem Is Useful

This problem is a great introduction to array iteration and hash maps (objects or maps used to store and retrieve data fast).  
It teaches you how to **think in terms of trade-offs** between time and space — a core skill in algorithmic thinking.

## 🧠 Problem Description

Given an array of integers and a target value, return the indices of **two numbers** such that they add up to the target.

You may **assume** that:

- Each input has **exactly one solution**.
- You **may not** use the same element twice.
- The result can be returned in **any order**.

---

## 🛠️ Constraints

- `2 <= nums.length <= 10⁴`

- `-10⁹ <= nums[i] <= 10⁹`

- `-10⁹ <= target <= 10⁹`
- Only **one valid answer** exists.

---

## 💡 Example Inputs & Outputs

### Example 1

```ts
Input: ((nums = [2, 7, 11, 15]), (target = 9));
Input: ((nums = [2, 7, 11, 15]), (target = 9));
Output: [0, 1];
// Because nums[0] + nums[1] == 9
```

### Example 2

```ts
Input: ((nums = [3, 2, 4]), (target = 6));
Output: [1, 2];
```

### Example 3

```ts
Input: ((nums = [3, 3]), (target = 6));
Output: [0, 1];
```

## ✅ Your Task

Implement a function with the following signature:

```ts
function twoSum(nums: number[], target: number): number[];
```
