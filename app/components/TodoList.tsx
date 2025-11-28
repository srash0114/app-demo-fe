'use client';

import { useAuth } from '../context/AuthContext';

interface Todo {
  id: number;
  title: string;
  isDone: boolean;
  UserId: number;
}

// Nhận dữ liệu qua Props
export default function TodoList({ todos }: { todos: Todo[] }) {
    
  const { isLoggedIn } = useAuth();

  if (todos.length === 0) {
    return <p className="text-center text-gray-500">Chưa có công việc nào.</p>;
  }

  return (
    <ul className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      { isLoggedIn ? (todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0"
        >
          <span
            className={`text-lg ${
              todo.isDone ? 'line-through text-gray-500' : 'text-gray-700'
            }`}
          >
            {todo.title}
          </span>

          <input
            type="checkbox"
            checked={todo.isDone}
            readOnly // Tạm thời để readOnly, bài sau mình sẽ chỉ bạn làm hàm handleToggle
            className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer"
          />
        </li>
      ))) : (
        <p className="text-red-500 text-center">Vui lòng đăng nhập để xem danh sách công việc.</p>
      )}
    </ul>
  );
}