'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface Todo {
  id: number;
  title: string;
  description: string | null;
  isDone: boolean;
  UserId: number;
}

export default function TodoList({ todos }: { todos: Todo[] }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleToggle = async (id: number, currentIsDone: boolean) => {
    const token = Cookies.get('access_token');
    if (!token) {
        alert("Bạn phiên đăng nhập hết hạn");
        return;
    }

    try {
      const res = await fetch(`http://localhost:3001/todo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ isDone: !currentIsDone }),
      });

      if (!res.ok) throw new Error('Lỗi khi cập nhật');
      router.refresh();
      
    } catch (error) {
      console.error("Lỗi toggle:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái");
    }
  };

  if (todos.length === 0) {
    return <p className="text-center text-gray-500">Chưa có công việc nào.</p>;
  }

  return (
    <ul className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      {isLoggedIn ? (
        todos.map((todo) => (
          <li
            key={todo.id}
            // Layout chính: Flex Row (Trái chứa text, Phải chứa checkbox)
            className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            {/* Cột bên trái: Chứa Title và Description */}
            <div className="flex flex-col flex-grow mr-4">
                {/* 1. Tiêu đề */}
                <span
                    className={`text-lg font-medium ${
                    todo.isDone ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}
                >
                    {todo.title}
                </span>

                {/* 2. Mô tả (Chỉ hiện nếu có dữ liệu) */}
                {todo.description && (
                    <p className={`text-sm mt-1 ${
                        todo.isDone ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                        {todo.description}
                    </p>
                )}
            </div>

            {/* Cột bên phải: Checkbox */}
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => handleToggle(todo.id, todo.isDone)}
              // flex-shrink-0 để checkbox không bị bóp méo khi text quá dài
              className="flex-shrink-0 form-checkbox h-6 w-6 text-blue-600 cursor-pointer rounded border-gray-300 focus:ring-blue-500"
            />
          </li>
        ))
      ) : (
        <p className="text-red-500 text-center">
          Vui lòng đăng nhập để xem danh sách công việc.
        </p>
      )}
    </ul>
  );
}