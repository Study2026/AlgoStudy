# https://www.acmicpc.net/problem/2018

# 투 포인터 정석 
# 힌트 : 연속된, N(양수)

N = int(input())
# nums = list(range(N + 1)) 메모리 초과 위험

start = end = 1
current_val = 0
count = 0

while True:
    if current_val >= N:
        if current_val == N:
            count += 1
        current_val -= start
        start += 1
    elif end == N + 1:
        print(count)
        break
    else:
        current_val += end
        end += 1


