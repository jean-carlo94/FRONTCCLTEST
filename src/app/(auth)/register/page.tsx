import { Metadata } from "next";
import Image from "next/image";

import { FormRegister } from "./components/FormRegister";

export const metadata: Metadata = {
  title: "CCL TEST - Registro",
  description: "CCL TEST - Registro",
};

export default function Register() {

  return (
    <section className="hero min-h-screen">
      <div className="hero-content flex-col w-full">
        <div className="card w-full shadow-2xl bg-neutral text-white">
          <figure>
            <Image
              src="/assets/images/CCL_Principal.png"
              width={ 300 }
              height={ 300 }
              alt="CCL TEST Logotipo"
            />
          </figure>
          <h1 className="text-2xl font-bold text-center">Registro</h1>
          <FormRegister />
        </div>
      </div>
    </section>
  );
}
