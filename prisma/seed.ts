//SEED
import { PrismaClient } from "@prisma/client"
import { categories } from "./data/categories"
import { products } from "./data/products"

/*
Seeding

Seeding es el proceso de insertar datos iniciales o de prueba en tu base de datos.
Se usa para:
-Poblar la base con datos básicos al iniciar un proyecto.
-Insertar datos de prueba mientras desarrollas.
-Cargar datos obligatorios que la app necesita para funcionar 
(por ejemplo, roles de usuario, categorías, etc.)

package.json:
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}

Comando: npx prisma db seed
*/
const prisma = new PrismaClient();

async function main () {
    await prisma.category.createMany({
        data: categories
    });

    console.log('Categorías insertadas ✅');

    await prisma.product.createMany({
        data: products
    });

    console.log('Productos insertados ✅');
}

main()
    .catch( e => {
        console.error('❌ Error al insertar datos:', e);
        process.exit(1);
    })
    .finally( async() => {
        await prisma.$disconnect();
    } )