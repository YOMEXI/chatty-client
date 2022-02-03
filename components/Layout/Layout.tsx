import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children }: any) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
