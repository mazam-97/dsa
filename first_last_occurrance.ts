function searchRange(nums: number[], target: number): number[] {
     
     let ans = recursive(nums, target,0, nums.length -1)
     return ans;

};

function recursive(nums: number[],target: number, left: number, right: number){

   
    while(left <=right){
         let mid = Math.floor((left + right)/2);
        if(nums[mid]== target){
            let fi = recursive(nums,target,left,mid-1);
            let li = recursive(nums,target,mid+1,right);

             let i1 = fi[0] == -1? mid: fi[0];
              let i2= li[0] == -1? mid: li[1];
              
              return [i1, i2];

        }
        else if(nums[mid]> target){
            right = mid -1;
        }
        else{
            left = mid + 1;
        }
    }

    return [-1, -1]
}
