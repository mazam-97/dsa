function findAnagrams(s: string, p: string): number[] {
  

    let left = 0 ;
    let right = p.length -1;
    let ans = [];

    while(right < s.length){

        if(isAnagram(s.slice(left, right+1),p)){
            ans.push(left);
        }
        left++;
        right++;

     }
     return ans;
}


function isAnagram(s:string, p: string){

      let map = new Map();
    for(let i = 0 ; i < p.length; i++){
       if(map.has(p[i])){
        map.set(p[i], map.get(p[i])+1);
       }
        else{
            map.set(p[i],1);
        }   
    }

    for(let i=0; i< s.length; i++){
        if(map.has(s[i])){
             map.set(s[i], map.get(s[i])-1);
        }
    }

    for(let value of map.values()){
        if(value !=0){
            return false;
        }
    }
    return true;
}
