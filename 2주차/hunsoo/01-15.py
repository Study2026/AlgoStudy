# https://www.acmicpc.net/problem/7453

# 투 포인터 + 분할 정복

import sys
input = sys.stdin.readline

def solve():
    N = int(input())

    A, B, C, D = [], [], [], []
    for _ in range(N):
        a, b, c, d = map(int, input().split())
        A.append(a)
        B.append(b)
        C.append(c)
        D.append(d)
    
    AB = []
    CD = []

    for i in range(N):
        for j in range(N):
            AB.append(A[i] + B[j])
            CD.append(C[i] + D[j])
    
    AB.sort()
    CD.sort()

    left = 0
    right = len(CD) - 1
    count = 0
    len_AB = len(AB)

    while left < len_AB and right >= 0: # 2개의 배열이기 때문
        current_sum = AB[left] + CD[right]

        if current_sum == 0: # 중복 처리 핵심
            # AB쪽에서 같은 값이 몇 개인지 셈
            next_left = left + 1
            while next_left < len_AB and AB[left] == AB[next_left]:
                next_left += 1
            
            # CD쪽에서 같은 값이 몇 개인지 셈
            next_right = right - 1
            while next_right >= 0 and CD[right] == CD[next_right]:
                next_right -= 1

            count += (next_left - left) * (right - next_right)

            left = next_left
            right = next_right
        
        elif current_sum > 0:
            right -= 1
        else:
            left += 1
    
    print(count)

solve()

