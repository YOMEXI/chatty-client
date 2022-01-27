import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="navvy">
        {" "}
        <NavBar />
      </div>
      <main className="section">{children}</main>
      <div className="footy">
        {" "}
        <Footer />
      </div>
    </>
  );
}
