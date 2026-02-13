import { useNavigate } from "react-router";
import { BookOpen, Users, TrendingUp, Award, Menu, BookMarked, Heart, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-indigo-900">SimMengaji</h1>
              <p className="text-xs text-indigo-600">Sistem Monitoring Mengaji</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
            Platform Manajemen Mengaji Digital
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Pantau Progress Mengaji Anak dengan <span className="text-indigo-600">Mudah & Real-time</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sistem informasi manajemen dan monitoring mengaji untuk masjid, pengajar, dan orang tua. 
            Tidak ada lagi buku prestasi yang hilang!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => navigate("/login")}
            >
              Mulai Sekarang
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </div>

        {/* Demo Preview */}
        <div className="mt-12 md:mt-16 bg-white rounded-2xl shadow-2xl overflow-hidden border">
          <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <BookMarked className="w-20 h-20 text-indigo-600 mx-auto mb-4" />
              <p className="text-gray-600">Preview Dashboard akan muncul di sini</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Fitur Unggulan</h3>
            <p className="text-gray-600">Solusi lengkap untuk manajemen mengaji modern</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Pencatatan Digital</CardTitle>
                <CardDescription>
                  Input progress Iqro, Al-Quran, hafalan, dan ibadah harian dengan cepat dan mudah
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Multi-Masjid</CardTitle>
                <CardDescription>
                  Mendukung banyak masjid dalam satu sistem dengan data yang terisolasi dan aman
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Monitoring Real-time</CardTitle>
                <CardDescription>
                  Orang tua dapat memantau progress anak melalui link khusus tanpa perlu login rumit
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Gamifikasi</CardTitle>
                <CardDescription>
                  Badge dan reward untuk memotivasi santri dengan sistem pencapaian yang menarik
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-pink-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>Mobile Friendly</CardTitle>
                <CardDescription>
                  Interface dioptimalkan untuk smartphone, cocok untuk pengajar yang input di masjid
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-yellow-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>Laporan Lengkap</CardTitle>
                <CardDescription>
                  Statistik dan analitik untuk memantau performa santri dan efektivitas pengajaran
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 border-0 text-white">
          <CardContent className="py-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Siap Memulai?</h3>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Modernisasi sistem pencatatan mengaji di masjid Anda. 
              Mulai gunakan SimMengaji dan rasakan kemudahannya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-indigo-600 hover:bg-gray-100"
                onClick={() => navigate("/report/al-ikhlas-jkt-rizky-ramadhan")}
              >
                Lihat Demo Laporan
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/documentation/kegiatan-ramadhan-2026")}
              >
                Lihat Dokumentasi
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-indigo-500" />
            <span className="text-white font-bold">SimMengaji</span>
          </div>
          <p className="text-sm">
            © 2026 SimMengaji. Memudahkan monitoring mengaji untuk generasi digital.
          </p>
        </div>
      </footer>
    </div>
  );
}