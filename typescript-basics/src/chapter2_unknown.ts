let someValue: unknown = 999;

// Object is of type 'unknown'.
// const len = someValue.length;

let strLength: number = (someValue as string).length;
console.log(strLength);

strLength = (someValue as string).length;
console.log(strLength);

if (typeof someValue === 'string') {
  let strLength: number = someValue.length;
  console.log(strLength);
} else {
  console.log('wrong type');
}
