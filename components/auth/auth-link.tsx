import Link from "next/link";

interface AuthLinkProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthLink({ text, linkText, href }: AuthLinkProps) {
  return (
    <p className="text-sm text-center text-gray-500">
      {text}{" "}
      <Link href={href} className="font-semibold hover:text-black">
        {linkText}
      </Link>
    </p>
  );
}
