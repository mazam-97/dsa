class DoubleLinkedList {
   head: Node | null;
   tail: Node | null;
   size: number;
    constructor(){
      this.head = null;
      this.tail = null;
      this.size = 0;
    
    }

    append(cuurent: Node){
        if(this.head == null){
            cuurent.prev= this.head;
            cuurent.next = this.tail
        }
    }



}

class Node{

    data: number;
    prev: Node | null;
    next: Node | null;
    constructor(data: number){
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}