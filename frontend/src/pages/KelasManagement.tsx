import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Pencil, Trash2, Users, BookOpen } from 'lucide-react';
import { mockKelas } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const KelasManagement = () => {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const filteredKelas = mockKelas.filter((kelas) => {
    return (
      kelas.name.toLowerCase().includes(search.toLowerCase()) ||
      kelas.code.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleAddKelas = () => {
    toast.success('Kelas berhasil ditambahkan!');
    setIsDialogOpen(false);
  };

  const handleDeleteKelas = (id: string, name: string) => {
    if (window.confirm(`Hapus kelas ${name}?`)) {
      toast.success('Kelas berhasil dihapus!');
    }
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Kelas Management</h1>
          <p className="text-muted-foreground text-lg">Kelola data kelas dan enrollment</p>
        </motion.div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama kelas atau kode..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button onClick={() => navigate('/enrollment-management')} variant="outline" className="gap-2">
            <Users className="w-4 h-4" />
            Kelola Enrollment
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Tambah Kelas
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Kelas Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Nama Kelas</Label>
                  <Input placeholder="Masukkan nama kelas" />
                </div>
                <div>
                  <Label>Kode Kelas</Label>
                  <Input placeholder="Masukkan kode kelas" />
                </div>
                <div>
                  <Label>Semester</Label>
                  <Input type="number" placeholder="Masukkan semester" />
                </div>
                <div>
                  <Label>Jadwal</Label>
                  <Input placeholder="Contoh: Senin, 08:00 - 10:00" />
                </div>
                <div>
                  <Label>Ruangan</Label>
                  <Input placeholder="Contoh: Lab 301" />
                </div>
                <Button onClick={handleAddKelas} className="w-full">
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Kelas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKelas.map((kelas, index) => (
            <motion.div
              key={kelas.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-medium transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-1">{kelas.name}</h3>
                  <p className="text-sm text-muted-foreground">{kelas.code}</p>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  Sem {kelas.semester}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{kelas.studentIds.length} Mahasiswa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>{kelas.dosenName}</span>
                </div>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg mb-4 text-sm">
                <p className="text-muted-foreground mb-1">📅 {kelas.schedule}</p>
                <p className="text-muted-foreground">📍 {kelas.room}</p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-2">
                  <Pencil className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteKelas(kelas.id, kelas.name)}
                  className="flex-1 gap-2"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Total: {filteredKelas.length} kelas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelasManagement;
