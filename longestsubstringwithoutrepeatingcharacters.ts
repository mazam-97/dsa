 const longestsubstringwithoutrepeatingcharacters = (s: string) => {
   let l = 0 ;
   let r = 0 ;
   let maxLen = 0;

   let n = s.length;
   let map = new Map();

   while( r < n){
    
     if(map.has(s[r])){

       //l =  map.get(s[r]) + 1;
       l = Math.max(l, map.get(s[r]) + 1);

     }
     map.set(s[r], r);
     
     maxLen = Math.max(maxLen, r - l + 1);
     r++;
   }

   return maxLen;

 }

console.log(longestsubstringwith/outrepeatingcharacters("abcda"));

 function lengthOfLongestSubstring(s: string): number {

    let set = new Set();
    let left = 0;
    let right = 0;
    let maxLen = 0;
    let n = s.length;
    while( right < n){
       
            while(set.has(s[right])){
                set.delete(s[left]);
                left++;
            }
            set.add(s[right]);
            maxLen = Math.max(right - left + 1, maxLen);
            right ++;
        
        
    }
    return maxLen;
    
};
