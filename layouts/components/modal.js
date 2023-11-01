import {IoClose} from 'react-icons/io5'

function Modal() {
  return (
    <div className="sticky bottom-0 bg-gray-300 w-full overflow-x-hidden rounded-lg p-4">
        <p className="text-black text-xl font-bold pb-4">Politicas de Seguridad</p>
        <p className="text-black">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos necessitatibus distinctio laboriosam labore reiciendis, eveniet adipisci eos harum nemo odit sed iste maiores, commodi molestias voluptatum aut fugit id amet.</p>
        <div className='bg-slate-100 absolute rounded-md right-4 top-3'>
            <a href="">
                <IoClose color='black' size={35}/>
            </a>
        </div>
        <div className='bg-black w-20 h-10 mt-4 rounded-md flex justify-center items-center'>
            <a href="">
                <p className='text-white text-center'>Aceptar</p>
                
            </a>
        </div>
    </div>
  )
}

export default Modal