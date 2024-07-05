import React, { useState } from 'react';
import { Collapse } from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  FolderOpen as FolderOpenIcon,
  Folder as FolderClosedIcon,
  Description as FileIcon
} from '@mui/icons-material';

interface DepartmentData {
  department: string;
  subDepartments: string[];
}

const departmentsData: DepartmentData[] = [
  {
    department: 'Department 1',
    subDepartments: ['Sub 1.1', 'Sub 1.2', 'Sub 1.3']
  },
  {
    department: 'Department 2',
    subDepartments: ['Sub 2.1', 'Sub 2.2']
  },
  // Add more departments as needed
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setOpen((prev) => ({ ...prev, [department]: !prev[department] }));
  };

  const handleSelect = (department: string, subDepartment?: string) => {
    if (subDepartment) {
      setSelected((prev) => ({
        ...prev,
        [subDepartment]: !prev[subDepartment]
      }));
    } else {
      const isSelected = selected[department];
      const newSelected = { ...selected };
      departmentsData
        .find((d) => d.department === department)
        ?.subDepartments.forEach((sub) => {
          newSelected[sub] = !isSelected;
        });
      newSelected[department] = !isSelected;
      setSelected(newSelected);
    }
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="bg-[#DD4901] text-white p-4">
        <h2 className="text-lg font-semibold">Departments</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {departmentsData.map((dept) => (
          <React.Fragment key={dept.department}>
            <li className="flex items-center justify-between p-4 hover:bg-gray-100 transition duration-300">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    selected[dept.department] ||
                    dept.subDepartments.every((sub) => selected[sub])
                  }
                  className="mr-2"
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelect(dept.department);
                  }}
                />
                {open[dept.department] ? (
                  <FolderOpenIcon className="text-[#DD4901] mr-2" />
                ) : (
                  <FolderClosedIcon className="text-[#DD4901] mr-2" />
                )}
                <span className="font-medium text-gray-700 text-sm sm:text-base">{dept.department}</span>
              </div>
              <div onClick={() => handleToggle(dept.department)} className="cursor-pointer">
                {open[dept.department] ? <ExpandLess className="text-[#DD4901]" /> : <ExpandMore className="text-[#DD4901]" />}
              </div>
            </li>
            <Collapse in={open[dept.department]} timeout="auto" unmountOnExit>
              <ul className="pl-8 bg-gray-50">
                {dept.subDepartments.map((sub) => (
                  <li key={sub} className="flex items-center p-4 hover:bg-gray-200 transition duration-300">
                    <input
                      type="checkbox"
                      checked={selected[sub] || selected[dept.department]}
                      className="mr-2"
                      onChange={() => handleSelect(dept.department, sub)}
                    />
                    <FileIcon className="text-gray-500 mr-2" fontSize="small" />
                    <span className="text-gray-700 text-sm sm:text-base">{sub}</span>
                  </li>
                ))}
              </ul>
            </Collapse>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
