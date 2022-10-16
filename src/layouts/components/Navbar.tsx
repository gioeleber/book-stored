import NextLink from "../../components/NextLink";
import navItems from "../../config/navItems.json";

export default function Navbar() {
  return (
    <nav className="mb-6 flex gap-x-4 p-4 shadow-xl">
      {navItems.map((item) => (
        <NextLink href={item.href} key={item.href}>
          {item.name}
        </NextLink>
      ))}
    </nav>
  );
}
