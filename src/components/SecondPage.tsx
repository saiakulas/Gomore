import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DepartmentList from './DepartmentList';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'userId',
      headerName: 'User ID',
      width: 100,
      renderCell: (params) => (
        <div className="bg-[#DD4901] text-white text-xs font-medium px-2 py-1 rounded">
          {params.value}
        </div>
      )
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 70
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'body',
      headerName: 'Body',
      flex: 1.5,
      minWidth: 300,
    },
  ];

  const handleExport = () => {
    try {
      const escapeCsvValue = (value: string) => `"${value.replace(/"/g, '""')}"`;
      const csvContent = `User ID,ID,Title,Body\n${posts.map(post => 
        `${post.userId},${post.id},${escapeCsvValue(post.title)},${escapeCsvValue(post.body)}`
      ).join('\n')}`;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'posts.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-gray-100 to-[#e4f0f6] py-10">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <img
            src="https://www.growmeorganic.com/wp-content/uploads/2020/05/GrowMeOrganicLogo-e1589337030567-360x60.png"
            alt="GrowMeOrganic Logo"
            className="mb-4"
            style={{ height: '60px', width: 'auto' }}
          />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader border-t-4 border-[#DD4901] rounded-full w-16 h-16"></div>
            </div>
          ) : error ? (
            <div className="p-4">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <button
                  className="bg-[#DD4901] text-white px-4 py-2 rounded hover:bg-[#B84101] transition duration-300"
                  onClick={handleExport}
                >
                  Export
                </button>
              </div>
              <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                  rows={posts}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  
                  disableColumnMenu
                  disableColumnSelector
                  
                  
                  className="MuiDataGrid-root"
                />
              </div>
            </>
          )}
        </div>
        <div>
          <DepartmentList />
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
