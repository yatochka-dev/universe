import Link from "next/link";
import { MessageCircle, Instagram, Youtube, Music, Heart } from "lucide-react";
import type { Setting } from "../../../payload-types";

export function Footer(props: Setting) {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Resources", href: "/resources" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: MessageCircle,
      href: "#",
      label: "Discord",
      color: "hover:text-indigo-400",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-400",
    },
    { icon: Music, href: "#", label: "TikTok", color: "hover:text-gray-300" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-400" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-6 text-3xl font-bold">
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                UniVerse
              </span>
            </h3>
            <p className="mb-8 max-w-md text-lg leading-relaxed text-gray-400">
              Empowering the next generation of builders, thinkers, and leaders
              through hands-on learning and global collaboration.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transform rounded-xl p-3 transition-all duration-300 hover:scale-110 hover:bg-white/5`}
                >
                  <social.icon className="h-6 w-6" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block transform text-gray-400 transition-colors duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-4">
              <p className="text-gray-400">
                <span className="font-medium text-white">Email:</span>
                <br />
                {props.direct_contact.email}
              </p>
              <p className="text-gray-400">
                <span className="font-medium text-white">Community:</span>
                <br />
                Join our Discord for instant support
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-gray-400 md:mb-0">
              © 2024 UniVerse. All rights reserved. | Privacy Policy | Terms of
              Service
            </p>
            <p className="flex items-center text-gray-400">
              Made with <Heart className="mx-1 h-4 w-4 text-red-500" /> by
              students, for students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
