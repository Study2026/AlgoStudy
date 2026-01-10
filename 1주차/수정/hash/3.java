import java.util.Arrays;

// 정렬 후 각 요소 간 startWith 체크
class Solution {
    public boolean solution(String[] phone_book) {
        boolean answer = true;

        Arrays.sort(phone_book);

        for (int i=0; i<phone_book.length-1; i++) {
            if (phone_book[i+1].startsWith(phone_book[i])) {    // 뒤에꺼가 앞에꺼로 시작
                answer = false;
                break;
            }
        }

        return answer;
    }
}