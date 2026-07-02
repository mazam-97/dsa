
 //param A : array of integers
 //param B : integer
 //return an integer
	 function cuttingwood (A, B){
        A = A.sort((a,b) => a - b);
       
       let left = 0 ;
       let right = A[A.length - 1];
       let ans;
      if (B == 0) return A[A.length - 1];

    
       while(left<=right){
           let mid = Math.floor((left + right)/2);
           let sum = calculateSum(mid,A);
         //let sum =  0;
        
         if(sum >= B){
               ans = mid
               left = mid +1;
           }
         
           else{
               right = mid - 1;
           }
       }
       return ans;
       
	}
    
     function calculateSum(k, A){
        let sum = 0;
        for(let i =0 ; i< A.length; i++){
            let tobeCut = A[i]>k? A[i] -k: 0;
            sum +=tobeCut;
        }
        return sum;
    }

    console.log(cuttingwood([4,42,40,26,46],20))
