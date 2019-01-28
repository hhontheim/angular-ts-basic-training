function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function(x: number, y: number): number {
  return x + y;
};

let myAdd2: (x: number, y: number) => number = (x: number, y: number) => {
  return x + y;
};

let myAdd3: (x: number, y: number) => number = (x, y) => {
  return x + y;
};

// optional parameter
function buildName(firstName: string, lastName?: string): string {
  if (lastName) return firstName + ' ' + lastName;
  else return firstName;
}
let result1 = buildName('Bob'); // works correctly now
// let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName('Bob', 'Adams'); // ah, just right

// default parameter for lastName if not given
function buildName2(firstName: string, lastName = 'Smith'): string {
  return firstName + ' ' + lastName;
}
let result4 = buildName2('Bob'); // works correctly now

// rest parameter
function buildName3(firstName: string, ...restOfName: string[]): string {
  return firstName + ' ' + restOfName.join(' ');
}
let employeeName = buildName3('Joseph', 'Samuel', 'Lucas', 'MacKinzie');

type functionType = (x: number, y: number) => number;
let myAdd5: functionType = (x, y) => {
  return x + y;
};
