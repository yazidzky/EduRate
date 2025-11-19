import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { StatCard } from '@/components/ui/stat-card';
import { Users, BookOpen, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { mockDosen, mockMahasiswa, mockKelas, mockRatings } from '@/data/mockData';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardAdmin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'User Growth',
        data: [10, 15, 25, 35, 45, mockDosen.length + mockMahasiswa.length],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const pieChartData = {
    labels: ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star'],
    datasets: [
      {
        data: [45, 30, 15, 7, 3],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(52, 211, 153, 0.8)',
          'rgba(110, 231, 183, 0.8)',
          'rgba(167, 243, 208, 0.8)',
          'rgba(209, 250, 229, 0.8)',
        ],
      },
    ],
  };

  const barChartData = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    datasets: [
      {
        label: 'Rating Activity',
        data: [12, 19, 15, 25, 22, 8, 5],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
    ],
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
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-lg mb-8">Kelola sistem rating akademik</p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={mockDosen.length + mockMahasiswa.length}
            icon={Users}
            trend="+5 user baru"
            delay={0.1}
          />
          <StatCard
            title="Kelas Aktif"
            value={mockKelas.length}
            icon={BookOpen}
            trend="Semester ini"
            delay={0.2}
          />
          <StatCard
            title="Total Rating"
            value={mockRatings.length}
            icon={Star}
            trend="+15 rating hari ini"
            delay={0.3}
          />
          <StatCard
            title="Avg Rating"
            value="4.5"
            icon={TrendingUp}
            trend="+0.2 dari bulan lalu"
            delay={0.4}
          />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card rounded-xl p-6 shadow-soft border border-border"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Pertumbuhan User</h3>
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-card rounded-xl p-6 shadow-soft border border-border"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Distribusi Rating</h3>
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-card rounded-xl p-6 shadow-soft border border-border"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">Aktivitas Rating</h3>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: true }} />
          </motion.div>
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-card rounded-xl p-6 shadow-soft border border-border"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">User Management</h3>
            <p className="text-muted-foreground mb-4">
              Kelola data dosen dan mahasiswa
            </p>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/user-management')} className="flex-1">
                Kelola Users
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="bg-card rounded-xl p-6 shadow-soft border border-border"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Kelas Management</h3>
            <p className="text-muted-foreground mb-4">
              Kelola kelas dan enrollment mahasiswa
            </p>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/kelas-management')} className="flex-1">
                Kelola Kelas
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
