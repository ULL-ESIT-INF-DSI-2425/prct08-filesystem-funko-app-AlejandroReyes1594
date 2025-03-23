/**
 * Clase para la creación de una lista de elementos de cualquier tipo, con la que se realizarán una serie de operaciones
 */
export class CustomList<T> {
    private elements: T[] = [];
  
    /**
     * Constructor que permite inicializar la lista con elementos opcionales
     * @param elements - Un array de elementos de tipo `T` (opcional)
     */
    constructor(elements: T[] = []) {
      this.elements = [...elements];
    }
  
    /**
     * Agrega los elementos de otra lista al final de la actual
     * @param list - Lista de tipo `CustomList<T>` cuyos elementos se agregarán
     */
    append(list: CustomList<T>): void {
      for (let i = 0; i < list.length(); i++) {
        this.elements[this.elements.length] = list.get(i);
      }
    }
  
    /**
     * Concatena múltiples listas en una nueva lista
     * @param lists - Una serie de listas de tipo `CustomList<T>` a combinar
     * @returns Una nueva lista `CustomList<T>` con todos los elementos concatenados
     */
    static concatenate<T>(...lists: CustomList<T>[]): CustomList<T> {
      let result = new CustomList<T>();
      for (const list of lists) {
        for (let i = 0; i < list.length(); i++) {
          result.elements[result.elements.length] = list.get(i);
        }
      }
      return result;
    }
  
    /**
     * Filtra la lista según el predicado proporcionado
     * @param predicate - Función de filtro que evalúa cada elemento y devuelve `true` o `false`
     * @returns Una nueva lista `CustomList<T>` con los elementos que cumplen la condición
     */
    filter(predicate: (value: T) => boolean): CustomList<T> {
      let result = new CustomList<T>();
      for (let i = 0; i < this.elements.length; i++) {
        if (predicate(this.elements[i])) {
          result.elements[result.elements.length] = this.elements[i];
        }
      }
      return result;
    }
  
    /**
     * Devuelve la cantidad de elementos de la lista
     * @returns El número total de elementos en la lista
     */
    length(): number {
      let count = 0;
      while (this.elements[count] !== undefined) {
        count++;
      }
      return count;
    }
  
    /**
     * Aplica una función a cada elemento y retorna una nueva lista con los resultados
     * @param callback - Función que recibe un elemento de la lista y devuelve otro valor
     * @returns Una nueva lista `CustomList<U>` con los elementos transformados
     */
    map<U>(callback: (value: T) => U): CustomList<U> {
      let result = new CustomList<U>();
      for (let i = 0; i < this.elements.length; i++) {
        result.elements[result.elements.length] = callback(this.elements[i]);
      }
      return result;
    }
  
    /**
     * Aplica una función acumuladora a cada elemento de la lista, reduciéndola a un solo valor.
     * @param callback - Función que toma un acumulador y un elemento, y devuelve un nuevo acumulador.
     * @param initialValue - Valor inicial del acumulador.
     * @returns El valor acumulado después de aplicar la función a todos los elementos.
     */
    reduce<U>(callback: (acc: U, element: T) => U, initialValue: U): U {
        let accumulator = initialValue;
        for (const elemento of this.elements) {
        accumulator = callback(accumulator, elemento);
        }
        return accumulator;
    }

    /**
     * Devuelve una nueva lista con los elementos en orden inverso.
     * @returns Una nueva lista con los elementos en orden contrario al original.
     */
    reverse(): CustomList<T> {
        const result = new CustomList<T>();
        for (let i = this.length() - 1; i >= 0; i--) {
        result.append(new CustomList([this.elements[i]]));
        }
        return result;
    }

    /**
     * Itera sobre la lista y ejecuta una función en cada elemento.
     * @param callback - Función que se ejecuta con cada elemento de la lista.
     */
    forEach(callback: (element: T) => void): void {
        for (const elemento of this.elements) {
        callback(elemento);
        }
    }


    /**
     * Devuelve un elemento en una posición específica
     * @param index - La posición del elemento a obtener
     * @returns El elemento en la posición indicada
     * @throws Error si el índice está fuera de los límites
     */
    get(index: number): T {
      if (index < 0 || index >= this.length()) {
        throw new Error("Fuera de los límites");
      }
      return this.elements[index];
    }
  
    /**
     * Devuelve la lista como un array (para pruebas)
     * @returns Un array con todos los elementos de la lista
     */
    toArray(): T[] {
      return [...this.elements];
    }
  }
  