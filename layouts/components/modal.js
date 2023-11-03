
import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'


function Modal() {
    const [privacy, setPrivacy] = useState(false)
    useEffect(() => {
        // if (privacy == true) {
        //     let modal = document.getElementById('modal')
        //     modal.classList.replace('fixed', 'hidden')
        // }
        if (localStorage.getItem('with-modal')) {
            let modal = document.getElementById('modal')
            modal.classList.replace('fixed', 'hidden')
          }
    }, [privacy])


    const closeM = () => {
        let modal = document.getElementById('modal')
        modal.classList.replace('fixed', 'hidden')
    }

    const privacyP = () => {
        setPrivacy(true)
        localStorage.setItem('with-modal', true);
    }
    return (
        <div className="fixed bottom-2 bg-gray-300 w-full overflow-x-hidden rounded-lg p-4 Modal z-50" id='modal'>
            <div>
                <p className="text-black text-xl font-bold pb-4">Politicas de Seguridad</p>
                <p className="text-black">En TopTenProducts, tu seguridad y privacidad son de suma importancia para nosotros. Queremos asegurarte que puedas explorar nuestras reseñas de productos con total confianza. Nuestro principal objetivo es proporcionarte información precisa y actualizada sobre los productos más destacados en diversas plataformas de comercio electrónico, de modo que puedas tomar decisiones informadas de compra.
                </p>
                <p className='text-black text-md font-bold mt-3 mb-3'>Enlaces a Páginas de Compra Oficiales</p>
                <p className="text-black">Cuando encuentres un producto que te interese en nuestras reseñas, ten la seguridad de que serás dirigido a la página de compra oficial de la plataforma en la que se vende el producto. Nunca te redirigiremos a sitios web no verificados o no oficiales. Nuestra prioridad es proporcionarte enlaces seguros y directos a las fuentes originales para que puedas realizar tu compra sin preocupaciones.
                </p>
            </div>

            <div className='bg-slate-100 absolute rounded-md right-4 top-3 z-50'>
                <a onClick={closeM}>
                    <IoClose color='black' size={35} />
                </a>
            </div>
            <div className='bg-black w-20 h-10 mt-4 rounded-md flex justify-center items-center relative z-50'>
                <a onClick={privacyP}>
                    <p className='text-white text-center'>Aceptar</p>
                </a>
            </div>
        </div>
    )
}

export default Modal