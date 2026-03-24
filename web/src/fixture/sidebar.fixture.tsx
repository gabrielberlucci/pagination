import {
  Activity,
  CircleX,
  Info,
  Logs,
  ShieldQuestionMark,
  SquareTerminal,
} from 'lucide-react';

const SideBarFixture = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}

        <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div className="flex items-center gap-6 p-4">
            <SquareTerminal />
            <div>
              <h1 className="text-2xl">Obsidian Engine</h1>
              <p>V1.0.0</p>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div className="divider"></div>
          </div>
          <li>
            <a>
              <Info />
              Live Feed
            </a>
          </li>
          <li>
            <a>
              <CircleX />
              Error Reports
            </a>
          </li>
          <li>
            <a>
              <Logs />
              Access Logs
            </a>
          </li>
          <li>
            <a>
              <ShieldQuestionMark />
              Security Events
            </a>
          </li>
          <li>
            <a>
              <Activity />
              System Health
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBarFixture;
