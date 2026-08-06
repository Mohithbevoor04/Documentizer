import { User, UserRole } from '@/types';
import { UNIVERSITIES } from './mockData';

const USER_STORAGE_KEY = 'talentchain_registered_users_v1';

export class UserService {
  // Get all registered users from local storage + defaults
  static getRegisteredUsers(): User[] {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse registered users:', e);
      }
    }

    // Default registered users
    const defaults: User[] = [
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
      },
      {
        id: 'usr_faculty_01',
        name: 'Dr. Sarah Jenkins',
        email: 'sarah.jenkins@dsatm.edu',
        phoneNumber: '+91 98765 12345',
        role: 'faculty',
        primaryRole: 'faculty',
        allowedRoles: ['faculty', 'student'],
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        universityId: 'uni_dsatm_01',
        universityName: 'Dayananda Sagar Academy of Tech & Mgmt'
      }
    ];

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  }

  // Register a new user account created with phone number & SMS OTP
  static registerUser(newUser: User): User {
    const users = this.getRegisteredUsers();
    
    // Check if user already exists by email or phone
    const existingIndex = users.findIndex(u => u.email === newUser.email || u.phoneNumber === newUser.phoneNumber);
    
    let updatedUsers: User[];
    if (existingIndex >= 0) {
      updatedUsers = [...users];
      updatedUsers[existingIndex] = { ...updatedUsers[existingIndex], ...newUser };
    } else {
      updatedUsers = [newUser, ...users];
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUsers));
    }

    return newUser;
  }

  // Find registered user account by identifier (email or mobile phone)
  static findUserByIdentifier(identifier: string): User | undefined {
    const users = this.getRegisteredUsers();
    const cleanId = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/\D/g, '');

    return users.find(u => 
      u.email.toLowerCase() === cleanId || 
      (u.phoneNumber && u.phoneNumber.replace(/\D/g, '').includes(cleanPhone))
    );
  }
}
