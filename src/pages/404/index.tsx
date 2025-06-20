// src/pages/NotFound.tsx
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button type="primary">Go Home</Button>
      </Link>
    </div>
  );
}
