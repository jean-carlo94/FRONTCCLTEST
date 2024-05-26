import { Metadata } from "next";
import Image from "next/image";

import { FromLogin } from "./components/FromLogin";

export const metadata: Metadata = {
  title: "CCL TEST - Login",
  description: "CCL TEST - Login",
};

export default function Login() {

  return (
    <section className="hero min-h-screen">
      <div className="hero-content flex-col w-full md:w-96">
        <div className="card w-full md:w-96 shadow-2xl bg-neutral text-white">
          <figure>
            <Image
              src="/assets/images/CCL_Principal.png"
              width={ 300 }
              height={ 300 }
              alt="CCL TEST Logotipo"
            />
          </figure>
          <h1 className="text-2xl font-bold text-center">Login</h1>
            <FromLogin />
        </div>
      </div>
    </section>
  );
}
