class Node {
  data: number;
  next: Node | null

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }

}
class LL {
  head: Node | null;
  size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }
  append(value: number) {
    let newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let curr = this.head;

    while (curr) {
      curr = curr.next as Node;
      console.log("iterating");
    }
    curr = newNode;
    console.log(curr.data);
  }

  print() {
    if (!this.head) {
      return;
    }

    let curr = this.head;
    let cnt = 0;
    while (curr) {
      console.log(`data ${curr.data}->`);
      curr = curr.next as Node;
      console.log(cnt);
      cnt += 1;
    }
  }
}


function main() {
  console.log("hlo");
  let ll = new LL();
  ll.append(2);
  ll.append(3);
  ll.append(4);
  ll.print();
}
main();
