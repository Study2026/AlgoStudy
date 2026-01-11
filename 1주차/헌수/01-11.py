# https://www.acmicpc.net/problem/2152

# 위상 정렬 + DP + SCC

import sys
from collections import deque

sys.setrecursionlimit(10**6)
input = sys.stdin.readline

def solve():
    N, M, S, T = map(int, input().split())
    
    adj = [[] for _ in range(N + 1)]
    for _ in range(M):
        u, v = map(int, input().split())
        adj[u].append(v)
    
    ids = [-1] * (N + 1)
    low = [-1] * (N + 1)
    on_stack = [False] * (N + 1)
    stack = []

    id_counter = 0
    scc_count = 0
    scc_ids = [-1] * (N + 1) 

    scc_size = [] # scc의 크기(도시 수)를 저장할 배열

    def dfs(at):
        nonlocal id_counter, scc_count
        stack.append(at)
        on_stack[at] = True
        ids[at] = low[at] = id_counter
        id_counter += 1

        for to in adj[at]:
            if ids[to] == -1:
                dfs(to)
                low[at] = min(low[at], low[to])
            elif on_stack[to]:
                low[at] = min(low[at], ids[to])

        if ids[at] == low[at]:
            count = 0 # 현재 SCC에 속한 도시 수
            while stack:
                node = stack.pop()
                on_stack[node] = False
                scc_ids[node] = scc_count
                count += 1
                if node == at:
                    break
            scc_size.append(count)
            scc_count += 1
        
    for i in range(1, N + 1):
        if ids[i] == -1:
            dfs(i)
    
    scc_adj = [[] for _ in range(scc_count)]
    scc_indegree = [0] * scc_count

    for u in range(1, N + 1):
        for v in adj[u]:
            if scc_ids[u] != scc_ids[v]:
                scc_adj[scc_ids[u]].append(scc_ids[v])
                scc_indegree[scc_ids[v]] += 1
    
    dp = [0] * scc_count

    start_scc = scc_ids[S]
    end_scc = scc_ids[T]

    q = deque()
    # 시작점이 속한 SCC의 크기로 설정
    dp[start_scc] = scc_size[start_scc]

    for i in range(scc_count):
        if scc_indegree[i] == 0:
            q.append(i)
    
    reachable = [False] * scc_count
    reachable[start_scc] = True

    while q:
        curr = q.popleft()

        for next_scc in scc_adj[curr]:
            if reachable[curr]:
                reachable[next_scc] = True
                dp[next_scc] = max(dp[next_scc], dp[curr] + scc_size[next_scc])
            scc_indegree[next_scc] -= 1
            if scc_indegree[next_scc] == 0:
                q.append(next_scc)
    
    if reachable[end_scc]:
        print(dp[end_scc])
    else:
        print(0)

solve()