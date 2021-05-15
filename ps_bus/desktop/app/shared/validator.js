export const isNumberMoreThanZero = (number) => {
  if(isNaN(number)){
    return false;
  }
  else if(number == undefined){
    return false;
  }else if(parseInt(number) < 0){
    return false;
  }else if(number == ""){
    return false;
  }
  return true;
}