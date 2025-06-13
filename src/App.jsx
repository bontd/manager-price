import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data),
  });

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Có lỗi: {error.message}</p>;

  return (
    <>
      
      <div className="card">
        <ul>
          {data.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
