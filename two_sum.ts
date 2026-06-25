const two_sum =(nums: number[], target: string) =>{
  function twoSum(nums: number[], target: number): number[] {
   let map = new Map();
   for(let i=0 ; i<nums.length; i++){
    let comp = target - nums[i];
    if(map.has(comp)){
        return [map.get(comp),i]
    }
    
    map.set(nums[i],i);
   }
   return [] 
}
}
