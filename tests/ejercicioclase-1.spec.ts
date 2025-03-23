/**
 * Fichero test para probar las funcionalidades del código
 */

import { describe, expect, test } from 'vitest';
import { CustomList } from '../src/ejercicio-clase1/custom_list';

describe("CustomList", () => {
  // append
  test("append debe añadir elementos de una lista vacía", () => {
    const list1 = new CustomList<number>([]);
    const list2 = new CustomList<number>([4, 5]);
    list1.append(list2);
    expect(list1.toArray()).toEqual([4, 5]);
  });

  test("append debe mantener los elementos originales y añadir los nuevos", () => {
    const list1 = new CustomList<number>([1, 2, 3]);
    const list2 = new CustomList<number>([4, 5]);
    list1.append(list2);
    expect(list1.toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  test("append no debe modificar la lista agregada", () => {
    const list1 = new CustomList<number>([1, 2]);
    const list2 = new CustomList<number>([3, 4]);
    list1.append(list2);
    expect(list2.toArray()).toEqual([3, 4]);
  });

  test("append debe poder trabajar con tipos varios", () => {
    const list1 = new CustomList<string>(["ho", "la"])
    const list2 = new CustomList<string>(["ad", "ios"])
    list1.append(list2);
    expect(list1.toArray()).toEqual(["ho","la","ad","ios"])
  });

  // concatenate
  test("concatenate debe funcionar con listas vacías", () => {
    const list1 = new CustomList<number>([]);
    const list2 = new CustomList<number>([]);
    const result = CustomList.concatenate(list1, list2);
    expect(result.toArray()).toEqual([]);
  });

  test("concatenate debe funcionar con una sola lista", () => {
    const list1 = new CustomList<number>([1, 2, 3]);
    const result = CustomList.concatenate(list1);
    expect(result.toArray()).toEqual([1, 2, 3]);
  });

  test("concatenate debe combinar listas con diferentes tamaños", () => {
    const list1 = new CustomList<number>([1]);
    const list2 = new CustomList<number>([2, 3, 4]);
    const list3 = new CustomList<number>([5, 6]);
    const result = CustomList.concatenate(list1, list2, list3);
    expect(result.toArray()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("concatenate debe poder trabajar con tipos varios", () => {
    const list1 = new CustomList<string>(["ho", "la"])
    const list2 = new CustomList<string>(["ad", "ios"])
    const list3 = new CustomList<string>(["que", "tal"]) 
    const result = CustomList.concatenate(list1, list2, list3);
    expect(result.toArray()).toEqual(["ho","la","ad","ios","que", "tal"]);
  });

  // filter
  test("filter debe devolver una lista vacía si ningún elemento cumple el predicado", () => {
    const list = new CustomList<number>([1, 2, 3]);
    expect(list.filter(n => n > 10).toArray()).toEqual([]);
  });

  test("filter debe devolver la lista original si todos los elementos cumplen el predicado", () => {
    const list = new CustomList<number>([1, 2, 3]);
    expect(list.filter(n => n > 0).toArray()).toEqual([1, 2, 3]);
  });

  test("filter debe manejar correctamente elementos negativos", () => {
    const list = new CustomList<number>([-3, -2, -1, 0, 1, 2, 3]);
    expect(list.filter(n => n < 0).toArray()).toEqual([-3, -2, -1]);
  });

  // filter con otro tipo
  test("filter con tipo string debe devolver una lista con los elementos que contienen 'a'", () => {
    const list = new CustomList<string>(["hola", "mundo", "javascript", "programacion"]);
    expect(list.filter(s => s.includes("a")).toArray()).toEqual(["hola", "javascript", "programacion"]);
  });

  // length
  test("length debe retornar 0 para una lista vacía", () => {
    const list = new CustomList<number>([]);
    expect(list.length()).toBe(0);
  });

  test("length debe retornar 1 para una lista con un solo elemento", () => {
    const list = new CustomList<number>([10]);
    expect(list.length()).toBe(1);
  });

  test("length debe contar correctamente elementos en listas grandes", () => {
    const list = new CustomList<number>(Array(100).fill(1));
    expect(list.length()).toBe(100);
  });

  // map
  test("map debe funcionar con una función identidad (variable)", () => {
    const list = new CustomList<number>([1, 2, 3]);
    expect(list.map(n => n).toArray()).toEqual([1, 2, 3]);
  });

  test("map debe transformar valores correctamente", () => {
    const list = new CustomList<number>([1, 2, 3]);
    expect(list.map(n => n * 3).toArray()).toEqual([3, 6, 9]);
  });

  test("map debe manejar correctamente una lista vacía", () => {
    const list = new CustomList<number>([]);
    expect(list.map(n => n * 3).toArray()).toEqual([]);
  });

  // reduce
  test("reduce debe devolver el valor inicial si la lista está vacía", () => {
    const list = new CustomList<number>([]);
    expect(list.reduce((acc, n) => acc + n, 10)).toBe(10);
  });

  test("reduce debe calcular correctamente la suma de elementos", () => {
    const list = new CustomList<number>([1, 2, 3]);
    expect(list.reduce((acc, n) => acc + n, 0)).toBe(6);
  });

  test("reduce debe calcular correctamente la multiplicación de elementos", () => {
    const list = new CustomList<number>([1, 2, 3, 4]);
    expect(list.reduce((acc, n) => acc * n, 1)).toBe(24);
  });

  // reverse
  test("reverse debe devolver una lista vacía si la original está vacía", () => {
    const list = new CustomList<number>([]);
    expect(list.reverse().toArray()).toEqual([]);
  });

  test("reverse debe devolver la misma lista si tiene un solo elemento", () => {
    const list = new CustomList<number>([42]);
    expect(list.reverse().toArray()).toEqual([42]);
  });

  test("reverse debe invertir correctamente una lista con varios elementos", () => {
    const list = new CustomList<number>([1, 2, 3, 4]);
    expect(list.reverse().toArray()).toEqual([4, 3, 2, 1]);
  });

  // forEach
  test("forEach debe ejecutar la función en cada elemento", () => {
    const list = new CustomList<number>([1, 2, 3]);
    let sum = 0;
    list.forEach(n => sum += n);
    expect(sum).toBe(6);
  });

  test("forEach puede modificar valores externos", () => {
    const list = new CustomList<number>([2, 3, 4]);
    let values: number[] = [];
    list.forEach(n => values.push(n * 2));
    expect(values).toEqual([4, 6, 8]);
  });

  test("forEach no debe ejecutar la función si la lista está vacía", () => {
    const list = new CustomList<number>([]);
    let called = false;
    list.forEach(() => called = true);
    expect(called).toBe(false);
  });

  // forEach con otro tipo
  test("forEach con tipo string debe ejecutar la función en cada cadena", () => {
    const list = new CustomList<string>(["uno", "dos", "tres"]);
    let result = "";
    list.forEach(s => result += s);
    expect(result).toBe("unodostres");
  });
});
