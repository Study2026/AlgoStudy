
# https://www.acmicpc.net/problem/1940

# 투 포인터

import sys
input = sys.stdin.readline

N = int(input())
M = int(input())

nums = sorted(map(int, input().split()))

start, end = 0, N - 1
count = 0

while start < end:
    current_sum = nums[start] + nums[end]
    if current_sum == M:
        count += 1
        start += 1
    elif current_sum > M:
        end -= 1
    else:
        start += 1

print(count)