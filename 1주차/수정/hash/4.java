import java.util.HashMap;

// 각 종류별 갯수 + 1 을 다~ 곱해서 더하고 마지막 -1 (아무것도 안 입은 경우의 수)
// 일단은 의상 종류 key, 의상 갯수 value로 저장하도록 HashMap 생성
class Solution {
    public int solution(String[][] clothes) {
        int answer = 0;

        HashMap<String, Integer> map = new HashMap<>();
        for (String[] cloth : clothes) {
            map.put(cloth[1], map.getOrDefault(cloth[1], 0) + 1);
        }

        int tmp = 1;
        for (int count : map.values()) {
            tmp *= (count + 1);
        }
        answer = tmp - 1;

        return answer;
    }
}