import Image from 'next/image'

export const Footer = () => {
  return (
    <>
        <footer className="footer bg-base-200 p-10 text-white">
            <nav>
                <h6 className="footer-title">Servicios</h6> 
                <a className="link link-hover">Asesoría</a>
                <a className="link link-hover">Implementación</a>
                <a className="link link-hover">Soporte</a>
                <a className="link link-hover">Cotizaciones</a>
            </nav> 
            <nav>
                <h6 className="footer-title">Compañía</h6> 
                <a className="link link-hover">Nosotros</a>
                <a className="link link-hover">Contacto</a>
                <a className="link link-hover">Trabajos</a>
                <a className="link link-hover">Presentación</a>
            </nav> 
            <nav>
                <h6 className="footer-title">Legal</h6> 
                <a className="link link-hover">Términos y condiciones</a>
                <a className="link link-hover">Políticas de privacidad</a>
                <a className="link link-hover">Políticas de Cookies</a>
            </nav>
        </footer> 
        <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
            <aside className="items-center grid-flow-col text-xl font-bold text-white">
                <Image 
                    src="/assets/images/CCL_Principal.png"
                    width={ 80 }
                    height={ 50 }
                    alt="CCL Logo"
                />
                CCL TEST
            </aside>
        </footer>
    </>
  )
}
