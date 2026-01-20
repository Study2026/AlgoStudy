# https://www.acmicpc.net/problem/1644

# 소수 판정 + 투 포인터

import sys
input = sys.stdin.readline

def solve():
    N = int(input())

    if N == 1:
        print(0)
        return

    is_prime = [True] * (N + 1)
    is_prime[0] = is_prime[1] = False

    for i in range(2, int(N**0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, N + 1, i):
                is_prime[j] = False
    
    primes = [i for i in range(N + 1) if is_prime[i]]

    start = 0
    end = 0
    current_sum = 0
    count = 0
    primes_len = len(primes)

    while True:
        if current_sum >= N:
            if current_sum == N:
                count += 1
            current_sum -= primes[start]
            start += 1
        
        elif end == primes_len:
            break
        else:
            current_sum += primes[end]
            end += 1
    
    print(count)

solve()
            