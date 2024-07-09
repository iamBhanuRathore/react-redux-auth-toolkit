import { Link, Outlet } from "react-router-dom";

const Dashboardlayout = () => {
  return (
    <div>
      <main>
        <div className="flex bg-zinc-700 text-white text-xl justify-between py-2 px-5">
          <p>Navbar</p>
          <ul className="flex gap-x-6">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/display">Display</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </main>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Dashboardlayout;
