import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="flex-center flex-col bg-[#252641] py-10">
      <div className="flex-center w-full flex-col">
        <p className="text-[#B2B3CF]">Subscribe to get our Newsletter</p>
        <div className="flex-center mt-4 w-1/4 gap-4 max-xl:w-1/2 max-sm:flex-col">
          <Input className="w-full rounded-full px-4 text-white" />
          <Button className="w-24 rounded-full">Subscribe</Button>
        </div>
      </div>

      <div className="flex-center mt-10 w-full flex-col px-10 max-sm:items-start">
        <ul className="flex gap-4 text-[#B2B3CF] max-sm:flex-col">
          <Link href="#top" className="hover:underline">
            About Us
          </Link>
          <span className="max-sm:hidden">|</span>
          <Link href="#top" className="hover:underline">
            Contact Us
          </Link>
          <span className="max-sm:hidden">|</span>
          <Link href="#top" className="hover:underline">
            Careers
          </Link>
          <span className="max-sm:hidden">|</span>
          <Link href="#top" className="hover:underline">
            Privacy Policy
          </Link>
          <span className="max-sm:hidden">|</span>
          <Link href="#top" className="hover:underline">
            Terms & Conditions
          </Link>
        </ul>
        <p className="mt-4 self-center text-[#B2B3CF]">© 2024 BK Sharing</p>
      </div>
    </footer>
  );
};
export default Footer;
