"use client"
import { UploadSuccessResultSchema } from '@/src/schema'
import { getImagePath } from '@/src/utils'
import { CldUploadWidget } from 'next-cloudinary' //npm i next-cloudinary
import Image from 'next/image'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb' //npm i react-icons

/*
cloudinary
Cloudinary es un servicio en la nube especializado en almacenar, 
transformar y entregar archivos multimedia (imágenes, videos, audios).

Da varias ventajas:
    -Subida de archivos desde el frontend o backend.
    -Optimización automática de imágenes (formato webp, compresión, resize, etc.)
    -Entrega por CDN super rápida.
    -Transformaciones dinámicas desde la URL.
    -Hosting de videos también.
    -Panel de control y API para manejar todos los recursos.
Ideal para apps que manejan muchas imágenes o necesitan manipularlas.

CldUploadWidget
Es un componente React que ofrece Cloudinary mediante su SDK para Next.js.
Este componente permite abrir un widget (ventana modal) donde se puede seleccionar 
y subir una imagen directamente desde el frontend a la cuenta de Cloudinary.
📌 ¿Qué hace?
    -Crea un formulario oculto para seleccionar una imagen.
    -Hace la carga directamente a Cloudinary (sin pasar por tu servidor).
    -Regresa información del archivo subido (URL, public_id, tamaño, etc.)
    -Permite configurar presets y opciones desde props.

-uploadPreset
Es una configuración que defines en tu cuenta de Cloudinary para indicar 
cómo se deben subir los archivos (carpeta destino, restricciones, etc.)

En este caso:
Cloudinary necesita un Upload Preset para poder aceptar imágenes subidas sin firma (unsigned uploads).
Este preset es como una configuración predefinida en tu cuenta de Cloudinary que le dice 
cómo aceptar imágenes desde formularios públicos (sin firma).

-options={{}}
El prop options permite personalizar la configuración del widget de carga de Cloudinary 
desde el frontend.

    sources: ['local', 'url'], // De dónde se pueden subir imágenes
    multiple: false, // Permitir solo una imagen a la vez
    maxFiles: 1, //Estable el número máximo de archivos a subir
    folder: 'quiosco', // Carpeta donde se almacenan en Cloudinary
    cropping: true, // Activar crop antes de subir
    resourceType: 'image', // Tipo de recurso
    maxFileSize: 5000000, // Tamaño máximo en bytes (5MB)
    clientAllowedFormats: ['png', 'jpeg', 'jpg'], // Tipos permitidos

-onSuccess{() => {}}
Es un callback que se ejecuta cuando una imagen (u otro recurso) 
se carga correctamente a Cloudinary.
Recibe dos parámetros:
    (result, { widget })

Parámetro	    ¿Qué contiene?
result	        La respuesta de Cloudinary sobre la carga (URL, public_id, etc) *Configurar 'nextConfig'
{ widget }	    El widget activo, por si quieres hacer algo extra como widget.close()

-{({ open }) => ( ... )}
Cloudinary usa render props para darte acceso a funciones como 
open() para abrir el widget.

OTROS:
@ts-ignore
Cuando se pone esa línea encima de una instrucción en TypeScript, le dices 
al compilador de TypeScript:
    “Ignora cualquier error de tipado en la siguiente línea”
Así que aunque TypeScript detecte que result.info.secure_url no está tipado 
correctamente o result es any o unknown, lo dejará pasar sin mostrar error de compilación.

inset-0 (top: 0; right: 0; bottom: 0; left: 0;)
O sea, posiciona absolutamente el elemento para que ocupe todo el espacio de su contenedor.

style={{ objectFit: 'contain' }}
Esto aplica cómo se adapta la imagen al contenedor.
En este caso:
    -La imagen se escala para caber completamente dentro del contenedor, 
    manteniendo su proporción original.
    -Si sobra espacio, lo deja en blanco (no recorta ni estira).

    Otras propiedades:
    -Cover: Cubre todo el contenedor recortando
    -fill: Deforma para ocupar todo el contenedor
*/

function ImageUpload( { image } : { image: string | undefined } ) {
    //State
    const [imageUrl, setImageUrl] = useState('');

    //---VIEW---//
    return (
        <CldUploadWidget 
            uploadPreset="next-quiosco"
            options={{
                maxFiles: 1
            }}
            onSuccess={(result: unknown, { widget }) => {
                const getResult = UploadSuccessResultSchema.safeParse(result);

                if(getResult.success) {
                    if(getResult.data.event === 'success') {
                        setImageUrl(getResult.data.info.secure_url);
                        widget.close();
                    }
                }
            }}
        >
            {( { open } ) => (
                <>
                    <div className='space-y-2'>
                        <label className='text-slate-800'>
                            Imagen Producto
                        </label>

                        <div className='relative p-10 flex flex-col justify-center items-center gap-4
                        border-neutral-300 text-neutral-600 bg-slate-100 cursor-pointer 
                        hover:opacity-70 transition'
                        onClick={() => open()}>
                            <TbPhotoPlus size={50} />

                            <p className='text-lg font-semibold'>
                                Agregar Imagen
                            </p>

                            {imageUrl && (
                                <div className='w-full h-full absolute inset-0'>
                                    <Image 
                                        fill
                                        style={{
                                            objectFit: 'contain'
                                        }}
                                        src={imageUrl}
                                        alt='Imagen de Producto'
                                    />
                                </div>
                            )}
                        </div>
                        
                        {image && !imageUrl && (
                            <div className='space-y-2'>
                                <label>
                                    Imagen Actual:
                                </label>

                                <div className='relative w-64 h-64'>
                                    <Image 
                                        fill
                                        style={{
                                            objectFit: 'contain'
                                        }}
                                        src={getImagePath(image)}
                                        alt='Imagen de Producto'
                                    />
                                </div>
                            </div>
                        )}

                        <input 
                            type="hidden" 
                            name='image'
                            defaultValue={imageUrl ? imageUrl : image}
                        />
                    </div>
                </>
            )}
        </CldUploadWidget>
    )
}

export default ImageUpload;

