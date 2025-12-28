'use client';

import { useState, useEffect } from 'react';

interface Task {
  id: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

// Placeholder data for now
const placeholderTasks: Task[] = [
  { id: '1', description: 'Clean Room 101', status: 'pending' },
  { id: '2', description: 'Restock linens on the 2nd floor', status: 'in-progress' },
  { id: '3', description: 'Prepare welcome amenities for VIP guest in Room 305', status: 'pending' },
  { id: '4', description: 'Inspect all fire extinguishers on the ground floor', status: 'completed' },
];

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // In the future, this will fetch tasks from Firestore
    setTasks(placeholderTasks);
  }, []);

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  return (
    <div style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '2rem', borderRadius: '12px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>My Tasks</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', marginBottom: '0.5rem' }}>
            <span>{task.description}</span>
            <select value={task.status} onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])} style={selectStyle}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  padding: '0.5rem',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
};
