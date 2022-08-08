function findUniquesCoordObjectsFromArrays(mainArr, exclusArr) {
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

export { findUniquesCoordObjectsFromArrays };