# https://www.acmicpc.net/problem/4013

# 위상 정렬 + DP + SCC

# 일방통행 -> 방향 그래프
import sys
sys.setrecursionlimit(10**6)
input = sys.stdin.readline

def solve():
    # 교차로 수, 도로 수
    N, M = map(int, input().split())

    graph = [[] for _ in range(N + 1)]
    for _ in range(M):
        u, v = map(int, input().split())
        graph[u].append(v)

    # 각 교차로(ATM)에 있는 현금 액수
    cash = [0] + [int(input()) for _ in range(N)]

    # 출발지와 레스토링 정보
    start_node, p_count = map(int, input().split())
    restaurants = set(map(int, input().split()))

    # 추적 정보 (교차로 수만큼 생성)
    ids = [-1] * (N + 1)
    low = [-1] * (N + 1)
    on_stack = [False] * (N + 1)
    stack = []

    id_counter = 0
    scc_ids = [-1] * (N + 1)
    scc_count = 0

    def dfs(at):
        nonlocal id_counter, scc_count
        stack.append(at)
        on_stack[at] = True
        ids[at] = low[at] = id_counter
        id_counter += 1

        for to in graph[at]:
            if ids[to] == -1:
                dfs(to)
                low[at] = min(low[at], low[to])
            elif on_stack[to]:
                low[at] = min(low[at], ids[to])
                
        if ids[at] == low[at]:
            while stack:
                node = stack.pop()
                on_stack[node] = False
                scc_ids[node] = scc_count
                if node == at:
                    break
            scc_count += 1
    
    for i in range(1, N + 1):
        if ids[i] == -1:
            dfs(i)
    
    scc_graph = [[] for _ in range(scc_count)]
    scc_cash = [0] * scc_count
    scc_indegree = [0] * scc_count

    # 각 그룹의 현금 총합 계산
    for i in range(1, N + 1):
        scc_cash[scc_ids[i]] += cash[i]
    
    # 간선 연결
    for u in range(1, N + 1):
        for v in graph[u]:
            if scc_ids[u] != scc_ids[v]:
                scc_graph[scc_ids[u]].append(scc_ids[v])
                scc_indegree[scc_ids[v]] += 1
    
    dp = [0] * scc_count
    start_scc = scc_ids[start_node]

    from collections import deque
    q = deque()

    reachable = [False] * scc_count
    reachable[start_scc] = True
    dp[start_scc] = scc_cash[start_scc]

    for i in range(scc_count):
        if scc_indegree[i] == 0:
            q.append(i)
    
    while q:
        curr = q.popleft()

        for next_scc in scc_graph[curr]:
            if reachable[curr]:
                reachable[next_scc] = True
                dp[next_scc] = max(dp[next_scc], dp[curr] + scc_cash[next_scc])
            
            scc_indegree[next_scc] -= 1
            if scc_indegree[next_scc] == 0:
                q.append(next_scc)
    
    result = 0
    for r_node in restaurants:
        r_scc = scc_ids[r_node]
        if reachable[r_scc]:
            result = max(result, dp[r_scc])
    
    print(result)

solve()
