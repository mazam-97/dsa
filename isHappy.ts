function isHappy(n: number): boolean {
    let fast = n;
    let slow = n;
    while(true){
        fast = nextNum(nextNum(fast));
        slow = nextNum(slow);
          if(fast == 1){
            return true;
        }
        if(fast == slow){
            return false;
        }
       
    }

};

function nextNum(n: number): number {
    let sum = 0
    while(n > 0){
        let temp = n % 10;
        sum += temp * temp;
        n = Math.floor(n/10)
    }
    return sum;
}
