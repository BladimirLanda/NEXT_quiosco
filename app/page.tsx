//PAGE GLOBAL
import { redirect } from "next/navigation"
/*
Next.Js (npx create-next-app@latest)
Next.js es un framework de React que permite crear aplicaciones web con características 
avanzadas desde el inicio, sin tener que configurar todo manualmente. Básicamente, 
hace más fácil y rápido trabajar con React, añadiendo funcionalidades como:

1) Renderizado del lado del servidor (SSR)
Permite que las páginas se generen en el servidor antes de enviarlas al navegador, 
mejorando tiempos de carga y SEO.

2) Generación de sitios estáticos (SSG)
Permite pre-generar páginas en tiempo de build, ideal para contenido que no cambia 
con frecuencia.

3) Soporte para API Routes
Permite crear rutas de API en la misma aplicación Next.js sin montar un backend aparte.

4) Sistema de rutas basado en archivos
No se necesita configurar react-router-dom, basta con crear un archivo en la carpeta 
/pages y automáticamente se genera una ruta.

5) Optimización automática
Optimiza imágenes, divide código automáticamente, y gestiona recursos eficientemente.

6) Fullstack en un solo proyecto
Se pueden tener frontend, API, y páginas SSR/SSG en un solo proyecto.

📦 ¿Cómo funciona?
-React sigue siendo el motor de componentes.
-Next.js maneja el enrutamiento y el rendering.
-Se usa una carpeta /pages donde cada archivo .js o .tsx 
se convierte en una ruta.

App Router 
A partir de Next.js 13, se introdujo un nuevo sistema de enrutamiento llamado App Router, 
que convive con el sistema clásico basado en /pages, pero es mucho más flexible, moderno 
y pensado para proyectos grandes.

📁 ¿Cómo funciona?
El App Router usa una carpeta /app en lugar de /pages. Dentro de esa carpeta:
  -Cada subcarpeta se convierte en una ruta.
  -El archivo page.tsx o page.js dentro de esa subcarpeta define la vista/renderizado de esa ruta.
  -Se pueden manejar layouts por sección, loading states, errores personalizados y nested 
  routing mucho más fácil.

Estructura:
/app
  ├── layout.tsx       # Layout general (persistente en todas las rutas hijas)
  ├── page.tsx         # Página principal (/)
  ├── about/
  │    └── page.tsx    # Ruta /about
  └── dashboard/
       ├── layout.tsx  # Layout exclusivo de dashboard
       └── page.tsx    # Ruta /dashboard

📌 Ventajas del App Router:
✅ Routing anidado con layouts persistentes.
✅ Mejor manejo de loading y error states por segmento.
✅ Server Components (por defecto, renderizados en servidor).
✅ Mejor organización de carpetas y código modular.
✅ Sin necesidad de react-router-dom, todo lo maneja Next internamente.

📦 Convención de archivos en /app

Dentro de la carpeta /app, el sistema de rutas funciona por carpetas 
y por convención de nombre de archivos.

📄 page.tsx
Qué es:
El componente que define la vista principal de una ruta.
Ejemplo:
Si tienes /app/about/page.tsx, eso será la página /about.

📄 layout.tsx
Qué es:
Un componente que envuelve a todas las páginas y sub-rutas dentro 
de su carpeta. Sirve para cosas persistentes como menús, headers, footers o sidebars.
Se puede anidar layouts, y cada carpeta puede tener su propio layout.tsx.
Ejemplo:
/app/layout.tsx → se aplica a toda la aplicación.
/app/dashboard/layout.tsx → se aplica solo a las rutas bajo /dashboard.

📄 loading.tsx
Qué es:
Componente que se renderiza automáticamente cuando la ruta está cargando 
(por ejemplo en renderizado desde servidor o al hacer transición de rutas).
Ejemplo:
Un spinner o mensaje de “Cargando...”.

📄 error.tsx
Qué es:
Componente que se renderiza si ocurre un error al cargar esa ruta o sus componentes.
Ejemplo:
Una página de error personalizada o un mensaje amigable.

📄 not-found.tsx
Qué es:
Componente que se renderiza si la ruta no existe (404 personalizado) dentro 
de ese segmento de ruta.

/app
  ├── layout.tsx         # Layout principal de toda la app
  ├── page.tsx           # Página de inicio
  ├── loading.tsx        # Loader global
  ├── dashboard/
  │    ├── layout.tsx    # Layout exclusivo del dashboard
  │    ├── page.tsx      # Página principal de /dashboard
  │    ├── loading.tsx   # Loader solo para /dashboard
  │    ├── error.tsx     # Error solo para /dashboard
  │    └── stats/
  │         ├── page.tsx # Página /dashboard/stats
  │         └── not-found.tsx # 404 solo para /dashboard/stats

📌 Rendering en Next.js
Rendering es el proceso de convertir los componentes React en HTML que 
el navegador puede mostrar.
En Next.js se puede controlar dónde y cuándo se hace ese rendering.

  📍 1️⃣ Server-Side Rendering (SSR)
  Se genera el HTML en el servidor en cada request.
  Ventaja:
  Contenido actualizado siempre y mejor SEO.
  Cómo se usa:
  Con fetch() en un Server Component (por defecto en App Router).

  📍 2️⃣ Static Site Generation (SSG)
  El HTML se genera en build time y se sirve como archivo estático.
  Ventaja:
  Rápido, ideal para contenido que no cambia seguido.
  Cómo se usa:
  En App Router: Server Component sin fetch dinámico.

  📍 3️⃣ Client-Side Rendering (CSR)
  El HTML base se entrega y luego React carga los datos en el navegador
  usando JavaScript.
  Ventaja:
  Interactividad total en frontend, pero no ideal para SEO.
  Cómo se usa:
  Con Client Components (añadiendo "use client" al inicio del archivo).

Con App Router se trabaja con dos tipos de componentes:
Tipo	               Dónde se renderiza	    Cómo se define
Server  Component	   En el servidor	        Por defecto sin "use client"
Client  Component	   En el navegador	      Añadiendo "use client" al inicio
*/

/*
Prisma ORM https://www.prisma.io/docs
-npm i @prisma/client
-npm i -D prisma
-npx prisma init

Prisma es un ORM (Object Relational Mapper) para Node.js y TypeScript 
que permite interactuar con bases de datos relacionales de forma 
tipada, segura y moderna.
👉 Traduce consultas de bases de datos (SQL) a métodos de JavaScript/TypeScript.

📦 ¿Cómo funciona Prisma?
1) Se define un archivo de esquema (schema.prisma) donde se declaran los 
modelos (equivalentes a tablas).

2) Prisma genera:
  -Migraciones SQL
  -Un Client personalizado y tipado para hacer queries en TypeScript.

3) Se usa ese Client para crear, leer, actualizar o eliminar registros de 
manera tip-safe.

📦 Prisma Client
Se genera un cliente en node_modules/.prisma/client que se puede importar.
Y todo viene tipado automáticamente según el schema.prisma.

📌 Ventajas de Prisma:
✅ Queries 100% tipadas
✅ Muy rápido
✅ Fácil de leer y mantener
✅ Soporta PostgreSQL, MySQL, SQLite, SQL Server y MongoDB
✅ Integración fácil con Next.js, Express, Koa, Fastify, etc.
*/

function Home() {
  //Redirect
  redirect('/order/cafe')
}

export default Home;
