
// ----
const div: HTMLElement = document.getElementById('code');
// to print on the screeen
function print(...arr){
    arr.forEach(a=>{
      const str = typeof a === 'object'? JSON.stringify(a): a;
      div.innerHTML += str + '<br>';
    });
}
// -----

const ssnRegex = new RegExp(/\d{3}-\d{2}-\d{4}/, 'g');

export function replacer(msg: string){
  return msg.replace(ssnRegex, 'XXX-XX-XXXX')
            // additional replacement
}

export function mask(obj: any){
    const oType = typeof obj;
    if(oType ==='string'){
      return replacer(obj);
    }else if(oType === 'object' ){
      // cpu intensive
      // const str = JSON.stringify(obj);
      // return JSON.parse(fixSSN(str));

      if(Array.isArray(obj)){
        return obj.map(v=> mask(v));
      }

      return Object
      .keys(obj)
      .reduce((prev, okey)=>{
        const value = obj[okey];
        prev[okey] = mask(value);

        return prev;
      }, {});
    }else{
      return obj;
    }
}

const originalLog = console.log;
console.log = function(...args){
  const nargs = args.map(a=>{
    return mask(a);
  });
  // to show on html page here
  print(...nargs);
  // ------
  return originalLog(...nargs);
}

const message = "John Doe's SSN 123-45-3454";
const obj = {
  test: message,
  ssn: '343-34-3444'
};
const arr = [
  'hello: ssn is : 123-23-5555',
  'some number 123-34-1543'
];

// console.log('-------------');
console.log(message);
// console.log(obj);
// console.log(arr);
