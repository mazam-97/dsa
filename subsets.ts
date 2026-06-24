const subsets = (nums: number[]) => {

let ans = [];

  const res = backtrack(0,[],nums,[]);
  console.log(res);
 }

 const backtrack = (index:number, currentSet:number[], nums:number[], ans: number[][])=>{
  if(index == nums.length){
   ans.push([...currentSet]);
    return;
  }

  currentSet.push(nums[index] as any);

  backtrack(index + 1,currentSet,nums, ans);
  
  currentSet.pop();
  
  backtrack(index+1, currentSet, nums, ans); 
  return ans;

  }

subsets([1,2,3])

