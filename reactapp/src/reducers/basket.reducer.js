export default function(basket = [], action) {
    if(action.type === 'addKitty') {
      console.log('Add kitty Start')
      console.log('Kitty dans le reducer')
      console.log(action.kitty)
      var index = basket.findIndex( element => element.id === action.kitty.id);
      console.log(index);
      console.log('Add Kitty Ends')
      if(index === -1){
        return [...basket,action.kitty]
      } else {
        return basket
      }
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