import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Star, Calendar, MapPin } from 'lucide-react';
import {
  getKelasForDosen,
  getKelasForMahasiswa,
  getStudentsInKelas,
  mockDosen,
  mockMahasiswa,
} from '@/data/mockData';

const KelaskuPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const kelasList =
    user?.role === 'dosen'
      ? getKelasForDosen(user.id)
      : getKelasForMahasiswa(user?.id || '');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Kelasku</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Daftar kelas yang {user?.role === 'dosen' ? 'diampu' : 'diikuti'}
          </p>
        </motion.div>

        <div className="space-y-6">
          {kelasList.map((kelas, index) => (
            <motion.div
              key={kelas.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-medium transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{kelas.name}</h3>
                  <p className="text-muted-foreground">{kelas.code}</p>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Semester {kelas.semester}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{kelas.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{kelas.room}</span>
                </div>
              </div>

              {user?.role === 'dosen' ? (
                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Mahasiswa ({kelas.studentIds.length})
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {getStudentsInKelas(kelas.id).map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.nim_nip}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => navigate('/rating?type=mahasiswa')}
                          className="gap-2"
                        >
                          <Star className="w-4 h-4" />
                          Rate
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold text-foreground mb-3">Dosen Lain</h4>
                    <div className="flex gap-4">
                      {mockDosen
                        .filter((d) => d.id !== user?.id)
                        .slice(0, 2)
                        .map((dosen) => (
                          <div
                            key={dosen.id}
                            className="flex-1 flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-foreground">{dosen.name}</p>
                              <p className="text-sm text-muted-foreground">{dosen.department}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate('/rating?type=dosen')}
                              className="gap-2"
                            >
                              <Star className="w-4 h-4" />
                              Rate
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-t border-border pt-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Dosen Pengampu</h4>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{kelas.dosenName}</p>
                        <p className="text-sm text-muted-foreground">
                          {mockDosen.find((d) => d.id === kelas.dosenId)?.department}
                        </p>
                      </div>
                      <Button
                        onClick={() => navigate('/rating?type=dosen')}
                        className="gap-2"
                      >
                        <Star className="w-4 h-4" />
                        Rate Dosen
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Teman Sekelas
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {getStudentsInKelas(kelas.id)
                        .filter((s) => s.id !== user?.id)
                        .map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-foreground">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.nim_nip}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigate('/rating?type=teman')}
                              className="gap-2"
                            >
                              <Star className="w-4 h-4" />
                              Rate
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KelaskuPage;
