function characterReplacement(s: string, k: number): number {
    let right = 0;
    let left = 0;
    let max_len = 0;
    let count = 0;
    let map = new Map();

    while (right < s.length) {
      if(map.has(s[right])){
        map.set(s[right], map.get(s[right]) + 1);
      }
      else{
        map.set(s[right], 1);
      }

      count = Math.max(count, map.get(s[right]) );

      while((right - left + 1) - count > k){
          map.set(s[left], map.get(s[left]) -1);
        left++;
      
        //max_len = Math.max(right -left +1, max_len);
      }
      max_len = Math.max(right -left +1, max_len);
      right++;
    }

    return max_len;
}
