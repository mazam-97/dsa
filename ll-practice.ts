class LinkedList {

  public head: Node | null;
 
 constructor(){
    this.head = null;
  } 
   
   print(){
    if(this.head === null) return;
    let currNode = this.head;
    while(currNode){
     console.log(currNode.data);
      currNode = currNode.next as Node;
    }
    
  }

  reverse(){
    if(this.head === null) return;

    let prevNode = null;
    let currNode = this.head;
    let nextNode = null;

    while(currNode){
      nextNode = currNode.next;
      prevNode = currNode;
      currNode = nextNode;
      currNode.next = prevNode;
    }
  }
   append(data: number){
    let newNode = new Node(data);
    if(this.head === null){
    this.head = newNode;
      return;
    }

    let currNode = this.head;
    let prevNode = this.head;
    while(currNode){
      prevNode = currNode;
      currNode = currNode.next as Node;
    }

    prevNode.next = newNode;

  }

}

class Node{

  public next: Node | null

  public data: number | null

  constructor(data: number){
   this.data = data;
   this.next =  null;
  }

 


}


let ll = new LinkedList();
ll.append(1);
ll.append(8);
ll.append(3);

ll.print();



