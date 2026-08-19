import Container from "@/components/container";
import UserMenu from "@/components/sections/shared/user-menu";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, loading } = useAuth();

  return (
    <header className="w-full md:top-10 top-6 mx-auto absolute z-40">
      <Container className="flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 w-fit">
          <img src="/images/common/logo.svg" alt="Logo" className="h-6" />
        </Link>

        <div className="flex gap-2 items-center">
          {!loading && user && <UserMenu />}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
