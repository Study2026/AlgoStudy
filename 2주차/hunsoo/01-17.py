# https://www.acmicpc.net/problem/7795

# 투 포인터

import sys
input = sys.stdin.readline

def solve():
    N, M = map(int, input().split())
    A = list(map(int, input().split()))
    B = list(map(int, input().split()))

    A.sort()
    B.sort()

    count = 0
    b_idx = 0

    for a in A:
        while b_idx < M and B[b_idx] < a:
            b_idx += 1
        count += b_idx
    
    print(count)

T = int(input())
for _ in range(T):
    solve()