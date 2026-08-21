import { useState } from "react";
import { DataCompany } from "../../data/Topcompany";

const TopCompany = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(
    "Computer Science and Engineering"
  );

  const company = DataCompany;

  const departments = Object.keys(company);

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
          Top Companies by Engineering Department
        </h1>

        {/* Department Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300
                ${
                  selectedDepartment === dept
                    ? "bg-blue-600 text-foreground"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }
              `}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {company[selectedDepartment].map((comp, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold text-blue-700 mb-2">
                {comp.company_name}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">CEO:</span> {comp.company_ceo}
              </p>

              <div className="mb-4">
                <h3 className="font-semibold text-blue-600 mb-1">Job Roles:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {comp.job_roles.map((role, roleIndex) => (
                    <li key={roleIndex} className="text-sm">
                      {role}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-green-600 font-semibold mb-2">
                Avg. Package:{" "}
                {comp.average_package || comp.average_package_in_inr}
              </p>

              <a
                href={comp.career_link || comp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-500 text-foreground py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                View Careers
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCompany;
