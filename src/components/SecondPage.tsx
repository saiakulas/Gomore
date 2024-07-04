// src/components/SecondPage.tsx
import  { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import DepartmentList from './DepartmentList';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 130 },
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'body', headerName: 'Body', width: 400 },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={posts} columns={columns}  />
      </div>
      <DepartmentList/>
    </Container>
   
  );
};

export default SecondPage;
