export default function(token = '', action) {
  
    if(action.type === 'addToken') {
        console.log('token dans le reducer')
        console.log(action.token);
      return action.token;
    } else {
      return token;
    }
    
  }