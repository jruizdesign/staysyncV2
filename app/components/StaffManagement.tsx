'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface Staff {
  id: string;
  email: string;
  role: string;
}

export default function StaffManagement() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('staff');
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState('');

  const fetchStaff = async () => {
    const q = query(collection(db, "users"), where("role", "in", ["staff", "manager"]));
    const querySnapshot = await getDocs(q);
    const staff = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Staff));
    setStaffList(staff);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newStaffEmail.trim() !== '') {
      await addDoc(collection(db, "users"), {
        email: newStaffEmail,
        role: newStaffRole,
      });
      setNewStaffEmail('');
      setNewStaffRole('staff');
      fetchStaff();
    }
  };

  const handleEdit = (staff: Staff) => {
    setEditingStaffId(staff.id);
    setEditingRole(staff.role);
  };

  const handleCancelEdit = () => {
    setEditingStaffId(null);
    setEditingRole('');
  };

  const handleUpdateStaff = async (staffId: string) => {
    const staffDoc = doc(db, 'users', staffId);
    await updateDoc(staffDoc, { role: editingRole });
    setEditingStaffId(null);
    setEditingRole('');
    fetchStaff();
  };

  const handleDeleteStaff = async (staffId: string) => {
    const staffDoc = doc(db, 'users', staffId);
    await deleteDoc(staffDoc);
    fetchStaff();
  };

  return (
    <div style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '2rem', borderRadius: '12px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Staff Management</h2>

      <form onSubmit={handleAddStaff} style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Add New Staff</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            type="email"
            placeholder="Staff Email"
            value={newStaffEmail}
            onChange={(e) => setNewStaffEmail(e.target.value)}
            style={inputStyle}
          />
          <select value={newStaffRole} onChange={(e) => setNewStaffRole(e.target.value)} style={inputStyle}>
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
          </select>
          <button type="submit" style={buttonStyle}>Add Staff</button>
        </div>
      </form>

      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Current Staff</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {staffList.map(staff => (
            <li key={staff.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', marginBottom: '0.5rem' }}>
              {editingStaffId === staff.id ? (
                <>
                  <span>{staff.email}</span>
                  <select value={editingRole} onChange={(e) => setEditingRole(e.target.value)} style={inputStyle}>
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                  </select>
                  <div>
                    <button onClick={() => handleUpdateStaff(staff.id)} style={{...buttonStyle, backgroundColor: '#22c55e', marginRight: '0.5rem'}}>Save</button>
                    <button onClick={handleCancelEdit} style={{...buttonStyle, backgroundColor: '#f97316'}}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <span>{staff.email}</span>
                  <span>{staff.role}</span>
                  <div>
                    <button onClick={() => handleEdit(staff)} style={{...buttonStyle, marginRight: '0.5rem'}}>Edit</button>
                    <button onClick={() => handleDeleteStaff(staff.id)} style={{...buttonStyle, backgroundColor: '#ef4444'}}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '0.75rem',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
};

const buttonStyle: React.CSSProperties = {
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#3b82f6',
  color: 'white',
  cursor: 'pointer',
  fontWeight: 'bold',
};
