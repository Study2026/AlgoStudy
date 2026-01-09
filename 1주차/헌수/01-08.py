# https://www.acmicpc.net/problem/4196

# 위상정렬 + SCC

import sys
sys.setrecursionlimit(10**6)
input = sys.stdin.readline


def solve():
    N, M = map(int, input().split())

    graph = [[] for _ in range(N + 1)]
    rev_graph = [[] for _ in range(N + 1)]

    for _ in range(M):
        u, v = map(int, input().split())
        graph[u].append(v)
        rev_graph[v].append(u)
    
    stack = []
    visited = [False] * (N + 1)

    def dfs(node, visited, stack):
        visited[node] = True
        for next_node in graph[node]:
            if not visited[next_node]:
                dfs(next_node, visited, stack)
        stack.append(node)

    for i in range(1, N + 1):
        if not visited[i]:
            dfs(i, visited, stack)
    
    visited = [False] * (N + 1)
    scc_counter = 0 # scc_list = []
    scc_ids = [-1] * (N + 1)

    def reverse_dfs(node, visited):
        visited[node] = True
        scc_ids[node] = scc_counter
        # scc_ids[node] = len(scc_list)
        # scc_group.append(node)

        for next_node in rev_graph[node]:
            if not visited[next_node]:
                reverse_dfs(next_node, visited)

    while stack:
        node = stack.pop()
        if not visited[node]:
            # current_scc = []
            reverse_dfs(node, visited)
            # scc_list.append(current_scc)
            scc_counter += 1

    
    #scc_cnt = len(scc_list) # 그룹의 개수 -> 노드의 개수
    scc_indegree = [0] * scc_counter

    for u in range(1, N + 1):
        for v in graph[u]: # u -> v : 그룹이 바뀌는 지점만 찾아서 Count
            if scc_ids[u] != scc_ids[v]:
                scc_indegree[scc_ids[v]] += 1
    
    print(scc_indegree.count(0))


T = int(input())
for _ in range(T):
    solve()

