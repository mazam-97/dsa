function group_anagram(input: string[]){

  let ans: string[][]= [];
  for(let i = 0 ; i< input.length; i++){
    let group: string[]=[];
    for(let j = i + 1; j < input.length ; j++){
      if(isAnagram(input[i],input[j])){
       group.push(input[i]);
       group.push(input[j]);
      }
    }
    ans.push(group);
  }

 function isAnagram(input1: string, input2: string): boolean {
  if (input1.length !== input2.length) {
    return false;
  }

  const map = new Map<string, number>();

  for (const ch of input1) {
    map.set(ch, (map.get(ch) || 0) + 1);
  }

  for (const ch of input2) {
    if (!map.has(ch)) {
      return false;
    }

    map.set(ch, map.get(ch)! - 1);
  }

  for (const count of map.values()) {
    if (count !== 0) {
      return false;
    }
  }

  return true;
}

}
