//LOGO
import Image from 'next/image'

function Logo() {
    //---VIEW---//
    return (
        <div className='mt-5 flex justify-center'>
            <div className='relative w-40 h-40'>
                <Image 
                    fill
                    alt='Logotipo Fresh Coffe'
                    src='/logo.svg'
                />
            </div>
        </div>
    )
}

export default Logo