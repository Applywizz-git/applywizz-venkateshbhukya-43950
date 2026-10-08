import type { IconType } from "react-icons";

type Icon3DProps = {
  icon?: IconType;
  className?: string;
};

export default function Icon3D({ icon: Icon, className = "h-5 w-5" }: Icon3DProps) {
  if (!Icon) return null;
  return (
    <span className={`icon-3d inline-flex shrink-0 items-center justify-center ${className}`}>
      <Icon className="h-full w-full" />
    </span>
  );
}
