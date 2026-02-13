import { useParams, useNavigate } from "react-router";
import { BookOpen, Star, Award, Share2, Calendar, TrendingUp, CheckCircle2, Clock, Heart, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

// Mock data
const mockStudentData = {
  "al-ikhlas-jkt-rizky-ramadhan": {
    name: "Rizky Ramadhan",
    mosque: "Masjid Al-Ikhlas",
    teacher: "Ustadz Budi",
    currentJilid: "4",
    currentPage: 13,
    totalPages: 32,
    startDate: "15 Januari 2026",
    daysActive: 28,
    totalPresence: 28,
    totalAbsent: 2,
    attendanceRate: 93,
    achievements: [
      { icon: "⭐", title: "Bintang Minggu Ini", description: "Mengaji 6 hari berturut-turut" },
      { icon: "🏆", title: "Hafal 4 Surah", description: "Al-Fatihah, An-Nas, Al-Falaq, Al-Ikhlas" },
      { icon: "📖", title: "Naik Jilid", description: "Baru saja naik ke Iqro 4" },
      { icon: "🎯", title: "Rajin Mengaji", description: "Hadir 28 dari 30 pertemuan" },
      { icon: "💎", title: "Nilai A+ 5x", description: "Mendapat nilai sempurna 5 kali" },
      { icon: "🌙", title: "Santri Teladan", description: "Terpilih santri teladan bulan ini" }
    ],
    hafalanProgress: {
      juzAmma: {
        total: 37,
        completed: 4,
        surahs: [
          { name: "An-Nas", status: "completed", verses: 6, date: "5 Feb 2026" },
          { name: "Al-Falaq", status: "completed", verses: 5, date: "8 Feb 2026" },
          { name: "Al-Ikhlas", status: "completed", verses: 4, date: "13 Feb 2026" },
          { name: "Al-Lahab", status: "in-progress", verses: 5, date: "-" },
          { name: "An-Nasr", status: "not-started", verses: 3, date: "-" }
        ]
      }
    },
    ibadahProgress: {
      doa: [
        { name: "Doa Sebelum Makan", status: "lulus", date: "11 Feb 2026" },
        { name: "Doa Sesudah Makan", status: "lulus", date: "9 Feb 2026" },
        { name: "Doa Masuk Masjid", status: "lulus", date: "6 Feb 2026" },
        { name: "Doa Keluar Masjid", status: "lulus", date: "6 Feb 2026" },
        { name: "Doa Masuk WC", status: "lulus", date: "4 Feb 2026" },
        { name: "Doa Keluar WC", status: "lulus", date: "4 Feb 2026" },
        { name: "Doa Kedua Orang Tua", status: "perbaikan", date: "-" },
        { name: "Doa Sebelum Tidur", status: "belum", date: "-" }
      ],
      bacaanSholat: [
        { name: "Niat & Takbiratul Ihram", status: "lulus", date: "3 Feb 2026" },
        { name: "Doa Iftitah", status: "lulus", date: "7 Feb 2026" },
        { name: "Surat Al-Fatihah", status: "lulus", date: "1 Feb 2026" },
        { name: "Bacaan Ruku", status: "lulus", date: "10 Feb 2026" },
        { name: "Bacaan Iktidal", status: "perbaikan", date: "-" },
        { name: "Bacaan Sujud", status: "belum", date: "-" }
      ]
    },
    statistics: {
      totalBacaan: 24,
      totalHafalan: 8,
      totalIbadah: 12,
      avgScoreBacaan: "B+",
      bestScore: "A+",
      consistencyDays: 6,
      totalHalaman: 13,
      kecepatan: "2.3 halaman/minggu"
    },
    recentActivities: [
      {
        date: "13 Feb 2026",
        time: "17:30",
        type: "bacaan",
        detail: "Setor Iqro 4 Hal 12-13",
        score: "B",
        notes: "Kurang panjang mad thobiinya, perlu latihan lagi mad thobi'i 2 harakat",
        teacher: "Ustadz Budi"
      },
      {
        date: "13 Feb 2026",
        time: "17:45",
        type: "hafalan",
        detail: "Hafalan Al-Ikhlas (Ziyadah)",
        score: "Lancar",
        notes: "Alhamdulillah lulus surat Al-Ikhlas dengan sangat lancar dan tartil. Bacaan tajwidnya sudah benar!",
        teacher: "Ustadz Budi"
      },
      {
        date: "12 Feb 2026",
        time: "17:30",
        type: "bacaan",
        detail: "Setor Iqro 4 Hal 11-12",
        score: "A",
        notes: "Masya Allah sangat lancar, tajwid sudah bagus. Pertahankan!",
        teacher: "Ustadz Budi"
      },
      {
        date: "11 Feb 2026",
        time: "17:30",
        type: "ibadah",
        detail: "Doa Sebelum Makan",
        score: "Lulus",
        notes: "Hafal lancar beserta artinya. Sudah paham makna dan adabnya.",
        teacher: "Ustadz Budi"
      },
      {
        date: "10 Feb 2026",
        time: "17:30",
        type: "bacaan",
        detail: "Setor Iqro 4 Hal 10-11",
        score: "B",
        notes: "Perhatikan tajwid pada huruf qolqolah. Sudah bagus tapi masih perlu latihan.",
        teacher: "Ustadz Budi"
      },
      {
        date: "9 Feb 2026",
        time: "17:30",
        type: "ibadah",
        detail: "Doa Sesudah Makan",
        score: "Lulus",
        notes: "Hafal dengan baik dan lancar",
        teacher: "Ustadz Budi"
      },
      {
        date: "8 Feb 2026",
        time: "17:30",
        type: "hafalan",
        detail: "Hafalan Al-Falaq (Ziyadah)",
        score: "Lancar",
        notes: "Lulus Al-Falaq, bacaan tartil dan benar",
        teacher: "Ustadz Budi"
      },
      {
        date: "8 Feb 2026",
        time: "17:15",
        type: "bacaan",
        detail: "Setor Iqro 4 Hal 9-10",
        score: "A",
        notes: "Bagus sekali, makharijul huruf sudah benar",
        teacher: "Ustadz Budi"
      },
      {
        date: "7 Feb 2026",
        time: "17:30",
        type: "ibadah",
        detail: "Doa Iftitah",
        score: "Lulus",
        notes: "Hafal dengan sempurna, gerakan sholat juga sudah benar",
        teacher: "Ustadz Budi"
      },
      {
        date: "6 Feb 2026",
        time: "17:30",
        type: "bacaan",
        detail: "Setor Iqro 4 Hal 8-9",
        score: "B+",
        notes: "Sudah bagus, tingkatkan lagi untuk mad dan ghunnah",
        teacher: "Ustadz Budi"
      },
      {
        date: "6 Feb 2026",
        time: "17:45",
        type: "ibadah",
        detail: "Doa Masuk & Keluar Masjid",
        score: "Lulus",
        notes: "Hafal keduanya dengan baik",
        teacher: "Ustadz Budi"
      },
      {
        date: "5 Feb 2026",
        time: "17:30",
        type: "hafalan",
        detail: "Hafalan An-Nas (Ziyadah)",
        score: "Lancar",
        notes: "Alhamdulillah lulus surat An-Nas",
        teacher: "Ustadz Budi"
      },
      {
        date: "5 Feb 2026",
        time: "17:15",
        type: "bacaan",
        detail: "Setor Iqro 4 Hal 7-8",
        score: "A+",
        notes: "Sempurna! Bacaan sangat bagus dan lancar",
        teacher: "Ustadz Budi"
      },
      {
        date: "4 Feb 2026",
        time: "17:30",
        type: "ibadah",
        detail: "Doa Masuk & Keluar WC",
        score: "Lulus",
        notes: "Hafal dengan baik dan sudah paham adabnya",
        teacher: "Ustadz Budi"
      },
      {
        date: "3 Feb 2026",
        time: "17:30",
        type: "bacaan",
        detail: "Setor Iqro 4 Hal 6-7",
        score: "A",
        notes: "Sangat bagus, pertahankan kualitas bacaannya",
        teacher: "Ustadz Budi"
      }
    ],
    progressChart: [
      { week: "Minggu 1", pages: 8 },
      { week: "Minggu 2", pages: 12 },
      { week: "Minggu 3", pages: 15 },
      { week: "Minggu 4", pages: 13 }
    ]
  },
  "al-ikhlas-jkt-alya-zahra": {
    name: "Alya Zahra",
    mosque: "Masjid Al-Ikhlas",
    teacher: "Ustadz Budi",
    currentJilid: "2",
    currentPage: 5,
    totalPages: 32,
    startDate: "1 Februari 2026",
    daysActive: 10,
    totalPresence: 10,
    totalAbsent: 0,
    attendanceRate: 100,
    achievements: [
      { icon: "🎯", title: "Kehadiran Sempurna", description: "Tidak pernah absen sejak awal" },
      { icon: "⭐", title: "Santri Baru Berprestasi", description: "Progress cepat di bulan pertama" },
      { icon: "💖", title: "Rajin & Tekun", description: "Selalu semangat belajar" }
    ],
    hafalanProgress: {
      juzAmma: {
        total: 37,
        completed: 1,
        surahs: [
          { name: "Al-Fatihah", status: "completed", verses: 7, date: "7 Feb 2026" },
          { name: "An-Nas", status: "in-progress", verses: 6, date: "-" },
          { name: "Al-Falaq", status: "not-started", verses: 5, date: "-" }
        ]
      }
    },
    ibadahProgress: {
      doa: [
        { name: "Doa Sebelum Makan", status: "lulus", date: "5 Feb 2026" },
        { name: "Doa Sesudah Makan", status: "lulus", date: "8 Feb 2026" },
        { name: "Doa Masuk WC", status: "perbaikan", date: "-" },
        { name: "Doa Keluar WC", status: "belum", date: "-" }
      ],
      bacaanSholat: [
        { name: "Niat & Takbiratul Ihram", status: "lulus", date: "10 Feb 2026" },
        { name: "Surat Al-Fatihah", status: "lulus", date: "7 Feb 2026" },
        { name: "Doa Iftitah", status: "belum", date: "-" }
      ]
    },
    statistics: {
      totalBacaan: 10,
      totalHafalan: 3,
      totalIbadah: 5,
      avgScoreBacaan: "B",
      bestScore: "A",
      consistencyDays: 10,
      totalHalaman: 5,
      kecepatan: "1.7 halaman/minggu"
    },
    recentActivities: [
      {
        date: "12 Feb 2026",
        time: "17:30",
        type: "bacaan",
        detail: "Setor Iqro 2 Hal 5",
        score: "B",
        notes: "Sudah bagus, perhatikan panjang pendek bacaan",
        teacher: "Ustadz Budi"
      },
      {
        date: "11 Feb 2026",
        time: "17:30",
        type: "bacaan",
        detail: "Setor Iqro 2 Hal 4",
        score: "B",
        notes: "Terus berlatih, sudah ada progress",
        teacher: "Ustadz Budi"
      },
      {
        date: "10 Feb 2026",
        time: "17:30",
        type: "ibadah",
        detail: "Niat & Takbiratul Ihram",
        score: "Lulus",
        notes: "Alhamdulillah sudah hafal dengan baik",
        teacher: "Ustadz Budi"
      },
      {
        date: "9 Feb 2026",
        time: "17:30",
        type: "bacaan",
        detail: "Setor Iqro 2 Hal 3-4",
        score: "A",
        notes: "Masya Allah lancar sekali hari ini",
        teacher: "Ustadz Budi"
      },
      {
        date: "8 Feb 2026",
        time: "17:30",
        type: "ibadah",
        detail: "Doa Sesudah Makan",
        score: "Lulus",
        notes: "Hafal dengan lancar",
        teacher: "Ustadz Budi"
      },
      {
        date: "7 Feb 2026",
        time: "17:30",
        type: "hafalan",
        detail: "Hafalan Al-Fatihah (Ziyadah)",
        score: "Lancar",
        notes: "Lulus surat Al-Fatihah, sangat bagus untuk santri baru",
        teacher: "Ustadz Budi"
      },
      {
        date: "6 Feb 2026",
        time: "17:30",
        type: "bacaan",
        detail: "Setor Iqro 2 Hal 2-3",
        score: "B+",
        notes: "Semakin bagus, teruskan!",
        teacher: "Ustadz Budi"
      },
      {
        date: "5 Feb 2026",
        time: "17:30",
        type: "ibadah",
        detail: "Doa Sebelum Makan",
        score: "Lulus",
        notes: "Hafal dengan baik",
        teacher: "Ustadz Budi"
      }
    ],
    progressChart: [
      { week: "Minggu 1", pages: 3 },
      { week: "Minggu 2", pages: 5 }
    ]
  }
};

export default function StudentReport() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  console.log("Current slug:", slug);
  console.log("Available keys:", Object.keys(mockStudentData));
  
  const student = mockStudentData[slug as keyof typeof mockStudentData];
  
  console.log("Found student:", student ? student.name : "Not found");

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">
              Data santri tidak ditemukan
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Slug: {slug}
            </p>
            <Button onClick={() => navigate("/")}>Kembali ke Beranda</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progressPercentage = Math.round((student.currentPage / student.totalPages) * 100);

  const handleShare = () => {
    const text = `Alhamdulillah, progress mengaji ${student.name} di ${student.mosque}. Saat ini sudah di Iqro ${student.currentJilid} halaman ${student.currentPage}! 🌟📖`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: `Progress Mengaji ${student.name}`,
        text: text,
        url: url
      }).catch(() => {
        // Fallback if share fails
        window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`, '_blank');
      });
    } else {
      // Fallback to WhatsApp Web
      window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`, '_blank');
    }
    toast.success("Membuka WhatsApp...");
  };

  const getActivityIcon = (type: string) => {
    switch(type) {
      case "bacaan": return <BookOpen className="w-5 h-5" />;
      case "hafalan": return <Star className="w-5 h-5" />;
      case "ibadah": return <Heart className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch(type) {
      case "bacaan": return "bg-indigo-100 text-indigo-600";
      case "hafalan": return "bg-purple-100 text-purple-600";
      case "ibadah": return "bg-pink-100 text-pink-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getScoreBadge = (score: string) => {
    const scoreColors: { [key: string]: string } = {
      "A": "bg-indigo-50 text-indigo-700 border-indigo-200",
      "B": "bg-blue-50 text-blue-700 border-blue-200",
      "C": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "D": "bg-red-50 text-red-700 border-red-200",
      "Lancar": "bg-indigo-50 text-indigo-700 border-indigo-200",
      "Lulus": "bg-indigo-50 text-indigo-700 border-indigo-200"
    };
    return scoreColors[score] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
              >
                <Home className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Kartu Prestasi Digital</h1>
                <p className="text-sm text-gray-600">{student.mosque}</p>
              </div>
            </div>
            <Button
              onClick={handleShare}
              className="bg-indigo-600 hover:bg-indigo-700"
              size="sm"
            >
              <Share2 className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Share</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        {/* Student Info Card */}
        <Card className="border-2 border-indigo-200 bg-gradient-to-br from-white to-indigo-50 mb-6">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl font-bold text-white">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {student.name}
              </h2>
              <p className="text-gray-600">
                Dibimbing oleh {student.teacher}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-indigo-600">
                  {student.currentJilid}
                </div>
                <p className="text-xs text-gray-600 mt-1">Jilid Iqro</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">
                  {student.currentPage}
                </div>
                <p className="text-xs text-gray-600 mt-1">Halaman</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-purple-600">
                  {student.daysActive}
                </div>
                <p className="text-xs text-gray-600 mt-1">Hari Aktif</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-2xl font-bold text-orange-600">
                  {student.achievements.length}
                </div>
                <p className="text-xs text-gray-600 mt-1">Pencapaian</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <CardTitle>Progress Iqro {student.currentJilid}</CardTitle>
            </div>
            <CardDescription>
              Halaman {student.currentPage} dari {student.totalPages} halaman
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-bold text-indigo-600">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-xs text-gray-500 text-center mt-2">
                Alhamdulillah, tinggal {student.totalPages - student.currentPage} halaman lagi! 💪
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-sm mb-3 text-gray-700">Aktivitas Mingguan</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={student.progressChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="week" 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pages" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 5 }}
                    name="Halaman"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Summary Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
              <CardTitle>Statistik Pembelajaran</CardTitle>
            </div>
            <CardDescription>Ringkasan aktivitas mengaji bulan ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-indigo-50 rounded-xl p-4 text-center border border-indigo-200">
                <div className="text-3xl font-bold text-indigo-600">{student.statistics.totalBacaan}</div>
                <p className="text-xs text-gray-600 mt-1">Total Bacaan</p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4 text-center border border-indigo-200">
                <div className="text-3xl font-bold text-indigo-600">{student.statistics.totalHafalan}</div>
                <p className="text-xs text-gray-600 mt-1">Setoran Hafalan</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-4 text-center border border-pink-200">
                <div className="text-3xl font-bold text-pink-600">{student.statistics.totalIbadah}</div>
                <p className="text-xs text-gray-600 mt-1">Praktik Ibadah</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-4 text-center border border-pink-200">
                <div className="text-3xl font-bold text-pink-600">{student.statistics.avgScoreBacaan}</div>
                <p className="text-xs text-gray-600 mt-1">Rata-rata Nilai</p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <Calendar className="w-4 h-4 text-indigo-500 mb-1.5" />
                <span className="text-lg font-bold text-gray-900">{student.attendanceRate}%</span>
                <span className="text-[11px] text-gray-500 mt-0.5">Kehadiran</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <Award className="w-4 h-4 text-indigo-500 mb-1.5" />
                <span className="text-lg font-bold text-gray-900">{student.statistics.bestScore}</span>
                <span className="text-[11px] text-gray-500 mt-0.5">Nilai Terbaik</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <TrendingUp className="w-4 h-4 text-indigo-500 mb-1.5" />
                <span className="text-lg font-bold text-gray-900">{student.statistics.consistencyDays} hari</span>
                <span className="text-[11px] text-gray-500 mt-0.5">Konsistensi</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <Clock className="w-4 h-4 text-indigo-500 mb-1.5" />
                <span className="text-lg font-bold text-gray-900 text-center leading-tight">{student.statistics.kecepatan.split('/')[0]}</span>
                <span className="text-[11px] text-gray-500 mt-0.5">{'hal/minggu'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hafalan Progress Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-600" />
              <CardTitle>Progress Hafalan Juz 'Amma</CardTitle>
            </div>
            <CardDescription>
              {student.hafalanProgress.juzAmma.completed} dari {student.hafalanProgress.juzAmma.total} surat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progress Hafalan</span>
                <span className="font-bold text-purple-600">
                  {Math.round((student.hafalanProgress.juzAmma.completed / student.hafalanProgress.juzAmma.total) * 100)}%
                </span>
              </div>
              <Progress 
                value={(student.hafalanProgress.juzAmma.completed / student.hafalanProgress.juzAmma.total) * 100} 
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              {student.hafalanProgress.juzAmma.surahs.map((surah, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    surah.status === "completed"
                      ? "bg-purple-50 border-purple-200"
                      : surah.status === "in-progress"
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        surah.status === "completed"
                          ? "bg-purple-600"
                          : surah.status === "in-progress"
                          ? "bg-yellow-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {surah.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : surah.status === "in-progress" ? (
                        <Clock className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{surah.name}</p>
                      <p className="text-xs text-gray-500">{surah.verses} ayat</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {surah.status === "completed" ? (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        ✓ Lulus
                      </Badge>
                    ) : surah.status === "in-progress" ? (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Proses
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
                        Belum
                      </Badge>
                    )}
                    {surah.date !== "-" && (
                      <p className="text-xs text-gray-500 mt-1">{surah.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ibadah Progress Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-600" />
              <CardTitle>Progress Ibadah & Doa</CardTitle>
            </div>
            <CardDescription>Pembelajaran doa harian dan bacaan sholat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Doa Harian */}
              <div>
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
                  Doa Harian
                </h4>
                <div className="space-y-2">
                  {student.ibadahProgress.doa.map((doa, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            doa.status === "lulus"
                              ? "bg-indigo-600"
                              : doa.status === "perbaikan"
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {doa.status === "lulus" && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-sm">{doa.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {doa.status === "lulus" ? (
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                            ✓ Lulus
                          </Badge>
                        ) : doa.status === "perbaikan" ? (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Perbaikan
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
                            Belum
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Bacaan Sholat */}
              <div>
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
                  Bacaan Sholat
                </h4>
                <div className="space-y-2">
                  {student.ibadahProgress.bacaanSholat.map((bacaan, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            bacaan.status === "lulus"
                              ? "bg-indigo-600"
                              : bacaan.status === "perbaikan"
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {bacaan.status === "lulus" && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-sm">{bacaan.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {bacaan.status === "lulus" ? (
                          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                            ✓ Lulus
                          </Badge>
                        ) : bacaan.status === "perbaikan" ? (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Perbaikan
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
                            Belum
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <CardTitle>Pencapaian & Badge</CardTitle>
            </div>
            <CardDescription>Badge dan prestasi yang telah diraih</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {student.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-200 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <h4 className="font-bold text-sm mb-1">{achievement.title}</h4>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <CardTitle>Timeline Aktivitas</CardTitle>
            </div>
            <CardDescription>Riwayat mengaji terbaru</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {student.recentActivities.map((activity, index) => (
                <div key={index}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      {index < student.recentActivities.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{activity.detail}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-500">
                              {activity.date} • {activity.time}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={getScoreBadge(activity.score)}
                        >
                          {activity.score}
                        </Badge>
                      </div>
                      {activity.notes && (
                        <div className="bg-gray-50 rounded-lg p-3 mt-2">
                          <p className="text-sm text-gray-600 italic">
                            "{activity.notes}"
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            - {activity.teacher}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Share CTA */}
        <Card className="mt-6 bg-gradient-to-br from-indigo-600 to-indigo-700 border-0 text-white">
          <CardContent className="py-8 text-center">
            <Share2 className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-xl font-bold mb-2">Banggakan Pencapaian Anak!</h3>
            <p className="text-indigo-100 mb-6 max-w-md mx-auto">
              Bagikan progress mengaji anak ke keluarga dan teman-teman melalui WhatsApp
            </p>
            <Button
              onClick={handleShare}
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share ke WhatsApp
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-gray-900">SimMengaji</span>
          </div>
          <p className="text-sm text-gray-600">
            Sistem Monitoring Mengaji Digital • {student.mosque}
          </p>
        </div>
      </footer>
    </div>
  );
}
