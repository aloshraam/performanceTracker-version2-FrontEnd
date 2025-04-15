import React, { useState } from "react";
import TeamLeadRegister from "./TeamLeadRegister";
import ManagerRegister from "./ManagerRegister";

const MainRegister = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50 w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Which type of user do you wish to register as?
      </h2>
  
      <div className="flex gap-6 mb-8">
        <button
          onClick={() => setSelected("teamlead")}
          className={`px-6 py-3 rounded-lg shadow-md text-white font-semibold transition ${
            selected === "teamlead" ? "bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          Register as Team Lead
        </button>
  
        <button
          onClick={() => setSelected("manager")}
          className={`px-6 py-3 rounded-lg shadow-md text-white font-semibold transition ${
            selected === "manager" ? "bg-green-700" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Register as Manager
        </button>
      </div>
  
      <div className="w-full">
        {selected === "teamlead" && (
          <div className="w-full">
            <TeamLeadRegister />
          </div>
        )}
        {selected === "manager" && (
          <div className="w-full">
            <ManagerRegister />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainRegister;