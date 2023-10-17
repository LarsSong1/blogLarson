import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { FaEnvelope, FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import ImageFallback from "./components/ImageFallback";
import emailjs from '@emailjs/browser'
import { useRef } from "react";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, form_action, phone, mail, location } = frontmatter;
  const formulario = useRef()

  const sendForm  = (e) =>{
    e.preventDefault()
    emailjs.sendForm('TopTenPr', 'template_8sq7uqs', formulario.current, '6SV7MIv3wLeQw068j')
      .then((res)=>{
          console.log(res.text)
      }, (error)=>{
        console.log(error)
      })
    
  }

  return (
    <section className="section lg:mt-16">
      <div className="container">
        <div className="row relative pb-16">
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
            {/* <form
              className="contact-form mt-12"
              method="POST"
              action={form_action}
            >
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="name">
                  Nombre Completo
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="name"
                  type="text"
                  placeholder="Alejandro P"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="email">
                  Correo Electrónico
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="email"
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="subject">
                  Asunto
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="subject"
                  type="text"
                  placeholder="Sobre el Blog"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="message">
                  Mensaje
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <textarea
                  className="form-textarea w-full"
                  placeholder="Hola Soy ‘X’ de………….."
                  rows="7"
                />
              </div>
              <input
                className="btn btn-primary"
                type="submit"
                value="Enviar"
              />
            </form> */}
            <form class="w-full max-w-lg">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Nombre 
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Alejandro" />
                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Correo Electrónico
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="ejemplo@gmail.com" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="message">
                    Mensaje
                  </label>
                  <textarea className="textarea appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Asunto" id="message"></textarea>
                    <p class="">Hazme saber tu inquietud</p>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-3/6 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                     País - Ciudad
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Ecuador - Guayaquil" />
                </div>
              </div>
              <button className="btn btn-active bg-amber-700 hover:bg-orange-800 text-black border-amber-50 hover:border-amber-100 mt-4">Enviar</button>
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
