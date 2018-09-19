function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}

class Person {
  constructor(public name: string) {}
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
    console.log('this', this);
  }
}
var jim = extend(new Person('Jim'), new ConsoleLogger());
var n = jim.name;
jim.log();

/* */
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function getSmallPet(): Fish | Bird {
  // ...
  return { fly: () => {}, layEggs: () => {} } as Bird;
}

let pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim(); // errors

function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

// if(pet){
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

/* */
console.log(isFish(getSmallPet()));

function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
  return 1;
}

/* */

interface Square {
  kind: 'square';
  size: number;
}
interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}
interface Circle {
  kind: 'circle';
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.height * s.width;
    case 'circle':
      return Math.PI * s.radius ** 2;
  }
}
console.log(area({ kind: 'square', size: 5 }));
console.log(area({ kind: 'rectangle', width: 1, height: 5 }));
