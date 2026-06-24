function hasCycle(head: ListNode | null): boolean {
    let set = new Set();

    let curr = head;

    while(curr){
        if(set.has(curr)){
            return true;
        }
        set.add(curr);
        curr = curr.next;
    }
    return false;
};

function hasCycleOptimized(head: ListNode | null): boolean {
   let slow = head;
   let fast = head;

   while(fast && fast.next ){  
    slow = slow.next;
    fast = fast.next.next
      if(fast === slow){
        return true;
    }

   }
   return false
};
