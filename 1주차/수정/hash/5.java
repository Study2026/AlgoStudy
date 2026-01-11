import java.util.*;

// HashMap에 장르별 총 재생 횟수 저장하고, 장르별로 고유번호, 재생횟수를 리스트에 저장 (재생횟수 desc, 고유번호 asc, max 2개)
class Solution {
    public int[] solution(String[] genres, int[] plays) {
        ArrayList<Integer> answer = new ArrayList<>();

        Map<String, Integer> genreList = new HashMap<>();   // 장르별 총 재생 횟수
        Map<String, ArrayList<int[]>> songsInGenreList = new HashMap<>();   // 장르별 내부 노래들의 정보

        for (int i=0; i<genres.length; i++) {
            String g = genres[i];
            int p = plays[i];
            genreList.put(g, genreList.getOrDefault(g, 0) + p);

            songsInGenreList.putIfAbsent(g, new ArrayList<>());
            songsInGenreList.get(g).add(new int[]{i, p});      // 고유 번호, 재생 횟수
        }

        // 장르별 총 재생횟수 내림차순 (큰 순서대로)
        List<String> genreOrder = new ArrayList<>(genreList.keySet());
        Collections.sort(genreOrder,
                (a, b) -> genreList.get(b) - genreList.get(a));

        for (String g : genreOrder) {
            List<int[]> list = songsInGenreList.get(g);
            Collections.sort(list, (a, b) -> {
                if ((b[1] - a[1]) != 0)   return b[1] - a[1];  // 재생횟수 desc
                return a[0] - b[0];        // 고유번호 asc
            });

            answer.add(list.get(0)[0]);
            if (list.size() >= 2) {
                answer.add(list.get(1)[0]);
            }
        }

        return answer.stream().mapToInt(i->i).toArray();
    }
}