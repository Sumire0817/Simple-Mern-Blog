const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-primary p-3 sticky-top">
      <div className="container d-flex justify-content-end">
        <button
          className="btn btn-light"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Home
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
