import Link from "next/link";
import { MessageCircle, Instagram, Youtube, Music, Heart } from "lucide-react";
import type { Setting } from "../../../payload-types";
import { navItems } from "~/lib/nav";
import getSettings from "~/data-access/settings";
import { DynamicIcon, type IconName } from "~/app/(app)/contact/socials";

export async function Footer(props: Setting) {
  const settings = await getSettings();

  return (
    <footer className="text-white">
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
              {!!settings &&
                !!settings.socials &&
                settings.socials.map((social, index) => (
                  <Link
                    key={index}
                    href={social.link}
                    className={`transform rounded-xl p-3 text-gray-400 transition-all duration-300 hover:scale-110 hover:bg-white/5`}
                  >
                    <DynamicIcon name={social.icon as IconName} />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navItems.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block transform text-gray-400 transition-colors duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
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
              © 2025 UniVerse. All rights reserved.
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
