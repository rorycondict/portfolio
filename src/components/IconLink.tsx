import { type IconType } from "react-icons";

interface IconLinkProps {
  href: string;
  icon: IconType;
  label: string;
}

export default function IconLink({ href, icon: Icon, label }: IconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xl flex items-center gap-2 hover:text-brand transition-colors"
    >
      <Icon />
      <span>{label}</span>
    </a>
  );
}
