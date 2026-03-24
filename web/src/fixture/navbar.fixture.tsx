import { Bell, Search } from 'lucide-react';

const NavBarFixture = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Pagination</a>
      </div>
      <div className="navbar-center">
        <ul tabIndex={1} className="flex items-center rounded-box gap-6 shadow">
          <li>
            <a className="hover:text-primary hover:cursor-pointer">Streams</a>
          </li>
          <li>
            <a className="hover:text-primary hover:cursor-pointer">Analytics</a>
          </li>
          <li>
            <a className="hover:text-primary hover:cursor-pointer">Settings</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-6">
        <label className="input">
          <Search />
          <input
            type="search"
            className="grow"
            placeholder="Search logs [e.g, Error, Request, userID...]"
          />
        </label>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div className="avatar">
          <div className="w-10 rounded">
            <img src="https://i.pinimg.com/736x/b8/88/1f/b8881faa63451204e1ed4432c0746664.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarFixture;
