import type { IconType } from "react-icons";
import Icon3D from "@/components/ui/Icon3D";

export default function CardIcon({ icon, className = "h-12 w-12" }: { icon?: IconType; className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-2xl bg-accent text-[#04140e] shadow-[0_0_24px_rgba(16,185,129,0.35)] ${className}`}
    >
      <Icon3D icon={icon} className="h-6 w-6" />
    </span>
  );
}
