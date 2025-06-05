//STORE - ZUSTAND
import { create } from "zustand"
import { OrderItem } from "./types"
import { Product } from "@prisma/client"

/*
Zustand
Zustand es una librería minimalista de manejo de estado global en React.

create<Store>
	Crea y expone el estado global para la aplicación
    Retorna un hook personalizado.

() => ({ estadoInicial, actiones })
    Función que retorna el estado inicial y las acciones

set(newState)
    set es una función que modifica el estado del store.
    Permite actualizar el estado de forma inmutable.
    El newState es un objeto con las propiedades del 
    estado que se quiere actualizar.
Estructura:
    set((state) => ({
        // cambios al estado
    }))
    Aquí set recibe una función que recibe el estado actual 
    state y retorna un objeto con los cambios.

get()
    Es una función que permite acceder al estado actual del 
    store desde dentro del callback .
    Sirve para leer valores del estado cuando defines acciones 
    o funciones que necesitan consultar el estado antes de modificarlo.

El componente que use el hook de Zustand debe ser un componente
Client, porque Zustand es una librería para estado React que 
funciona en el cliente.
*/

interface Store {
    order: OrderItem[],
    addToOrder: (product: Product) => void,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    removeItem: (id: Product['id']) => void,
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],

    addToOrder: (product) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { categoryId: _categoryId, image: _image, ...data } = product;
        let order :OrderItem[] = [];

        if(get().order.find( item => item.id === data.id )) {
            order = get().order.map(item => item.id === data.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price
            } : item);
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set(() => ({
            order
        }))
    },

    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price
            } : item)
        }))
    },

    decreaseQuantity: (id) => {
        const order = get().order.map(item => item.id === id ?{
            ...item,
            quantity: item.quantity -1,
            subtotal: (item.quantity - 1) * item.price
        } : item)

        set(() => ({
            order
        }))
    },

    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },

    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}));