# https://www.acmicpc.net/problem/2150

# Strongly Connected Component 개념 복습

import sys
sys.setrecursionlimit(10**6)
input = sys.stdin.readline

def solve():
    V, E = map(int, input().split())

    adj = [[] for _ in range(V + 1)]
    for _ in range(E):
        a, b = map(int, input().split())
        adj[a].append(b)

    ids = [-1] * (V + 1)
    low = [-1] * (V + 1)
    on_stack = [False] * (V + 1)
    stack = []

    id_counter = 0
    scc_list = []

    def dfs(at):
        nonlocal id_counter
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
            scc_current = []
            while stack:
                node = stack.pop()
                scc_current.append(node)
                on_stack[node] = False
                if node == at:
                    break

            scc_current.sort()
            scc_list.append(scc_current)

    for i in range(1, V + 1):
        if ids[i] == -1:
            dfs(i)

    scc_list.sort(key=lambda x: x[0])

    print(len(scc_list))
    for scc in scc_list:
        print(*scc, -1)

solve()