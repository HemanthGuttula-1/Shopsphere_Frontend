import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export default MainLayout;