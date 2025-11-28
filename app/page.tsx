// app/page.tsx
import { cookies } from 'next/headers';
import TodoList from './components/TodoList'; // Import component con
import AddTodoForm from './components/AddTodoForm';

// Hàm lấy dữ liệu chạy hoàn toàn trên Server
async function getTodos() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) return [];

  try {
    const res = await fetch('http://localhost:3001/todo', {
      headers: {
        Authorization: `Bearer ${token.value}`, // Server Cookie dùng .value
      },
      cache: 'no-store',
    });

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  // 1. Fetch dữ liệu
  const todos = await getTodos();
  
  // 2. Check login để hiển thị
  const cookieStore = await cookies();

  return (
    <main className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Todo List</h1>
      
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-8">
        <AddTodoForm />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Danh sách công việc</h2>

      <TodoList todos={todos} />

    </main>
  );
}