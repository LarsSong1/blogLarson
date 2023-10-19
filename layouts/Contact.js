import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { FaCheck, FaEnvelope, FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import ImageFallback from "./components/ImageFallback";
import emailjs from '@emailjs/browser'
import { useRef } from "react";
import { Toaster, toast } from "sonner";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, form_action, phone, mail, location } = frontmatter;
  const formulario = useRef()


  const validateForm = () => {
    let name = document.getElementById('nameField')
    let nameError = document.getElementById('nameError')
    console.log(nameError)
    let email = document.getElementById('emailField')
    let emailError = document.getElementById('emailError')
    let message = document.getElementById('messageField')
    let messageError = document.getElementById('messageError')
    let city = document.getElementById('cityField')
    let cityError = document.getElementById('cityError')

    let valid = true;

    if (name.value.trim() === '') {
      nameError.classList.replace('opacity-0', 'opacity-100');
      valid = false;
    } else {
      nameError.classList.replace('opacity-100', 'opacity-0');
    }

    if (email.value.trim() === '') {
      emailError.classList.replace('opacity-0', 'opacity-100');
      valid = false;
    } else {
      emailError.classList.replace('opacity-100', 'opacity-0');
    }

    if (message.value.trim() === '') {
      messageError.classList.replace('opacity-0', 'opacity-100');
      valid = false;
    } else {
      messageError.classList.replace('opacity-100', 'opacity-0');
    }

    if (city.value.trim() === '') {
      cityError.classList.replace('opacity-0', 'opacity-100');
      valid = false;
    } else {
      cityError.classList.replace('opacity-100', 'opacity-0');
    }


    // Validar otros campos si es necesario

    return valid;
  };

  const sendForm = (e) => {
    e.preventDefault()
    if (validateForm()){
      emailjs.sendForm('TopTenPr', 'template_8sq7uqs', formulario.current, '6SV7MIv3wLeQw068j')
      .then((res) => {
        console.log(`${res.text} correcto`)
        emailSent()

      }, (error) => {
        console.log(error)
      })

    }
    

  }

  const emailSent = () => {
    return toast('Se ha enviado correctamente', {
      icon: <FaCheck />,
      description: 'Tu correo será contestado apenas sea leído',
      duration: 5000,
      position: 'top-center'
    })
  }

  return (
    <section className="section lg:mt-16">
      <Toaster toastOptions={{
        style: { backgroundColor: '#000000', color: 'white' }
      }} />
      <div className="container">
        <div className="row relative pb-16 ">
          <ImageFallback
            className="-z-[1] object-cover object-top"
            src={"/images/moda y tech.svg"}
            fill="true"
            alt="moda y tecnologia"
            priority={true}
          />
          <div className="lg:col-6">
            {markdownify(
              title,
              "h1",
              "h1 my-10 lg:my-11 lg:pt-11 text-center lg:text-left lg:text-[64px]"
            )}
          </div>
          <div className="contact-form-wrapper rounded border border-border p-6 dark:border-darkmode-border lg:col-6"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
          >
            <h2>
              Enviame un
              <span className="ml-1.5 inline-flex items-center text-primary">
                Mensaje
                <BsArrowRightShort />
              </span>
            </h2>
            <form class="w-full max-w-lg" ref={formulario} onSubmit={sendForm}>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Nombre
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="nameField" type="text" placeholder="Alejandro" name="Nombre"/>
                  <p class="text-red-500 text-xs opacity-0" id="nameError">Ingresa un Nombre</p>
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Correo Electrónico
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="emailField" type="text" placeholder="ejemplo@gmail.com" name="Correo" />
                  <p class="text-red-500 text-xs opacity-0" id="emailError">Ingresa un correo</p>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="message">
                    Mensaje
                  </label>
                  <textarea className="textarea appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Asunto" id="messageField" name="Mensaje"></textarea>
                  <p class="">Hazme saber tu inquietud</p>
                  <p class="text-red-500 text-xs opacity-0" id="messageError">Escribe un mensaje</p>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-3/6 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    País - Ciudad
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="cityField" type="text" placeholder="Ecuador - Guayaquil" name="Ciudad" />
                  <p class="text-red-500 text-xs opacity-0" id="cityError">Escribe un lugar</p>
                </div>
              </div>
              <button className="btn btn-active bg-amber-700 hover:bg-orange-800 text-black border-amber-50 hover:border-amber-100 mt-4" type="submit" >Enviar</button>
            </form>
          </div>
        </div>
        <div className="row">
          {phone && (
            <div className="md:col-6 lg:col-4"
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-once="false"
            >
              <Link
                href={`tel:${phone}`}
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-primary dark:border-darkmode-border"
              >
                <FaUserAlt />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {phone}
                </p>
              </Link>
            </div>
          )}
          {mail && (
            <div className="md:col-6 lg:col-4"
              data-aos="fade-up"
              data-aos-duration="1700"
              data-aos-easing="ease-in-out"
              data-aos-once="false"
            >
              <Link
                href={`mailto:${mail}`}
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-primary dark:border-darkmode-border"
              >
                <FaEnvelope />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {mail}
                </p>
              </Link>
            </div>
          )}
          {location && (
            <div className="md:col-6 lg:col-4"
              data-aos="fade-up"
              data-aos-duration="1900"
              data-aos-easing="ease-in-out"
              data-aos-once="false"
            >
              <span
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-primary dark:border-darkmode-border"
              >
                <FaMapMarkerAlt />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {location}
                </p>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
