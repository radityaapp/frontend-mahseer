import { Instagram, MessageCircle, Store } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-100 to-sky-200 border-t border-sky-200 mt-auto font-plusjakartasans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 flex flex-col md:flex-row md:items-start justify-between gap-10 md:gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full md:w-1/2 lg:w-5/12">
          <div className="shrink-0">
            <img
              src="/images/logo-mahseer.png"
              alt="Exotic Mahseer Logo"
              className="h-16 w-auto object-contain md:h-24"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          <div className="space-y-2 w-full max-w-sm md:max-w-md">
            <h3 className="text-lg md:text-xl font-bold text-sky-900 uppercase tracking-wide">
              Exotic Mahseer
            </h3>
            <p className="text-sm font-medium leading-relaxed text-sky-800/90">
              Jl. Swadaya Murni 3 No.4, RT.002/RW.003, Jatimurni, Kec. Pd.
              Melati, Kota Bekasi, Jawa Barat 17431
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-5 w-full md:w-auto">
          <h3 className="text-base md:text-lg font-bold text-sky-900 border-b-2 border-sky-400/30 pb-1 px-2 md:px-0">
            More Information
          </h3>

          <ul className="space-y-3 w-full max-w-xs md:w-auto">
            <li>
              <a
                href="https://www.instagram.com/exoticmahseer.id/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 group p-2 rounded-xl hover:bg-white/60 transition-all border border-transparent hover:border-sky-200"
              >
                <div className="h-9 w-9 rounded-full bg-sky-900 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-sky-700 transition-colors">
                  <Instagram size={18} />
                </div>
                <span className="text-sm font-bold text-sky-900 group-hover:text-sky-700">
                  @exoticmahseer.id
                </span>
              </a>
            </li>

            <li>
              <a
                href="https://wa.me/6281387967910"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 group p-2 rounded-xl hover:bg-white/60 transition-all border border-transparent hover:border-sky-200"
              >
                <div className="h-9 w-9 rounded-full bg-sky-900 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-sky-700 transition-colors">
                  <MessageCircle size={18} />
                </div>
                <span className="text-sm font-bold text-sky-900 group-hover:text-sky-700">
                  +62 8138–7967–910
                </span>
              </a>
            </li>

            <li>
              <a
                href="https://www.tokopedia.com/exoticmahseer"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center md:justify-start gap-3 group p-2 rounded-xl hover:bg-white/60 transition-all border border-transparent hover:border-sky-200"
              >
                <div className="h-9 w-9 rounded-full bg-sky-900 text-white flex items-center justify-center shrink-0 shadow-md group-hover:bg-sky-700 transition-colors">
                  <Store size={18} />
                </div>
                <span className="text-sm font-bold text-sky-900 group-hover:text-sky-700">
                  ExoticMahseer (Tokopedia)
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sky-300/40 bg-sky-200/50 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3">
          <a
            href="https://www.instagram.com/kodekita.id/"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 bg-white/70 hover:bg-white px-4 py-1.5 rounded-full shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <div className="bg-white rounded-full p-0.5 h-6 w-6 flex items-center justify-center shadow-sm overflow-hidden border border-sky-100">
              <img
                src="/images/logo-kodekita.png"
                alt="KK"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
            <p className="font-bold text-sky-900 text-xs tracking-wide group-hover:text-sky-700">
              Powered by Kodekita
            </p>
          </a>

          <p className="text-xs font-semibold text-sky-800/80 text-center">
            © {new Date().getFullYear()} Exotic Mahseer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
