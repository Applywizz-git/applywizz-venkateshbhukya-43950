import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa";
import { profile } from "@/data/portfolio";
import Icon3D from "@/components/ui/Icon3D";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-accent/10 bg-[#050816] py-12 pb-[max(3rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-4 text-center sm:px-6">
        <p className="font-syne text-xs font-black tracking-[0.16em] text-white uppercase sm:text-sm sm:tracking-[0.28em]">
          Clarity from complex data
        </p>
        <p className="font-space text-sm text-muted">© {new Date().getFullYear()} ~ {profile.fullName}</p>
        <div className="mt-2 flex w-full flex-col items-center gap-3 font-space text-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <a href={profile.emailHref} className="group inline-flex max-w-full items-center gap-2 break-all text-accent transition-colors duration-300 hover:text-emerald-300">
            <Icon3D icon={HiOutlineMail} className="h-4 w-4" />
            {profile.email}
          </a>
          <a href={profile.phoneHref} className="group inline-flex items-center gap-2 text-white/70 transition-colors duration-300 hover:text-accent">
            <Icon3D icon={HiOutlinePhone} className="h-4 w-4" />
            {profile.phone}
          </a>
          <span className="group inline-flex items-center gap-2 text-white/50">
            <Icon3D icon={HiOutlineLocationMarker} className="h-4 w-4" />
            {profile.location}
          </span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-cyanx transition-colors duration-300 hover:text-white"
          >
            <Icon3D icon={FaLinkedinIn} className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
