import { useState } from "react";
import { useNavigate } from "react-router";
import { BookOpen, Users, TrendingUp, Plus, Search, MoreVertical, Home, Camera, Image as ImageIcon, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

// Mock data
const mockMosque = {
  id: 1,
  name: "Masjid Al-Ikhlas",
  slug: "al-ikhlas-jkt",
  address: "Jl. Fatmawati No 1"
};

const mockTeachers = [
  { id: 2, name: "Ustadz Budi", email: "budi@alikhlas.com", phone: "081234567891", studentCount: 2 },
  { id: 3, name: "Ustadzah Siti", email: "siti@alikhlas.com", phone: "081234567892", studentCount: 0 }
];

const mockStudents = [
  { 
    id: 1, 
    name: "Rizky Ramadhan", 
    slug: "al-ikhlas-jkt-rizky-ramadhan",
    teacher: "Ustadz Budi", 
    parentPhone: "0811111111", 
    currentLevel: "Iqro 4 - Hal 12",
    lastActivity: "2 jam yang lalu"
  },
  { 
    id: 2, 
    name: "Alya Zahra", 
    slug: "al-ikhlas-jkt-alya-zahra",
    teacher: "Ustadz Budi", 
    parentPhone: "0822222222", 
    currentLevel: "Iqro 2 - Hal 5",
    lastActivity: "1 hari yang lalu"
  }
];

const mockDocumentations = [
  {
    id: 1,
    title: "Kegiatan Ramadhan 2026",
    description: "Dokumentasi kegiatan mengaji dan tadarus selama bulan Ramadhan 2026",
    slug: "kegiatan-ramadhan-2026",
    photoUrls: [
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800",
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800",
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800"
    ],
    createdAt: "10 Feb 2026"
  },
  {
    id: 2,
    title: "Wisuda Tahfidz Angkatan 5",
    description: "Pelepasan santri yang telah menyelesaikan program tahfidz juz 30",
    slug: "wisuda-tahfidz-angkatan-5",
    photoUrls: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
    ],
    createdAt: "5 Feb 2026"
  },
  {
    id: 3,
    title: "Perayaan Tahun Baru Islam 1448 H",
    description: "Kegiatan peringatan tahun baru Islam dengan santri dan pengajar",
    slug: "tahun-baru-islam-1448",
    photoUrls: [
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800"
    ],
    createdAt: "1 Feb 2026"
  }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "teachers" | "documentations">("overview");
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);

  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Data santri berhasil ditambahkan!");
    setIsAddStudentOpen(false);
  };

  const handleCopyLink = (slug: string) => {
    const link = `${window.location.origin}/report/${slug}`;
    navigator.clipboard.writeText(link);
    toast.success("Link berhasil disalin ke clipboard!");
  };

  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="md:hidden"
              >
                <Home className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Dashboard Admin</h1>
                  <p className="text-sm text-gray-600">{mockMosque.name}</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="hidden md:flex"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-indigo-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Total Santri</CardDescription>
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600">
                {mockStudents.length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Santri aktif</p>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Total Pengajar</CardDescription>
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {mockTeachers.length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Ustadz/Ustadzah</p>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Aktivitas Hari Ini</CardDescription>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">24</div>
              <p className="text-xs text-gray-500 mt-1">Log mengaji baru</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs - Mobile Dropdown */}
        <div className="mb-6 md:hidden">
          <Select value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">📊 Overview</SelectItem>
              <SelectItem value="students">👨‍🎓 Data Santri</SelectItem>
              <SelectItem value="teachers">👨‍🏫 Data Pengajar</SelectItem>
              <SelectItem value="documentations">📸 Dokumentasi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs - Desktop Grid Buttons */}
        <div className="hidden md:grid md:grid-cols-4 gap-2 mb-6">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
            className={activeTab === "overview" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "students" ? "default" : "outline"}
            onClick={() => setActiveTab("students")}
            className={activeTab === "students" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            Data Santri
          </Button>
          <Button
            variant={activeTab === "teachers" ? "default" : "outline"}
            onClick={() => setActiveTab("teachers")}
            className={activeTab === "teachers" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            Data Pengajar
          </Button>
          <Button
            variant={activeTab === "documentations" ? "default" : "outline"}
            onClick={() => setActiveTab("documentations")}
            className={activeTab === "documentations" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            Dokumentasi
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>Log mengaji santri hari ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-4 border-b">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">Rizky Ramadhan</p>
                      <p className="text-sm text-gray-600">Setor Iqro 4 Hal 12-13 • Nilai: B</p>
                      <p className="text-xs text-gray-500 mt-1">2 jam yang lalu</p>
                    </div>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                      Lanjut
                    </Badge>
                  </div>
                  <div className="flex items-start gap-3 pb-4 border-b">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">Alya Zahra</p>
                      <p className="text-sm text-gray-600">Setor Iqro 2 Hal 5 • Nilai: A</p>
                      <p className="text-xs text-gray-500 mt-1">3 jam yang lalu</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Lanjut
                    </Badge>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">Rizky Ramadhan</p>
                      <p className="text-sm text-gray-600">Hafalan Al-Ikhlas (Ziyadah) • Lancar</p>
                      <p className="text-xs text-gray-500 mt-1">2 jam yang lalu</p>
                    </div>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Hafal
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Aksi cepat untuk admin</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-auto py-4 justify-start">
                      <Plus className="w-5 h-5 mr-2" />
                      <div className="text-left">
                        <div className="font-medium">Tambah Santri Baru</div>
                        <div className="text-xs text-gray-500">Daftarkan santri baru</div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tambah Santri Baru</DialogTitle>
                      <DialogDescription>
                        Isi data santri untuk mendaftar ke sistem
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddStudent} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" placeholder="Contoh: Ahmad Fauzi" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parent-phone">No. WhatsApp Orang Tua</Label>
                        <Input id="parent-phone" type="tel" placeholder="08123456789" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teacher">Pengajar</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih pengajar" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockTeachers.map(teacher => (
                              <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="level">Level Awal</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="iqro-1">Iqro 1</SelectItem>
                            <SelectItem value="iqro-2">Iqro 2</SelectItem>
                            <SelectItem value="iqro-3">Iqro 3</SelectItem>
                            <SelectItem value="iqro-4">Iqro 4</SelectItem>
                            <SelectItem value="iqro-5">Iqro 5</SelectItem>
                            <SelectItem value="iqro-6">Iqro 6</SelectItem>
                            <SelectItem value="quran">Al-Quran</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Simpan Data Santri
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="outline" 
                  className="h-auto py-4 justify-start"
                  onClick={() => setActiveTab("teachers")}
                >
                  <Users className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Kelola Pengajar</div>
                    <div className="text-xs text-gray-500">Tambah atau edit data ustadz</div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Data Santri</CardTitle>
                  <CardDescription>Kelola data santri dan lihat progress mereka</CardDescription>
                </div>
                <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Santri
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tambah Santri Baru</DialogTitle>
                      <DialogDescription>
                        Isi data santri untuk mendaftar ke sistem
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddStudent} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" placeholder="Contoh: Ahmad Fauzi" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parent-phone">No. WhatsApp Orang Tua</Label>
                        <Input id="parent-phone" type="tel" placeholder="08123456789" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teacher">Pengajar</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih pengajar" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockTeachers.map(teacher => (
                              <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="level">Level Awal</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="iqro-1">Iqro 1</SelectItem>
                            <SelectItem value="iqro-2">Iqro 2</SelectItem>
                            <SelectItem value="iqro-3">Iqro 3</SelectItem>
                            <SelectItem value="iqro-4">Iqro 4</SelectItem>
                            <SelectItem value="iqro-5">Iqro 5</SelectItem>
                            <SelectItem value="iqro-6">Iqro 6</SelectItem>
                            <SelectItem value="quran">Al-Quran</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Simpan Data Santri
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Cari nama santri..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {filteredStudents.map(student => (
                  <Card key={student.id} className="border">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.teacher}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Level:</span>
                          <span className="font-medium">{student.currentLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">WA Ortu:</span>
                          <span className="font-medium">{student.parentPhone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aktivitas:</span>
                          <span className="text-gray-500">{student.lastActivity}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => navigate(`/report/${student.slug}`)}
                        >
                          Lihat Laporan
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleCopyLink(student.slug)}
                        >
                          Copy Link
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Santri</TableHead>
                      <TableHead>Pengajar</TableHead>
                      <TableHead>Level Saat Ini</TableHead>
                      <TableHead>No. WA Ortu</TableHead>
                      <TableHead>Aktivitas Terakhir</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map(student => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.teacher}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.currentLevel}</Badge>
                        </TableCell>
                        <TableCell>{student.parentPhone}</TableCell>
                        <TableCell className="text-gray-600">{student.lastActivity}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/report/${student.slug}`)}
                            >
                              Lihat Laporan
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopyLink(student.slug)}
                            >
                              Copy Link
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Teachers Tab */}
        {activeTab === "teachers" && (
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Data Pengajar</CardTitle>
                  <CardDescription>Kelola data ustadz dan ustadzah</CardDescription>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Pengajar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {mockTeachers.map(teacher => (
                  <Card key={teacher.id} className="border">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{teacher.name}</h3>
                          <p className="text-sm text-gray-600">{teacher.email}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">No. HP:</span>
                          <span className="font-medium">{teacher.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Jumlah Santri:</span>
                          <Badge variant="outline">{teacher.studentCount} santri</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Pengajar</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>No. HP</TableHead>
                      <TableHead>Jumlah Santri</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTeachers.map(teacher => (
                      <TableRow key={teacher.id}>
                        <TableCell className="font-medium">{teacher.name}</TableCell>
                        <TableCell>{teacher.email}</TableCell>
                        <TableCell>{teacher.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{teacher.studentCount} santri</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documentations Tab */}
        {activeTab === "documentations" && (
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Dokumentasi</CardTitle>
                  <CardDescription>Kelola dokumentasi kegiatan masjid</CardDescription>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsAddDocOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Dokumentasi
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {mockDocumentations.map(doc => (
                  <Card key={doc.id} className="border">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{doc.title}</h3>
                          <p className="text-sm text-gray-600">{doc.description}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tanggal:</span>
                          <span className="font-medium">{doc.createdAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Foto:</span>
                          <Badge variant="outline">{doc.photoUrls.length} foto</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => navigate(`/documentation/${doc.slug}`)}
                        >
                          Lihat Dokumentasi
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Judul</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Foto</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDocumentations.map(doc => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.title}</TableCell>
                        <TableCell>{doc.description}</TableCell>
                        <TableCell>{doc.createdAt}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.photoUrls.length} foto</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/documentation/${doc.slug}`)}
                            >
                              Lihat Dokumentasi
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Documentation Dialog */}
      <Dialog open={isAddDocOpen} onOpenChange={setIsAddDocOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Dokumentasi</DialogTitle>
            <DialogDescription>
              Upload foto dan informasi kegiatan masjid
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            toast.success("Dokumentasi berhasil ditambahkan!");
            setIsAddDocOpen(false);
          }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doc-title">Judul Kegiatan</Label>
              <Input id="doc-title" placeholder="Contoh: Kegiatan Ramadhan 2026" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-desc">Deskripsi</Label>
              <Textarea
                id="doc-desc"
                placeholder="Deskripsi singkat tentang kegiatan..."
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-photos">URL Foto</Label>
              <Textarea
                id="doc-photos"
                placeholder="Masukkan URL foto, satu baris per URL&#10;https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"
                rows={4}
              />
              <p className="text-xs text-gray-500">
                Masukkan URL foto, satu URL per baris. Atau gunakan layanan upload foto seperti Cloudinary atau ImgBB.
              </p>
            </div>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Camera className="w-4 h-4 mr-2" />
              Simpan Dokumentasi
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Logout Button - Mobile */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <Button
          variant="default"
          size="icon"
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="bg-red-600 hover:bg-red-700 shadow-lg"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}