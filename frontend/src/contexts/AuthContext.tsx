import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  nim_nip: string;
  role: 'dosen' | 'mahasiswa' | 'admin';
  avatar?: string;
  department?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (nim_nip: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('edurate_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (nim_nip: string, password: string): boolean => {
    // Mock authentication
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Dr. Budi Santoso',
        email: 'budi.santoso@university.ac.id',
        nim_nip: 'NIP001',
        role: 'dosen',
        department: 'Teknik Informatika',
        phone: '08123456789',
      },
      {
        id: '2',
        name: 'Ahmad Rizki',
        email: 'ahmad.rizki@student.ac.id',
        nim_nip: 'NIM001',
        role: 'mahasiswa',
        department: 'Teknik Informatika',
        phone: '08198765432',
      },
      {
        id: '3',
        name: 'Admin System',
        email: 'admin@university.ac.id',
        nim_nip: 'ADMIN001',
        role: 'admin',
        department: 'IT Administration',
        phone: '08111222333',
      },
    ];

    const foundUser = mockUsers.find((u) => u.nim_nip === nim_nip);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('edurate_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edurate_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('edurate_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
