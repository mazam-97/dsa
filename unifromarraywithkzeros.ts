function characterReplacement(s: string, k: number): number {class Solution(object):
    def searchRange(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        return [self.findFirst(nums,target), self.findLast(nums,target)]
    def findFirst(self,nums,target):
        left = 0
        right = len(nums) -1
        ans = -1
        
        while(left<=right):
            mid = (left + right)//2
            if(target == nums[mid]):
                ans = mid
                right = mid -1
            elif(target> nums[mid]):
                left = mid + 1
            else:
                right = mid -1

        return ans

    def findLast(self,nums,target):
        left = 0
        right = len(nums) - 1
        ans = -1
       
        while(left<=right):
            mid = (left + right)//2
            if(target == nums[mid]):
                ans = mid
                left = mid + 1
            elif(target> nums[mid]):
                left = mid + 1
            else:
                right = mid -1

        return ans
        impl Solution {
    pub fn search_range(nums: Vec<i32>, target: i32) -> Vec<i32> {
        vec![Self::find_first(&nums, target), Self::find_last(&nums, target)]
    }

    pub fn find_first(nums: &Vec<i32>, target: i32)->i32{
        let mut left: i32 = 0;
        let mut right = nums.len() as i32 -1 ;
        let mut ans = -1 as i32;
        while(left <= right){
            let mut mid = (left + right)/2 ;
            if nums[mid as usize] == target{
                right = mid - 1;
                ans = mid;
            }
            else if nums[mid as usize]> target{
                right = mid - 1;
            }
            else{
                left = mid + 1;
            }
        }
        ans
    }

    pub fn find_last(nums: &Vec<i32>, target: i32)->i32{
     let mut left: i32 = 0 ;
        let mut right = nums.len() as i32 - 1 ;
        let mut ans = -1;
        while(left <= right){
            let mut mid = (left + right)/2;
            if nums[mid as usize] == target{
                left = mid + 1;
                ans = mid;
            }
            else if nums[mid as usize]> target{
                right = mid - 1;
            }
            else{
                left = mid + 1;
            }
        }
        ans
    earch_range.rs
}
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
