//  class Node {

//      data: number;
//      next: Node| null;

//     constructor(data: number){
//         this.data= data;
//         this.next = null;
//     }
// }

// class LinkedList {
//     head: Node | null;
//     constructor(){
//        this.head = null;
//     }

//     Append(data: number){
//         const node = new Node(data);
//         if(this.head == null){
//             this.head =node;
//             return;
//         }

//         let current = this.head;


//         while(current.next){
//             current = current.next!;
//         }
//         current.next = node;

//     }

//     DisplayData(){
//         let data =[];
//         let current = this.head;
//         while(current){
//             console.log(current.data);
//             data.push(current.data);
//             current = current?.next
//         }

//        // console.log(data);
//     }

//     ReverseLinkList(){
//         let curr = this.head;
//         let prev = null;
//         let next = null

//         while(curr){

//           next = curr.next;
//           curr.next = prev;
//           prev = curr;

//           curr = next;



//         }

//         this.head = prev
//     }

// }

// let ll = new LinkedList();
// ll.Append(6);
// ll.Append(7);
// ll.Append(8);
// ll.Append(9);
// ll.DisplayData()
// ll.ReverseLinkList();
// ll.DisplayData();


class Node {
  value: number
  next: Node | null
  constructor(data: number) {
    this.value = data
    this.next = null
  }
}

class linkedlist {
  head: Node | null = null

  constructor() {
    this.head = null
  }

  append(data: number) {

    const newNode = new Node(data)

    if (this.head == null) {
      this.head = newNode;
      return
    }
    let current = this.head

    while (current.next !== null) {
      current = current.next
    }

    current.next = newNode
  }

  show() {
    let current = this.head
    if (current == null) {
      console.log("list is empty")
      return
    }

    console.log(current.next?.next?.value)
    // while( current ) {
    //     console.log( current.value );
    //     current = current.next;
    // }
  }

  Revrse() {

    let current: null | Node = this.head
    let next: null | Node = null
    let prev: null | Node = null
    if (current == null) {
      console.log("list is empty")
    }

    while (current) {
      next = current.next
      current.next = prev
      prev = current
      current = next

    }
    this.head = prev
  }

}



let list = new linkedlist()

list.append(1)
list.append(2)
list.append(3)
list.append(4)
list.append(5)

list.show()
