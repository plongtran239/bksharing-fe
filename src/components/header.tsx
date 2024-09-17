import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Header = () => {
  const cookieStore = cookies();

  const token = cookieStore.get("sessionToken")?.value;

  return (
    <header>
      <div className="flex items-center gap-2">
        <Image src="/images/logo-icon.png" alt="logo" width={50} height={50} />

        <span>BK Sharing</span>
      </div>

      <div>
        <ul>
          <li>Home</li>
          <li>Courses</li>
          <li>Career</li>
          <li>Blogs</li>
        </ul>

        <div>
          {token ? (
            <button>Logout</button>
          ) : (
            <div>
              <Link href="/login">
                <Button>Login</Button>
              </Link>

              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
