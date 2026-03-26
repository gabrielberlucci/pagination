import {
  SquareTerminal,
  Info,
  CircleX,
  Logs,
  ShieldQuestionMark,
  Activity,
  User,
  RotateCcw,
} from 'lucide-react';
import { useState } from 'react';

export const HomePage = () => {
  interface FilterData {
    level: string;
    dateTime: string;
    userID: string;
  }

  interface TableData {
    timestamp: string;
    level: string;
    userID: string; // probably a UUID
    ipAddress: string;
    method: string;
    endpoint: string;
    message: string;
  }

  const initMockedData = () => {
    const data = [];
    for (let i = 1; i < 11; i++) {
      data.push({
        timestamp: `${i}/01/2026:14:0${i}:1${i}`,
        level: 'LOG',
        userID: i.toString(),
        ipAddress: `192.168.0.${i}`,
        method: 'GET',
        endpoint: `/api/users/${i}`,
        message: `GET /api/users/${i} - STATUS 200 OK`,
      });
    }

    return data;
  };

  const [filterData, setFilterData] = useState<FilterData>({
    level: 'ALL LEVELS',
    dateTime: '',
    userID: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tableData, setTableData] = useState<TableData[]>(initMockedData());

  const resetFilters = () => {
    setFilterData({ ...filterData, level: '', dateTime: '', userID: '' });
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <div className="flex gap-8">
          <div>
            <h2 className="text-2xl">Active Log Streams</h2>
            <p>Real-time monitoring of system events across clusters.</p>
          </div>

          <div className="flex gap-6">
            <div className="card card-dash bg-base-100 w-60">
              <div className="card-body">
                <h2 className="card-title">TOTAL EVENTS</h2>
                <p className="text-primary">2,841,092</p>
              </div>
            </div>

            <div className="card card-dash bg-base-100 w-40">
              <div className="card-body">
                <h2 className="card-title">ERROR RATE</h2>
                <p className="text-red-500">0.04%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">LEVEL</legend>
            <select
              className="select"
              value={filterData.level}
              onChange={(e) => {
                setFilterData({
                  ...filterData,
                  level: e.target.value,
                });
              }}
            >
              <option>ALL LEVELS</option>
              <option>INFO</option>
              <option>ERROR</option>
              <option>WARN</option>
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">DATETIME</legend>
            <input
              type="datetime-local"
              className="input"
              value={filterData.dateTime}
              onChange={(e) => {
                setFilterData({
                  ...filterData,
                  dateTime: e.target.value,
                });
              }}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">USER ID</legend>
            <label className="input">
              <User />
              <input
                type="text"
                className="grow"
                placeholder="User ID"
                value={filterData.userID}
                onChange={(e) => {
                  setFilterData({
                    ...filterData,
                    userID: e.target.value,
                  });
                }}
              />
            </label>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">RESET ALL</legend>
            <RotateCcw
              className="hover:cursor-pointer"
              onClick={resetFilters}
            />
          </fieldset>
        </div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mb-10 mt-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>TIMESTAMP</th>
                <th>LEVEL</th>
                <th>USER ID</th>
                <th>IP ADDRESS</th>
                <th>METHOD</th>
                <th>ENDPOINT</th>
                <th>MESSAGE</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data) => {
                return (
                  <tr>
                    <th>{data.timestamp}</th>
                    <th>{data.level}</th>
                    <th>{data.userID}</th>
                    <th>{data.ipAddress}</th>
                    <th>{data.method}</th>
                    <th>{data.endpoint}</th>
                    <th>{data.message}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="join">
          <button className="join-item btn btn-active">1</button>
          <button className="join-item btn ">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
        </div>
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
