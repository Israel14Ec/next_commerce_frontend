export function calcDiscountePrice(price:number, discount?:number) {

    //0 También se evalua como falsy en js
    if(!discount) return price
    
    const priceWithAmount = price - (price * discount) / 100
    return priceWithAmount    
}