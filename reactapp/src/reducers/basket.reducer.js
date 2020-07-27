export default function(basket = [], action) {
    if(action.type === 'addKitty') {
      return [...basket,action.kitty]
    } else if(action.type === 'removeKitty') {
      var basketCopy = [...basket];
      var index = basket.findIndex( element => element.id === action.kittyId);
      basketCopy.splice(index,1);
      return basketCopy
    } 
    else {
      return basket;
    }
    
  }