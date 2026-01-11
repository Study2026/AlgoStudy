import java.io.*;
import java.util.*;

// https://www.acmicpc.net/problem/16500

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String str = br.readLine();

        int[] dp = new int[str.length()+1];
        dp[str.length()] = 1;

        HashSet<String> set = new HashSet<>();
        int N = Integer.parseInt(br.readLine());
        for(int i = 0 ; i < N ; i++){
            set.add(br.readLine());
        }
        
        for(int i = str.length() - 1 ; i>= 0 ; i--){
            for(int j = i+1 ; j <= str.length() ; j++){
                if(dp[j] == 1){

                    if(set.contains(str.substring(i, j))){
                        dp[i] = 1;
                    }
                }
            }
        }

        System.out.println(dp[0]);
    }
}