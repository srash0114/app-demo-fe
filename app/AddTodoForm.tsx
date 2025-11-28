// app/AddTodoForm.tsx
'use client'; // Đánh dấu đây là Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTodoForm() {
  const [title, setTitle] = useState('');
  const router = useRouter(); // Dùng để refresh trang sau khi thêm

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; // Không làm gì nếu input rỗng

    try {
      await fetch('http://localhost:3001/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title }),
      });

      // Gửi xong thì reset form
      setTitle('');
      // Làm mới dữ liệu trên trang (Server Component)
      router.refresh();
    } catch (error) {
      console.error('Lỗi khi thêm Todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Việc cần làm..."
        required
      />
      <button type="submit">Thêm</button>
    </form>
  );
}