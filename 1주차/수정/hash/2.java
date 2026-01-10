import java.util.HashSet;

// 중복제거 (HashSet) 해서 종류 세고, 가져갈 수 있는 수 (N/2) 보다 작으면 종류 수 / 크면 N/2
class Solution {
    public int solution(int[] nums) {
        int answer = 0;

        HashSet<Integer> set = new HashSet<>();
        for (int n : nums) {
            set.add(n);
        }

        int typeSize = set.size();
        int possiblePick = nums.length / 2;

        answer = Math.min(typeSize, possiblePick);

        return answer;
    }
}