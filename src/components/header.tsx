import Link from "next/link";

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link href="/sign-in">Login</Link>
        </li>
        <li>
          <Link href="/sign-up">Register</Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
