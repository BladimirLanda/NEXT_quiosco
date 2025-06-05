//GO BACK BUTTON
"use client"
import { useRouter } from "next/navigation"


/*
router.back()
Es un método del router (ya sea de next/navigation o next/router) que:
    -Navega a la página anterior en el historial del navegador.
    -Es equivalente a hacer window.history.back() en el navegador.
*/
function GoBackButton() {
    //Router
    const router = useRouter();

    //---VIEW---//
    return (
        <button onClick={() => router.back()}
        className="w-full px-10 py-3 text-center font-bold text-xl bg-amber-400 
        cursor-pointer lg:w-auto hover:shadow-sm">
            Volver
        </button>
    )
}

export default GoBackButton;