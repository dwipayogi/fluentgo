import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-lg font-bold">MyApp</div>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
        </div>
      </div>
    </nav>
  )
}