// src/components/DepartmentList.tsx
import  { useState } from 'react';
import { Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const departmentsData = [
  {
    department: 'Department 1',
    subDepartments: ['Sub 1.1', 'Sub 1.2', 'Sub 1.3']
  },
  {
    department: 'Department 2',
    subDepartments: ['Sub 2.1', 'Sub 2.2']
  },
  // Add more data as needed
];

const DepartmentList = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setOpen(prev => ({ ...prev, [department]: !prev[department] }));
  };

  const handleSelect = (department: string, subDepartment?: string) => {
    if (subDepartment) {
      setSelected(prev => ({
        ...prev,
        [subDepartment]: !prev[subDepartment]
      }));
    } else {
      const isSelected = selected[department];
      const newSelected = { ...selected };
      departmentsData.find(d => d.department === department)?.subDepartments.forEach(sub => {
        newSelected[sub] = !isSelected;
      });
      newSelected[department] = !isSelected;
      setSelected(newSelected);
    }
  };

  return (
    <List>
      {departmentsData.map(dept => (
        <div key={dept.department}>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected[dept.department] || dept.subDepartments.every(sub => selected[sub])}
                tabIndex={-1}
                disableRipple
                onClick={() => handleSelect(dept.department)}
              />
            </ListItemIcon>
            <ListItemText primary={dept.department} />
            <IconButton edge="end" onClick={() => handleToggle(dept.department)}>
              {open[dept.department] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open[dept.department]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.subDepartments.map(sub => (
                <ListItem key={sub} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selected[sub] || selected[dept.department]}
                      tabIndex={-1}
                      disableRipple
                      onClick={() => handleSelect(dept.department, sub)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList
