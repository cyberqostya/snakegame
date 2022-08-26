function findUniquesCoordObjectsFromArrays(mainArr, exclusArr) {
  if(exclusArr.length === 0) return mainArr;
  const result = [];
  for( let i=0; i < mainArr.length; i++ ) {
    for( let j=0; j < exclusArr.length; j++) {
      if( mainArr[i].x === exclusArr[j].x && mainArr[i].y === exclusArr[j].y ) {
        break; 
      } else if(j+1 === exclusArr.length) {
        result.push(mainArr[i]);
      }
    }
  }
  return result;
}


function getUniqueKey(name) {
  const lett = 'aabcdefghijklmnopqrstuvwxyz';

  const randMul = Math.floor(Math.random()*(lett.length-1)) + 1;
  const randLett = lett[randMul];
  const lessLett = lett[Math.floor(Math.random()*lett.length)];

  return name[0].charCodeAt() * randMul + randLett + lessLett + randMul;
}


function getReadableDate() {
  const time = new Date();
  return `${time.getDate()}.${time.getMonth()+1}.${time.getFullYear()}-${time.getHours()}:${time.getMinutes()}`;
}


function getNameAndCode(name) {
  return [name.match(/(.+)(-)/)[1], name.match(/(-)(.+)/)[2]];
}


export { 
  findUniquesCoordObjectsFromArrays, 
  getUniqueKey,
  getReadableDate,
  getNameAndCode,
};
