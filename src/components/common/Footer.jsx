import { Instagram, MessageCircle, Store } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-100 to-sky-200 border-t border-sky-200 mt-auto font-plusjakartasans">
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-10 flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-16">
        <div className="flex flex-col gap-3 md:gap-4 w-full md:max-w-sm text-justify md:text-lefti items-center md:items-start">
          <div className="shrink-0">
            <img
              src="/images/logo-mahseer.png"
              alt="Exotic Mahseer Logo"
              className="h-20 w-auto object-contain md:h-24"
            />
          </div>

          <div className="space-y-1 w-full">
            <h3 className="text-base md:text-lg font-bold text-sky-900 uppercase tracking-wide text-center md:text-left">
              Exotic Mahseer
            </h3>
            <p className="text-sm md:text-sm font-semibold leading-relaxed text-sky-800 text-center md:text-left">
              Jl. Swadaya Murni 3 No.4, RT.002/RW.003, Jatimurni, Kec. Pd.
              Melati, Kota Bekasi, Jawa Barat 17431
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 md:gap-5 mt-4 md:mt-0 w-full md:w-auto">
          <h3 className="text-base md:text-lg font-bold text-sky-900 border-b-2 border-sky-300/30 pb-1 w-full md:w-auto text-left">
            More Information
          </h3>

          <ul className="space-y-3 w-full">
            <li>
              <a
                href="https://www.instagram.com/exoticmahseer.id/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-start gap-3 group p-1.5 rounded-lg hover:bg-white/40 transition-all"
              >
                <div className="h-8 w-8 rounded-full bg-sky-900 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-sky-700 transition-colors">
                  <Instagram size={16} />
                </div>
                <span className="text-sm font-semibold text-sky-900 group-hover:text-sky-700">
                  @exoticmahseer.id (Instagram)
                </span>
              </a>
            </li>

            <li>
              <a
                href="https://wa.me/6281387967910"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-start gap-3 group p-1.5 rounded-lg hover:bg-white/40 transition-all"
              >
                <div className="h-8 w-8 rounded-full bg-sky-900 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-sky-700 transition-colors">
                  <MessageCircle size={16} />
                </div>
                <span className="text-sm font-semibold text-sky-900 group-hover:text-sky-700">
                  +62 8138–7967–910 (WhatsApp)
                </span>
              </a>
            </li>

            <li>
              <a
                href="https://www.tokopedia.com/exoticmahseer"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-start gap-3 group p-1.5 rounded-lg hover:bg-white/40 transition-all"
              >
                <div className="h-8 w-8 rounded-full bg-sky-900 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-sky-700 transition-colors">
                  <Store size={16} />
                </div>
                <span className="text-sm font-semibold text-sky-900 group-hover:text-sky-700">
                  ExoticMahseer (Tokopedia)
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sky-300/40 bg-sky-200/30 py-4">
        <div className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center justify-center gap-1.5">
          <a
            href="https://www.instagram.com/kodekita.id/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity bg-white/60 px-3 py-1 rounded-full shadow-sm"
          >
            <div className="bg-white rounded-full p-0.5 h-5 w-5 flex items-center justify-center shadow-sm overflow-hidden">
              <img
                src="/images/logo-kodekita.png"
                alt="KK"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-bold text-sky-900 text-[10px] md:text-xs">
              Powered by Kodekita
            </p>
          </a>
          <p className="text-[10px] md:text-xs font-semibold text-sky-800/80">
            © {new Date().getFullYear()} Exotic Mahseer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
