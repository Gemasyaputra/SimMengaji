import { useState } from "react";
import { useNavigate } from "react-router";
import { BookOpen, Users, ChevronRight, X, Check, LogOut, Home, BookMarked, CheckCircle2, Star, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

// Mock data
const mockTeacher = {
  id: 2,
  name: "Ustadz Budi",
  mosque: "Masjid Al-Ikhlas"
};

const mockStudents = [
  { 
    id: 1, 
    name: "Rizky Ramadhan", 
    slug: "al-ikhlas-jkt-rizky-ramadhan",
    currentJilid: "4",
    currentPage: 12,
    lastActivity: "2 jam yang lalu",
    todayStatus: "completed"
  },
  { 
    id: 2, 
    name: "Alya Zahra", 
    slug: "al-ikhlas-jkt-alya-zahra",
    currentJilid: "2",
    currentPage: 5,
    lastActivity: "Belum mengaji hari ini",
    todayStatus: "pending"
  }
];

const mockSurahs = [
  { id: 1, name: "Al-Fatihah", verses: 7 },
  { id: 112, name: "Al-Ikhlas", verses: 4 },
  { id: 113, name: "Al-Falaq", verses: 5 },
  { id: 114, name: "An-Nas", verses: 6 }
];

const mockDoas = [
  "Doa Sebelum Makan",
  "Doa Sesudah Makan",
  "Doa Masuk Kamar Mandi",
  "Doa Kedua Orang Tua"
];

const mockPrayerReadings = [
  "Niat & Takbiratul Ihram",
  "Doa Iftitah",
  "Surat Al-Fatihah",
  "Bacaan Ruku"
];

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState<typeof mockStudents[0] | null>(null);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [activeInputTab, setActiveInputTab] = useState("bacaan");

  // Form states for Bacaan
  const [materialType, setMaterialType] = useState("iqro");
  const [jilid, setJilid] = useState("");
  const [startPage, setStartPage] = useState("");
  const [endPage, setEndPage] = useState("");
  const [qualityScore, setQualityScore] = useState("");
  const [notes, setNotes] = useState("");

  // Form states for Hafalan
  const [memorizationType, setMemorizationType] = useState("ziyadah");
  const [selectedSurah, setSelectedSurah] = useState("");
  const [verseStart, setVerseStart] = useState("");
  const [verseEnd, setVerseEnd] = useState("");
  const [fluencyLevel, setFluencyLevel] = useState("");
  const [hafalanNotes, setHafalanNotes] = useState("");

  const handleOpenInput = (student: typeof mockStudents[0]) => {
    setSelectedStudent(student);
    setJilid(student.currentJilid);
    setStartPage(student.currentPage.toString());
    setIsInputOpen(true);
  };

  const handleSubmitBacaan = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Progress bacaan ${selectedStudent?.name} berhasil disimpan!`);
    setIsInputOpen(false);
    // Reset form
    setNotes("");
    setQualityScore("");
  };

  const handleSubmitHafalan = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Hafalan ${selectedStudent?.name} berhasil dicatat!`);
    setIsInputOpen(false);
    // Reset form
    setHafalanNotes("");
    setFluencyLevel("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Dashboard Pengajar</h1>
                  <p className="text-sm text-gray-600">{mockTeacher.name}</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="hidden md:flex"
            >
              Kembali
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">
                {mockStudents.length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Total Santri</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-indigo-600">
                {mockStudents.filter(s => s.todayStatus === "completed").length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Sudah Mengaji</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-600">
                {mockStudents.filter(s => s.todayStatus === "pending").length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Belum Mengaji</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600">
                18
              </div>
              <p className="text-sm text-gray-600 mt-1">Log Minggu Ini</p>
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Santri</CardTitle>
            <CardDescription>
              Klik santri untuk input progress mengaji hari ini
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockStudents.map(student => (
              <Card 
                key={student.id} 
                className="border-2 hover:border-blue-300 transition-all cursor-pointer"
                onClick={() => handleOpenInput(student)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        student.todayStatus === "completed" 
                          ? "bg-indigo-100 text-indigo-600" 
                          : "bg-orange-100 text-orange-600"
                      }`}>
                        {student.todayStatus === "completed" ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <BookMarked className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-base md:text-lg">
                          {student.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Iqro {student.currentJilid} - Halaman {student.currentPage}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {student.lastActivity}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Input Dialog */}
        <Dialog open={isInputOpen} onOpenChange={setIsInputOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Input Progress Mengaji</DialogTitle>
              <DialogDescription>
                {selectedStudent?.name} - Iqro {selectedStudent?.currentJilid} Hal {selectedStudent?.currentPage}
              </DialogDescription>
            </DialogHeader>

            <Tabs value={activeInputTab} onValueChange={setActiveInputTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bacaan">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Bacaan</span>
                </TabsTrigger>
                <TabsTrigger value="hafalan">
                  <Star className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Hafalan</span>
                </TabsTrigger>
                <TabsTrigger value="ibadah">
                  <Heart className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Ibadah</span>
                </TabsTrigger>
              </TabsList>

              {/* Bacaan Tab */}
              <TabsContent value="bacaan">
                <form onSubmit={handleSubmitBacaan} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Jenis Materi</Label>
                    <RadioGroup value={materialType} onValueChange={setMaterialType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="iqro" id="iqro" />
                        <Label htmlFor="iqro" className="font-normal cursor-pointer">Iqro</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="quran" id="quran" />
                        <Label htmlFor="quran" className="font-normal cursor-pointer">Al-Quran</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {materialType === "iqro" ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="jilid">Jilid</Label>
                          <Select value={jilid} onValueChange={setJilid}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih jilid" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1,2,3,4,5,6].map(j => (
                                <SelectItem key={j} value={j.toString()}>
                                  Jilid {j}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="start-page">Halaman</Label>
                          <Input
                            id="start-page"
                            type="number"
                            value={startPage}
                            onChange={(e) => setStartPage(e.target.value)}
                            placeholder="1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-page">Sampai Halaman (Opsional)</Label>
                        <Input
                          id="end-page"
                          type="number"
                          value={endPage}
                          onChange={(e) => setEndPage(e.target.value)}
                          placeholder="Kosongkan jika sama"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="juz">Juz</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih juz" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({length: 30}, (_, i) => i + 1).map(j => (
                              <SelectItem key={j} value={j.toString()}>
                                Juz {j}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="verse-from">Ayat Mulai</Label>
                          <Input id="verse-from" type="number" placeholder="1" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="verse-to">Ayat Akhir</Label>
                          <Input id="verse-to" type="number" placeholder="10" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Penilaian Kualitas</Label>
                    <RadioGroup value={qualityScore} onValueChange={setQualityScore}>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-indigo-50">
                          <RadioGroupItem value="A" id="score-a" />
                          <Label htmlFor="score-a" className="font-normal cursor-pointer flex-1">
                            <span className="font-bold text-indigo-600">A</span> - Sangat Baik
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-blue-50">
                          <RadioGroupItem value="B" id="score-b" />
                          <Label htmlFor="score-b" className="font-normal cursor-pointer flex-1">
                            <span className="font-bold text-blue-600">B</span> - Baik
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-yellow-50">
                          <RadioGroupItem value="C" id="score-c" />
                          <Label htmlFor="score-c" className="font-normal cursor-pointer flex-1">
                            <span className="font-bold text-yellow-600">C</span> - Cukup
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-red-50">
                          <RadioGroupItem value="D" id="score-d" />
                          <Label htmlFor="score-d" className="font-normal cursor-pointer flex-1">
                            <span className="font-bold text-red-600">D</span> - Perlu Ulang
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Catatan Khusus (Opsional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Contoh: Perhatikan makhraj huruf 'Ain dan Ghain'"
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base"
                  >
                    Simpan Progress Bacaan
                  </Button>
                </form>
              </TabsContent>

              {/* Hafalan Tab */}
              <TabsContent value="hafalan">
                <form onSubmit={handleSubmitHafalan} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Jenis Hafalan</Label>
                    <RadioGroup value={memorizationType} onValueChange={setMemorizationType}>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="ziyadah" id="ziyadah" />
                        <Label htmlFor="ziyadah" className="font-normal cursor-pointer flex-1">
                          <span className="font-bold">Ziyadah</span> - Setoran Baru
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="murajaah" id="murajaah" />
                        <Label htmlFor="murajaah" className="font-normal cursor-pointer flex-1">
                          <span className="font-bold">Murajaah</span> - Mengulang Hafalan
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="surah">Pilih Surah</Label>
                    <Select value={selectedSurah} onValueChange={setSelectedSurah}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih surah" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockSurahs.map(surah => (
                          <SelectItem key={surah.id} value={surah.id.toString()}>
                            {surah.name} ({surah.verses} ayat)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="verse-start">Ayat Mulai</Label>
                      <Input
                        id="verse-start"
                        type="number"
                        value={verseStart}
                        onChange={(e) => setVerseStart(e.target.value)}
                        placeholder="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="verse-end">Ayat Akhir</Label>
                      <Input
                        id="verse-end"
                        type="number"
                        value={verseEnd}
                        onChange={(e) => setVerseEnd(e.target.value)}
                        placeholder="7"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tingkat Kelancaran</Label>
                    <RadioGroup value={fluencyLevel} onValueChange={setFluencyLevel}>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-indigo-50">
                        <RadioGroupItem value="lancar" id="lancar" />
                        <Label htmlFor="lancar" className="font-normal cursor-pointer flex-1">
                          <span className="font-bold text-indigo-600">Lancar</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-yellow-50">
                        <RadioGroupItem value="terbata" id="terbata" />
                        <Label htmlFor="terbata" className="font-normal cursor-pointer flex-1">
                          <span className="font-bold text-yellow-600">Masih Terbata</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-red-50">
                        <RadioGroupItem value="ulang" id="ulang" />
                        <Label htmlFor="ulang" className="font-normal cursor-pointer flex-1">
                          <span className="font-bold text-red-600">Perlu Ulang</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hafalan-notes">Catatan (Opsional)</Label>
                    <Textarea
                      id="hafalan-notes"
                      value={hafalanNotes}
                      onChange={(e) => setHafalanNotes(e.target.value)}
                      placeholder="Catatan tentang hafalan..."
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-base"
                  >
                    Simpan Hafalan
                  </Button>
                </form>
              </TabsContent>

              {/* Ibadah Tab */}
              <TabsContent value="ibadah">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Doa Harian</Label>
                    <div className="space-y-2">
                      {mockDoas.map((doa, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <span className="text-sm">{doa}</span>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                              onClick={() => toast.success(`${doa} - Lulus dicatat!`)}
                            >
                              Lulus
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                              onClick={() => toast.info(`${doa} - Perbaikan dicatat!`)}
                            >
                              Perbaikan
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Bacaan Sholat</Label>
                    <div className="space-y-2">
                      {mockPrayerReadings.map((reading, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <span className="text-sm">{reading}</span>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                              onClick={() => toast.success(`${reading} - Lulus dicatat!`)}
                            >
                              Lulus
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                              onClick={() => toast.info(`${reading} - Perbaikan dicatat!`)}
                            >
                              Perbaikan
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}