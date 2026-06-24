import { type Side, type Market, type Order, BALANCES, type Balance, POSITIONS, ORDERBOOKS, type Bid, type Ask, type Orderbook,type Fill, MinHeap, Node, type Position, MARKET_PRICES, ORDERS, type RestingOrder, } from "./types"
type payload ={
    command: "create_order" | "get_depth";
    userId: string,
    price: number,
    qty: number,
    margin: number,
    side: Side,
    type: Market,
    symbol: string,
    slippage?: number

}

const UpdatePosition = (order: Order, fill: Fill) => {

    const calculateUnrealizedPnl = (
        entryPrice: number,
        marketPrice: number,
        qty: number,
        side: Side
    ) => {

        return side === "long"
            ? (marketPrice - entryPrice) * qty
            : (entryPrice - marketPrice) * qty;
    };

    const calculateRealizedPnl = (
        entryPrice: number,
        exitPrice: number,
        qty: number,
        side: Side
    ) => {

        return side === "long"
            ? (exitPrice - entryPrice) * qty
            : (entryPrice - exitPrice) * qty;
    };

    // use the actual order owner
    const userId = order.userId;

    // ensure map exists
    const positions =
        POSITIONS.get(userId) ?? new Map<string, Position>();

    const existingPosition = positions.get(order.symbol);

    const marketPrice = MARKET_PRICES.get(order.symbol)!;

    const newPosition: Position = {
        entryPrice: fill.price,
        fundingRate: 0,
        liquidationPrice: 0,
        margin: fill.margin,
        qty: fill.filledQty,
        side: order.side,
        symbol: order.symbol,

        pnl: calculateUnrealizedPnl(
            fill.price,
            marketPrice,
            fill.filledQty,
            order.side
        ),

        value: marketPrice * fill.filledQty
    };

    let userBalance = BALANCES.get(userId)!;

    // no existing position
    if (!existingPosition) {

        positions.set(order.symbol, newPosition);
        POSITIONS.set(userId, positions);

        return;
    }

    // same side -> increase position
    if (existingPosition.side === newPosition.side) {

        const totalQty =
            existingPosition.qty + newPosition.qty;

        const avgPrice =
            (
                (existingPosition.qty * existingPosition.entryPrice) +
                (newPosition.qty * newPosition.entryPrice)
            ) / totalQty;

        existingPosition.entryPrice = avgPrice;

        existingPosition.qty = totalQty;

        existingPosition.margin += newPosition.margin;

        existingPosition.pnl = calculateUnrealizedPnl(
            existingPosition.entryPrice,
            marketPrice,
            existingPosition.qty,
            existingPosition.side
        );

        existingPosition.value =
            marketPrice * existingPosition.qty;

        positions.set(order.symbol, existingPosition);
        POSITIONS.set(userId, positions);

        return;
    }

    // opposite side -> reduce / close / flip

    // partial reduce
    if (existingPosition.qty > newPosition.qty) {

        const closedQty = newPosition.qty;

        const proportionalMargin =
            existingPosition.margin *
            (closedQty / existingPosition.qty);

        const realizedPnl = calculateRealizedPnl(
            existingPosition.entryPrice,
            fill.price,
            closedQty,
            existingPosition.side
        );

        existingPosition.qty -= closedQty;

        // entry price remains SAME
        existingPosition.margin -= proportionalMargin;

        existingPosition.pnl = calculateUnrealizedPnl(
            existingPosition.entryPrice,
            marketPrice,
            existingPosition.qty,
            existingPosition.side
        );

        existingPosition.value =
            marketPrice * existingPosition.qty;

        userBalance = {
            available:
                userBalance.available +
                proportionalMargin +
                realizedPnl,

            locked:
                userBalance.locked -
                proportionalMargin
        };

        BALANCES.set(userId, userBalance);

        positions.set(order.symbol, existingPosition);
        POSITIONS.set(userId, positions);

        return;
    }

    // full close or flip

    const closedQty = existingPosition.qty;

    const realizedPnl = calculateRealizedPnl(
        existingPosition.entryPrice,
        fill.price,
        closedQty,
        existingPosition.side
    );

    userBalance = {
        available:
            userBalance.available +
            existingPosition.margin +
            realizedPnl,

        locked:
            userBalance.locked -
            existingPosition.margin
    };

    BALANCES.set(userId, userBalance);

    // remove old position
    positions.delete(order.symbol);

    // flip position
    const remainingQtyToFlip =
        newPosition.qty - existingPosition.qty;

    if (remainingQtyToFlip > 0) {

        const flippedMargin =
            fill.margin *
            (remainingQtyToFlip / fill.filledQty);

        const flippedPosition: Position = {

            entryPrice: fill.price,

            fundingRate: 0,

            liquidationPrice: 0,

            margin: flippedMargin,

            qty: remainingQtyToFlip,

            side: order.side,

            symbol: order.symbol,

            pnl: calculateUnrealizedPnl(
                fill.price,
                marketPrice,
                remainingQtyToFlip,
                order.side
            ),

            value:
                marketPrice * remainingQtyToFlip
        };

        positions.set(order.symbol, flippedPosition);
    }

    POSITIONS.set(userId, positions);
};
const getOrCreateUsersBalance = (userId: string):Balance  =>{

     const usersBalance =  BALANCES.get(userId);
     if(!usersBalance){
        BALANCES.set(userId, {available:0, locked:0});
        return {
            available: 0,
            locked: 0
        }
     }
     return usersBalance;
}

const getOrCreateOrderBook = (symbol: string) =>{
    const orderbook = ORDERBOOKS.get(symbol);
      let node = new Node(null);
 let book:Orderbook={
            bids: new Map<number,Bid[]>(),
            asks: new Map<number, Ask[]>(),
            bidHeap:  new MinHeap(node),
            askHeap: new MinHeap(node),
            lastTradedPrice: 0,
            marketPrice: 0


        };
    if(!orderbook){
      
       
        ORDERBOOKS.set(symbol, book);
    }
    return orderbook?? book;

}
const lockUsersBalance = (userId: string, margin: number) =>{
           let usersBalance = getOrCreateUsersBalance(userId);
          
            // lock usersBalance 
            usersBalance ={
                        available: usersBalance.available - margin,
                        locked: usersBalance.locked + usersBalance.locked
                    }
                    BALANCES.set(userId, usersBalance);
}
const processEngineRequest =(payload: payload)=>{

    switch(payload.command){
        case "create_order":{
            const { margin, qty, type, symbol,side, userId, slippage} = payload;
              let usersBalance = getOrCreateUsersBalance(userId);

            if(usersBalance.available< margin) {
                throw new Error("Insufficient Balance");
            }
            let price = payload.price;
            let remainingQty = qty;
            let order: Order ={
                OrderId: crypto.randomUUID(),
                fills: [],
                margin: margin,
                price: price,
                status: "Open",
                filledQty: 0,
                userId: userId,
                side: side,
                qty: qty,
                symbol: symbol,
                type: type,
                createdAt: Date.now().toString(),
                slippage: payload.slippage

            };
            // lock usersBalance 
            lockUsersBalance(userId,margin);
            const orderbook = getOrCreateOrderBook(symbol);
            if(side == "long"){

                while(remainingQty > 0 ){

                    const bestAskPrice = orderbook.askHeap.peek();
                    if(price < bestAskPrice) break;
                    let askOrders = orderbook.asks.get(bestAskPrice);
                    for(let ask of askOrders!){
                        if(remainingQty === 0) break;
                        const filledQty = Math.min(ask.openOrders.qty, qty);
                        const fill: Fill ={
                         fillId: crypto.randomUUID(),
                         takerOrderId: ask.openOrders.orderId,
                         makerOrderId: order.OrderId,
                         filledQty: filledQty,
                         margin: margin * (filledQty/qty),
                         price: ask.openOrders.price,
                         symbol: symbol
                        }

                        order.fills.push(fill);

                        ask.openOrders.qty -=filledQty;
                        ask.openOrders.filledQty +=filledQty;

                        remainingQty -= filledQty;
                        ask.avilableQty -= filledQty;
                        ask.openOrders.status = ask.openOrders.filledQty> 0 ? "Partially_filled": ask.openOrders.status;
                        // update position for taker
                        UpdatePosition(order,fill);
                        // update position for maker
                        UpdatePosition(ORDERS.get(ask.openOrders.orderId)!,fill);


                        
                    }

                    askOrders = askOrders?.filter(a => a.openOrders.qty>0);

                    if(askOrders?.length === 0){
                        orderbook.asks.delete(bestAskPrice);
                        orderbook.askHeap.pop();

                        ORDERBOOKS.set(symbol, orderbook);
                    }
                }

                if(remainingQty>0 && type === "limit"){
                    const restingOrder: RestingOrder = {
                        orderId: order.OrderId,
                        filledQty: 0,
                        price: price,
                        qty: remainingQty,
                        side: side,
                        status: "Open",
                        symbol: order.symbol
                    }

                    const existingOrdersAtCurrentPrice = orderbook.bids.get(price);
                    if(existingOrdersAtCurrentPrice){   
                        existingOrdersAtCurrentPrice.push({avilableQty: remainingQty, openOrders: restingOrder});
                    }
                    else{
                        orderbook.bids.set(price, [{avilableQty: remainingQty, openOrders: restingOrder}]);
                        orderbook.bidHeap.push(-Number(price))
                    }

                    ORDERBOOKS.set(symbol, {...orderbook});
                }

                if(type === "market"){
                    const totalMarginUsed = order.fills.reduce((sum: number,fill: Fill)=>  sum + fill.margin as number,0);
                    const marginTobeUnlocked = margin - totalMarginUsed;
                    usersBalance = {
                        available: usersBalance.available + marginTobeUnlocked,
                        locked: usersBalance.locked -  marginTobeUnlocked
                    }

                    BALANCES.set(userId, usersBalance);
                }


                if(remainingQty === 0){
                    order.status = "Filled"
                }
                else if(remainingQty < order.qty){
                    order.status = "Partially_filled"
                }

                order.filledQty = order.qty - remainingQty;

                return order;

            }

            else{

                while(remainingQty>0){

                }
            }


        }
    }

}