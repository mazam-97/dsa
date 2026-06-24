
export type Status = "Partially_filled" | "Filled" | "Cancelled" | "Open"

export type Side = "long"| "short";
export type RestingOrder ={
    orderId: string,
    qty: number,
    price: number,
    status: Status,
    side: Side,
    filledQty: number,
    symbol: string,
}
export type Bid = {
    avilableQty: number,
    openOrders: RestingOrder
}

export type Ask = {
    avilableQty: number,
    openOrders: RestingOrder
}

export type Orderbook ={
    bids: Map<number,Bid[]>,
    asks: Map<number,Ask[]>,
    lastTradedPrice: number,
    marketPrice: number,
    bidHeap: MinHeap,
    askHeap: MinHeap
}

export type Balance ={
    available: number,
    locked: number
}

export type Market = "market" | "limit";

export type Order ={
    OrderId: string,
    userId: string,
    price: number,
    qty: number,
    side: Side,
    type: Market,
    fills: Fill[],
    status: Status,
    margin: number,
    filledQty: number,
    slippage?: number,
    symbol: string,
    createdAt: string
}

export type Fill ={
    fillId: string,
    makerOrderId: string,
    takerOrderId: string,
    filledQty: number,
    price: number,
    margin: number,
    symbol: string
}

export type Position ={
    entryPrice: number,
    qty: number,
    liquidationPrice: number,
    margin: number,
    pnl: number,
    side: Side,
    value: number,
    symbol: string,
    fundingRate: number
}





export const MARKET_PRICES= new Map<string,number>();
export const POSITIONS = new Map<string, Map<string, Position>>();
export const ORDERBOOKS = new Map<string, Orderbook>();
export const BALANCES = new Map<string, Balance>();
export const ORDERS = new Map<string, Order>();


export class Node{
    data: number| null = null ;
    leftChild: Node | null;
    rightChild: Node | null;
    constructor(data: number| null){
        this.data = data;
        this.leftChild= null;
        this.rightChild= null;
    }
}
export class MinHeap{
    heap:Number[];
  
    constructor(){
        this.heap = []
    }

    getParent(index: number){

        return Math.floor(index - 1)/2;
    }

    getLeftChildren(index: number){
        return 2 * index + 1;
    }

    getRightChildren(index: number){
        return 2 * index + 2;
    }

    swap(index1: number, index2: number){
         if(this.heap[index1] && this.heap[index2])
         return [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
    }
    push(data: number){
        this.heap.push();
        this.heapifyUp(this.heap.length - 1);
    }
    pop(){
        this.heap.pop();
        this.swap(this.heap.length -1 , 0);
        this.heapifyDown(0);

    }

    heapifyUp(index: number){
            if(index <=0) return;

            let data = this.heap[index];
            let parentIndex = this.getParent(index);
            let parentData = this.heap[parentIndex];
            if(parentData! > data!){
                this.swap(parentIndex, index);
                this.heapifyUp(parentIndex);
            }
        

    }

   heapifyDown(index: number) {
    const length = this.heap.length;
    let smallestIndex = index;

    const leftChildIndex = this.getLeftChildren(index);
    const rightChildIndex = this.getRightChildren(index);

    // 1. If left child is within bounds and smaller than current node
    if (leftChildIndex < length && this.heap[leftChildIndex]! < this.heap[smallestIndex]!) {
        smallestIndex = leftChildIndex;
    }

    // 2. If right child is within bounds and smaller than the smallest found so far
    if (rightChildIndex < length && this.heap[rightChildIndex]! < this.heap[smallestIndex]!) {
        smallestIndex = rightChildIndex;
    }

    // 3. If a child was smaller, swap and continue down the tree
    if (smallestIndex !== index) {
        this.swap(index, smallestIndex);
        this.heapifyDown(smallestIndex);
    }
}


    peek(): number{
        return 0;
    }
}