import { User } from '@/types';

const USER_STORAGE_KEY = 'talentchain_registered_users_v1';

export class UserService {
  // Synchronous local backup user retriever
  static getLocalUsers(): User[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse local users:', e);
      }
    }
    return [
      {
        id: 'usr_student_01',
        name: 'Alex Rivera',
        email: 'alex.rivera@dsatm.edu',
        phoneNumber: '+91 98765 43210',
        role: 'student',
        primaryRole: 'student',
        allowedRoles: ['student'],
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        universityId: 'uni_dsatm_01',
        universityName: 'Dayananda Sagar Academy of Tech & Mgmt'
      }
    ];
  }

  // Get all registered users from MySQL Database (with local storage fallback)
  static async getRegisteredUsersAsync(): Promise<User[]> {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        if (data.users && Array.isArray(data.users)) {
          if (typeof window !== 'undefined') {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.users));
          }
          return data.users;
        }
      }
    } catch (err) {
      console.warn('UserService API call error:', err);
    }
    return this.getLocalUsers();
  }

  // Synchronous wrapper for initial state sync
  static getRegisteredUsers(): User[] {
    return this.getLocalUsers();
  }

  // Register a new user account into MySQL Database and local storage
  static registerUser(newUser: User): User {
    // 1. Save to local storage cache immediately
    const users = this.getLocalUsers();
    const existingIndex = users.findIndex(u => u.email === newUser.email || u.phoneNumber === newUser.phoneNumber);
    const updatedUsers = existingIndex >= 0 
      ? users.map((u, i) => i === existingIndex ? { ...u, ...newUser } : u)
      : [newUser, ...users];

    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUsers));
    }

    // 2. Async dispatch to MySQL Database API Endpoint
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log('✅ User successfully persisted to MySQL Database:', newUser.email);
        }
      })
      .catch(err => {
        console.warn('MySQL User Persistence dispatch note:', err);
      });

    return newUser;
  }

  // Find registered user account by identifier (email or mobile phone)
  static findUserByIdentifier(identifier: string): User | undefined {
    const users = this.getLocalUsers();
    const cleanId = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/\D/g, '');

    return users.find(u => 
      u.email.toLowerCase() === cleanId || 
      (u.phoneNumber && u.phoneNumber.replace(/\D/g, '').includes(cleanPhone))
    );
  }
}
