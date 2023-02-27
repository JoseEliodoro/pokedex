export const numberFormat = (n, format='0000')=>{
  let aux = ""
  for(let i =`${n}`.length; i<format.length;i++){
    aux = aux + '0';
  }
  return (aux+n);
}