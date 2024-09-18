import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="flex-center flex-col bg-[#252641] py-10">
      <Image
        src="/images/logo.png"
        alt="logo"
        width={100}
        height={100}
        className="rounded-full"
      />

      <div className="flex-center mt-10 w-full flex-col">
        <p className="text-[#B2B3CF]">Subscribe to get our Newsletter</p>
        <div className="mt-4 flex w-1/4 gap-4">
          <Input className="w-full rounded-full px-4 text-white" />
          <Button className="w-24 rounded-full">Subscribe</Button>
        </div>
      </div>

      <div className="flex-center mt-10 w-full flex-col">
        <ul className="flex gap-4 text-[#B2B3CF]">
          <Link href="#top" className="hover:underline">
            About Us
          </Link>
          |
          <Link href="#top" className="hover:underline">
            Contact Us
          </Link>
          |
          <Link href="#top" className="hover:underline">
            Careers
          </Link>
          |
          <Link href="#top" className="hover:underline">
            Privacy Policy
          </Link>
          |
          <Link href="#top" className="hover:underline">
            Terms & Conditions
          </Link>
        </ul>
        <span className="mt-4 text-[#B2B3CF]">© 2024 BK Sharing</span>
      </div>
    </footer>
  );
};
export default Footer;
