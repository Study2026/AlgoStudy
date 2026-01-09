# https://www.acmicpc.net/status?from_problem=1&problem_id=14567

# 위상정렬 + DP

import sys
from collections import deque
input = sys.stdin.readline

# 과목 수, 선수 조건 수
N, M = map(int, input().split())

graph = [[] for _ in range(N + 1)]
indegree = [0] * (N + 1)
dp = [1] * (N + 1) # 기본적으로 모든 과목은 1학기에 이수 가능 -> 1로 초기화

for _ in range(M):
    a, b = map(int, input().split())
    graph[a].append(b)
    indegree[b] += 1

q = deque()

for i in range(1, N + 1):
    if indegree[i] == 0:
        q.append(i)

while q:
    curr = q.popleft()

    for next_node in graph[curr]:
        indegree[next_node] -= 1
        dp[next_node] = max(dp[next_node], dp[curr] + 1)
        if indegree[next_node] == 0:
            q.append(next_node)
    
print(*dp[1:])