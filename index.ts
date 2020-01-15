

const ssnRegex = new RegExp(/\d{3}-\d{2}-\d{4}/, 'g');

export function maskSSN(obj: any){
    const oType = typeof obj;
    if(oType ==='string'){
      return obj.replace(ssnRegex, 'XXX-XX-XXXX');
    }else if(oType === 'object' ){
      // cpu intensive
      // const str = JSON.stringify(obj);
      // return JSON.parse(fixSSN(str));

      if(Array.isArray(obj)){
        return obj.map(v=> maskSSN(v));
      }

      return Object
      .keys(obj)
      .reduce((prev, okey)=>{
        const value = obj[okey];
        prev[okey] = maskSSN(value);

        return prev;
      }, {});
    }else{
      return obj;
    }
}

const originalLog = console.log;
console.log = function(...args){
  const nargs = args.map(a=>{
    return maskSSN(a);
  });
  return originalLog(...nargs);
}

const message = 'joe ssn 123-45-3454';
const obj = {
  test: message,
  ssn: '343-34-3444'
};
const arr = [
 'hello: ssn is : 123-23-5555',
  'some number 123-34-1543'
];

console.log('-------------');
console.log(message);
console.log(obj);
console.log(arr);
