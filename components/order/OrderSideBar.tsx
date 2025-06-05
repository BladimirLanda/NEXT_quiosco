//COMPONENT ORDER SIDE BAR
import { prisma } from '@/src/lib/prisma'
import CategoryIcon from '../ui/CategoryIcon';
import Logo from '../ui/Logo';

/*
findMany() es un método del cliente de Prisma que se usa para consultar 
varios registros de una tabla (modelo) en la base de datos.
Los devuelve como un arreglo de objetos en TypeScript, donde cada objeto 
corresponde a una fila de la tabla.

findMany({ where })	    Trae registros que cumplen una condición
findMany({ select })	Trae solo los campos especificados
findMany({ orderBy })	Ordena los resultados
findMany({ take })	    Limita la cantidad de registros que devuelve
*/
//CONSULTA DB
async function getCategories() {
    return await prisma.category.findMany();
}

//Componente asíncrono
async function OrderSideBar() {
    //Prisma
    const categories = await getCategories();

    //---VIEW---//
    return (
        <aside className="md:w-72 md:h-screen bg-white">
            <Logo />

            <nav className='mt-10'>
                {categories.map(category => (
                    <CategoryIcon key={category.id}  category={category} />
                ))}
            </nav>
        </aside>
    )
}

export default OrderSideBar;