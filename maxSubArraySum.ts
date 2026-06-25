  maxSubarraySum(arr, k) {
        // code here
        let left = 0;
        let right  = 0;
        let maxSum = arr[left];
        
        for(let i = 0; i < k -1 ;i ++ ){
            right++;
            maxSum = maxSum + arr[right];
        }
        let currSum = maxSum;
        while( right < arr.length - 1){
          left++;
          right++;
          currSum = currSum - arr[left-1] + arr[right];
          maxSum = Math.max(maxSum, currSum );
        }
        return maxSum;
    }
