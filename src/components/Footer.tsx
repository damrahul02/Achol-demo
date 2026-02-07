import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { footerLinks } from "@/data/products";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer id="contact" className="bg-off-white border-t border-soft-pink">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm uppercase tracking-[0.1em] text-dark-text mb-4">
              ALISHA
            </h3>
            <p className="text-sm text-medium-text mb-4">
              Sign up to receive regular updates, exclusive offers, and sales
              promotion information.
            </p>

            {isSubscribed ? (
              <p className="text-deep-rose text-sm">
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 border border-muted-taupe text-sm focus:outline-none focus:border-deep-rose transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-dark-text text-white h-11 text-xs uppercase tracking-[0.15em] hover:bg-deep-rose transition-colors"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </motion.div>

          {/* Customer Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-sm uppercase tracking-[0.1em] text-dark-text mb-4">
              CUSTOMER CARE
            </h3>
            <ul className="space-y-3">
              {footerLinks.customerCare.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-medium-text hover:text-deep-rose transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm uppercase tracking-[0.1em] text-dark-text mb-4">
              INFO
            </h3>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-medium-text hover:text-deep-rose transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center sm:text-left"
          >
            {/* Logo */}
            <div className="flex flex-col items-center sm:items-start mb-6">
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="text-deep-rose"
                >
                  <path
                    d="M14 2C14 2 16 6 16 10C16 14 14 18 14 18C14 18 12 14 12 10C12 6 14 2 14 2Z"
                    fill="currentColor"
                    fillOpacity="0.3"
                  />
                  <path
                    d="M14 18C14 18 10 16 6 12C2 8 2 4 2 4C2 4 6 4 10 8C14 12 14 18 14 18Z"
                    fill="currentColor"
                    fillOpacity="0.5"
                  />
                  <path
                    d="M14 18C14 18 18 16 22 12C26 8 26 4 26 4C26 4 22 4 18 8C14 12 14 18 14 18Z"
                    fill="currentColor"
                    fillOpacity="0.5"
                  />
                  <path
                    d="M14 18C14 18 8 20 4 18C0 16 0 12 0 12C0 12 4 12 8 14C12 16 14 18 14 18Z"
                    fill="currentColor"
                    fillOpacity="0.4"
                  />
                  <path
                    d="M14 18C14 18 20 20 24 18C28 16 28 12 28 12C28 12 24 12 20 14C16 16 14 18 14 18Z"
                    fill="currentColor"
                    fillOpacity="0.4"
                  />
                  <circle cx="14" cy="14" r="3" fill="currentColor" />
                </svg>
                <span className="font-playfair text-xl tracking-[0.1em] text-dark-text">
                  ALISHA
                </span>
              </div>
              <span className="font-bengali text-sm text-deep-rose">
                আঁচল
              </span>
            </div>

            {/* Contact */}
            <div className="space-y-2 mb-6">
              <a
                href="mailto:hello@alishaanchal.com"
                className="text-sm text-medium-text hover:text-deep-rose transition-colors block"
              >
                hello@alishaanchal.com
              </a>
              <p className="text-sm text-medium-text">
                Dhaka, Bangladesh
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <a
                href="#"
                className="text-dark-text hover:text-deep-rose transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-dark-text hover:text-deep-rose transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-dark-text hover:text-deep-rose transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-soft-pink py-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20">
          <p className="text-xs text-light-text text-center tracking-wide">
            © ALISHA 2026. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
