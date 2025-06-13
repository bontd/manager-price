import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data),
  });

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Có lỗi: {error.message}</p>;

  return (
    <>
      <p>{t('welcome')}</p>
      <button onClick={() => i18n.changeLanguage('vi')}>Tiếng Việt</button>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>
      <div className="card">
        <ul>
          {data.map((user: any) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
