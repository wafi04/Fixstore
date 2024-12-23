import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10 py-12 bg-white mt-auto border-t">
      <div className="container mx-auto px-4 md:text-start text-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">PRODUK</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Sepatu
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Pakaian
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Aksesoris
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Koleksi Terbaru
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">OLAHRAGA</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Sepak Bola
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Lari
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Gym & Latihan
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Tenis
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">PERUSAHAAN INFO</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Karir
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Pers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">BANTUAN</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Kontak Kami
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Pengiriman
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Pengembalian
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:underline text-gray-600 hover:text-black transition-colors">
                  Pembayaran
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-12 flex justify-center space-x-6">
          <Link
            to="#"
            className="text-gray-600 hover:text-black transition-colors">
            <Facebook size={24} />
          </Link>
          <Link
            to="#"
            className="text-gray-600 hover:text-black transition-colors">
            <Twitter size={24} />
          </Link>
          <Link
            to="#"
            className="text-gray-600 hover:text-black transition-colors">
            <Instagram size={24} />
          </Link>
          <Link
            to="#"
            className="text-gray-600 hover:text-black transition-colors">
            <Youtube size={24} />
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Nextstore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
