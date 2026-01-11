import java.util.Arrays;

// 두 배열을 정렬 해서, 하나씩 비교하자. (1개 차이 이므로 같은 인덱스에서 값이 다르면 그 이름이 완주 못한 것)
class Solution {
    public String solution(String[] participant, String[] completion) {
        String answer = "";

        Arrays.sort(participant);
        Arrays.sort(completion);

        for (int i = 0; i < completion.length; i++) {
            if (!participant[i].equals(completion[i])) {
                answer = participant[i];
                break;
            }
        }

        if (answer.equals("")) {
            answer = participant[participant.length - 1];
        }

        return answer;
    }
}