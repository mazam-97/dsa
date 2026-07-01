const binarySearch =(nums:number[],target: number) =>{

  let left = 0 ;
  let right = nums.length - 1;
  let mid;
  while(left<= right){
    mid = Math.floor((right + left)/2);

    if(nums[mid] == target ){
      return mid;
    }

    

    else if(nums[mid]> target){
      right = mid - 1;
    }
    else if(right == left){
      return left + 1;
    }
    else{
      left = mid + 1;
    }
  }
  
 return left + 1

}


console.log(binarySearch([1,3,5,7,9,11,13],10));
