import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Star, GraduationCap, Mail, Building2 } from 'lucide-react';
import { mockDosen, mockAdmin } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const DosenPage = () => {
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Combine dosen and admin for admin users
  const allPeople = user?.role === 'admin' 
    ? mockAdmin.filter(admin => admin.id !== user.id)
    : mockDosen;

  const filteredDosen = allPeople.filter((dosen) =>
    dosen.name.toLowerCase().includes(search.toLowerCase()) ||
    dosen.nim_nip.toLowerCase().includes(search.toLowerCase()) ||
    dosen.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleRate = (dosen: any) => {
    navigate('/rating', { 
      state: { 
        targetUser: dosen,
        targetRole: user?.role === 'admin' ? 'admin' : 'dosen'
      } 
    });
    toast.success(`Mulai rating untuk ${dosen.name}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {user?.role === 'admin' ? 'Daftar Admin' : 'Daftar Dosen'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {user?.role === 'admin' 
              ? 'Rating sesama admin untuk evaluasi kinerja'
              : 'Berikan rating untuk semua dosen yang terdaftar'}
          </p>
        </motion.div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama, NIP, atau department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Dosen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDosen.map((dosen, index) => (
            <motion.div
              key={dosen.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl shadow-soft border border-border overflow-hidden hover:shadow-medium transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {dosen.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{dosen.nim_nip}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span>{dosen.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{dosen.email}</span>
                  </div>
                </div>

                <Button 
                  onClick={() => handleRate(dosen)}
                  className="w-full gap-2"
                >
                  <Star className="w-4 h-4" />
                  Berikan Rating
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDosen.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Tidak ada {user?.role === 'admin' ? 'admin' : 'dosen'} yang ditemukan
            </p>
          </motion.div>
        )}

        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>Total: {filteredDosen.length} {user?.role === 'admin' ? 'admin' : 'dosen'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DosenPage;
