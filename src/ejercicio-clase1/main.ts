import { CustomList } from './custom_list.js';

const numberList = new CustomList<number>([1, 2, 3, 4, 5]);


console.log("Lista original:", numberList.toArray());

console.log("Append:", numberList.append(new CustomList<number>([6, 7])));
console.log("Concatenate:", CustomList.concatenate(numberList, numberList).toArray());
console.log("Filter (números > 2):", numberList.filter(n => n > 2).toArray());
console.log("Length:", numberList.length());
console.log("Map (*2):", numberList.map(n => n * 2).toArray());


