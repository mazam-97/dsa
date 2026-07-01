class Solution(object):
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
        
