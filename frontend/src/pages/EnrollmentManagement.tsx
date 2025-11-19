import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Trash2, Users, ArrowRightLeft, Upload, Download } from 'lucide-react';
import { mockKelas, mockMahasiswa, mockEnrollments } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const EnrollmentManagement = () => {
  const [search, setSearch] = useState('');
  const [selectedKelas, setSelectedKelas] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);

  const filteredEnrollments = mockEnrollments.filter((enrollment) => {
    const student = mockMahasiswa.find((m) => m.id === enrollment.studentId);
    const kelas = mockKelas.find((k) => k.id === enrollment.kelasId);

    if (!student || !kelas) return false;

    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      kelas.name.toLowerCase().includes(search.toLowerCase());
    const matchesKelas = selectedKelas === 'all' || enrollment.kelasId === selectedKelas;

    return matchesSearch && matchesKelas;
  });

  const handleAddEnrollment = () => {
    toast.success('Mahasiswa berhasil ditambahkan ke kelas!');
    setIsAddDialogOpen(false);
  };

  const handleRemoveEnrollment = (studentName: string, kelasName: string) => {
    if (window.confirm(`Hapus ${studentName} dari kelas ${kelasName}?`)) {
      toast.success('Enrollment berhasil dihapus!');
    }
  };

  const handleTransfer = () => {
    toast.success('Mahasiswa berhasil dipindahkan!');
    setIsTransferDialogOpen(false);
  };

  const handleExport = () => {
    toast.success('Data enrollment berhasil di-export!');
  };

  const handleImport = () => {
    toast.success('Data enrollment berhasil di-import!');
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Enrollment Management</h1>
          <p className="text-muted-foreground text-lg">
            Kelola enrollment mahasiswa dalam kelas
          </p>
        </motion.div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari mahasiswa atau kelas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={selectedKelas} onValueChange={setSelectedKelas}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kelas</SelectItem>
              {mockKelas.map((kelas) => (
                <SelectItem key={kelas.id} value={kelas.id}>
                  {kelas.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>

          <Button variant="outline" onClick={handleImport} className="gap-2">
            <Upload className="w-4 h-4" />
            Import CSV
          </Button>

          <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowRightLeft className="w-4 h-4" />
                Transfer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Transfer Mahasiswa</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Mahasiswa</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih mahasiswa" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockMahasiswa.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Dari Kelas</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas asal" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockKelas.map((k) => (
                        <SelectItem key={k.id} value={k.id}>
                          {k.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Ke Kelas</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas tujuan" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockKelas.map((k) => (
                        <SelectItem key={k.id} value={k.id}>
                          {k.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleTransfer} className="w-full">
                  Transfer
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Tambah Enrollment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Mahasiswa ke Kelas</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Cari Mahasiswa</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Cari nama atau NIM..." className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label>Pilih Kelas</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockKelas.map((kelas) => (
                        <SelectItem key={kelas.id} value={kelas.id}>
                          {kelas.name} ({kelas.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddEnrollment} className="w-full">
                  Tambahkan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Enrollment Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-xl shadow-soft border border-border overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Mahasiswa
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    NIM
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Kelas
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Kode
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Tanggal Enroll
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredEnrollments.map((enrollment, index) => {
                  const student = mockMahasiswa.find((m) => m.id === enrollment.studentId);
                  const kelas = mockKelas.find((k) => k.id === enrollment.kelasId);

                  if (!student || !kelas) return null;

                  return (
                    <motion.tr
                      key={enrollment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-foreground font-medium">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {student.nim_nip}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{kelas.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{kelas.code}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            enrollment.status === 'active'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {enrollment.enrolledDate}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveEnrollment(student.name, kelas.name)}
                          className="gap-2"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </Button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Total: {filteredEnrollments.length} enrollments</span>
          </div>
          <p className="text-xs">
            Export/Import CSV untuk batch operations
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentManagement;
