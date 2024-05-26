import Image from "next/image";
import NextLink from "next/link";

import { RUTES_PAGES } from "@/constants";
import { LayoutHome } from "@/components";

export default function Home() {

  return (
    <LayoutHome>
      <section className="hero min-h-screen mt-6 md:mt-0">
        <div className="hero-content text-center">
          <div className="max-w-xl text-xl">
            <figure>
              <Image
                src="/assets/images/CCL_Principal.png"
                width={ 500 }
                height={ 500 }
                alt="CCL Logotipo"
              />
            </figure>
              <NextLink href={ RUTES_PAGES.REGISTER } passHref legacyBehavior>
                <button className="btn btn-neutral text-xl text-white hover:scale-110">Registrarse Ahora</button>
              </NextLink>
          </div>
        </div>
      </section>
    </LayoutHome>
  );
}
