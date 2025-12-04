import { Instagram, MessageCircle, Store } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-100 to-sky-200 border-t border-sky-200 mt-auto font-plusjakartasans">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row md:items-start justify-between gap-10">
        <div className="flex flex-col items-start gap-5 max-w-sm">
          <div className="shrink-0">
            <img
              src="/images/logo-mahseer.png"
              alt="Exotic Mahseer Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-sky-900 uppercase tracking-wide">
              Exotic Mahseer
            </h3>
            <p className="text-sm font-semibold leading-relaxed text-sky-800">
              Jl. Swadaya Murni 3 No.4, RT.002/RW.003, Jatimurni, Kec. Pd.
              Melati, Kota Bekasi, Jawa Barat 17431
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 mt-2 md:mt-0">
          <h3 className="text-lg font-bold text-sky-900">More Information</h3>

          <ul className="space-y-5">
            {" "}
            <li>
              <a
                href="https://www.instagram.com/exoticmahseer.id/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group transition-transform duration-200 hover:translate-x-1"
              >
                <div className="h-10 w-10 rounded-full bg-sky-900 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-sky-700 transition-colors">
                  <Instagram size={20} />
                </div>
                <span className="text-base font-semibold text-sky-900 group-hover:text-sky-700">
                  @exoticmahseer.id (Instagram)
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/6281387967910"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group transition-transform duration-200 hover:translate-x-1"
              >
                <div className="h-10 w-10 rounded-full bg-sky-900 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-sky-700 transition-colors">
                  <MessageCircle size={20} />
                </div>
                <span className="text-base font-semibold text-sky-900 group-hover:text-sky-700">
                  +6281387967910 (WhatsApp)
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.tokopedia.com/exoticmahseer"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group transition-transform duration-200 hover:translate-x-1"
              >
                <div className="h-10 w-10 rounded-full bg-sky-900 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-sky-700 transition-colors">
                  <Store size={20} />
                </div>
                <span className="text-base font-semibold text-sky-900 group-hover:text-sky-700">
                  ExoticMahseer (Tokopedia)
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-sky-300/40 bg-sky-200/30 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <a
            href="https://www.instagram.com/kodekita.id/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 mb-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-white rounded-full p-1 h-6 w-6 flex items-center justify-center shadow-sm">
              <span className="text-[9px] font-extrabold text-sky-900">KK</span>
            </div>
            <p className="font-bold text-sky-900 text-sm">
              Powered by Kodekita
            </p>
          </a>
          <p className="text-xs font-semibold text-sky-800/80">
            © {new Date().getFullYear()} Exotic Mahseer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
