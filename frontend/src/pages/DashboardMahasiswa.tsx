import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { StatCard } from '@/components/ui/stat-card';
import { SpiderChart } from '@/components/ui/spider-chart';
import { BookOpen, Users, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getKelasForMahasiswa, getMahasiswaRatings } from '@/data/mockData';

const DashboardMahasiswa = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const kelasList = getKelasForMahasiswa(user?.id || '');
  const ratings = getMahasiswaRatings(user?.id || '');

  const spiderData = {
    labels: ['Kreativitas', 'Kedisiplinan', 'Kolaborasi', 'Komunikasi', 'Problem Solving'],
    values: [4.3, 4.1, 4.5, 4.2, 4.4],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Selamat Datang, {user?.name}
          </h1>
          <p className="text-muted-foreground text-lg mb-8">Dashboard Mahasiswa</p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Kelas Aktif"
            value={kelasList.length}
            icon={BookOpen}
            trend="Semester 5"
            delay={0.1}
          />
          <StatCard
            title="Dosen"
            value={new Set(kelasList.map(k => k.dosenId)).size}
            icon={Users}
            delay={0.2}
          />
          <StatCard
            title="Rating Rata-rata"
            value="4.3"
            icon={Star}
            trend="+0.2 dari semester lalu"
            delay={0.3}
          />
          <StatCard
            title="Achievement"
            value="12"
            icon={Award}
            trend="+3 badge baru"
            delay={0.4}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Spider Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card rounded-xl p-6 shadow-soft border border-border"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Performance Overview</h3>
            <SpiderChart data={spiderData} />
          </motion.div>

          {/* Recent Feedback */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-card rounded-xl p-6 shadow-soft border border-border"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Feedback Terbaru</h3>
            <div className="space-y-4">
              {ratings.slice(0, 3).map((rating, index) => (
                <motion.div
                  key={rating.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="p-4 bg-muted/50 rounded-lg"
                >
                  <p className="text-sm text-foreground mb-1">{rating.comment}</p>
                  <p className="text-xs text-muted-foreground">
                    {rating.fromName} - {rating.kelasName}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Kelasku */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-card rounded-xl p-6 shadow-soft border border-border mb-8"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">Kelasku</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {kelasList.map((kelas, index) => (
              <motion.div
                key={kelas.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-border rounded-lg hover:shadow-soft transition-all cursor-pointer"
                onClick={() => navigate('/kelasku')}
              >
                <h4 className="font-semibold text-foreground">{kelas.name}</h4>
                <p className="text-sm text-muted-foreground">{kelas.code}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Dosen: {kelas.dosenName}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="bg-card rounded-xl p-6 shadow-soft border border-border"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/rating?type=dosen')} className="flex-1">
              Rating Dosen
            </Button>
            <Button onClick={() => navigate('/rating?type=teman')} variant="outline" className="flex-1">
              Rating Teman Sekelas
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardMahasiswa;
