// app/page.tsx
import AddTodoForm from './components/AddTodoForm';

interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

async function getTodos(): Promise<Todo[]> {
  try {
    const res = await fetch('http://localhost:3001/todo', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Todo List</h1>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-8">
        <AddTodoForm />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Danh sách công việc</h2>
      <ul className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
              <span className={`text-lg ${todo.isDone ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                {todo.title}
              </span>
              {/* Bạn có thể thêm nút delete/toggle ở đây */}
              <input 
                type="checkbox" 
                checked={todo.isDone} 
                readOnly // Hoặc tạo hàm onChange để update status
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">Không có việc nào.</p>
        )}
      </ul>
    </main>
  );
}