import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { Home, Calendar, Camera, Share2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { toast } from "sonner";

// Mock data
const mockDocumentations: {[key: string]: any} = {
  "kegiatan-ramadhan-2026": {
    id: 1,
    title: "Kegiatan Ramadhan 2026",
    description: "Dokumentasi kegiatan mengaji dan tadarus selama bulan Ramadhan 2026. Alhamdulillah kegiatan berjalan lancar dengan antusiasme santri yang tinggi.",
    slug: "kegiatan-ramadhan-2026",
    mosque: "Masjid Al-Ikhlas",
    photoUrls: [
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200",
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200",
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200"
    ],
    createdAt: "10 Feb 2026"
  },
  "wisuda-tahfidz-angkatan-5": {
    id: 2,
    title: "Wisuda Tahfidz Angkatan 5",
    description: "Pelepasan santri yang telah menyelesaikan program tahfidz juz 30. Selamat kepada para santri yang telah berhasil menyelesaikan hafalan.",
    slug: "wisuda-tahfidz-angkatan-5",
    mosque: "Masjid Al-Ikhlas",
    photoUrls: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200"
    ],
    createdAt: "5 Feb 2026"
  },
  "tahun-baru-islam-1448": {
    id: 3,
    title: "Perayaan Tahun Baru Islam 1448 H",
    description: "Kegiatan peringatan tahun baru Islam dengan santri dan pengajar. Diadakan dengan meriah dan penuh kekhusyukan.",
    slug: "tahun-baru-islam-1448",
    mosque: "Masjid Al-Ikhlas",
    photoUrls: [
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=1200"
    ],
    createdAt: "1 Feb 2026"
  }
};

export default function DocumentationDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  const documentation = mockDocumentations[slug || ""];

  if (!documentation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Dokumentasi tidak ditemukan</p>
            <Button onClick={() => navigate("/admin")}>
              Kembali ke Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleShare = () => {
    const text = `Dokumentasi: ${documentation.title} - ${documentation.mosque}`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: documentation.title,
        text: text,
        url: url
      }).catch(() => {
        window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`, '_blank');
      });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`, '_blank');
    }
    toast.success("Membuka WhatsApp...");
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < documentation.photoUrls.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/admin")}
              >
                <Home className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Dokumentasi</h1>
                <p className="text-sm text-gray-600">{documentation.mosque}</p>
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

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Title Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl md:text-3xl mb-2">
                  {documentation.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {documentation.description}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{documentation.createdAt}</span>
              </div>
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                {documentation.photoUrls.length} Foto
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Photo Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentation.photoUrls.map((url: string, index: number) => (
            <Card 
              key={index} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
              onClick={() => setSelectedImageIndex(index)}
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src={url}
                  alt={`${documentation.title} - Foto ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  {index + 1} / {documentation.photoUrls.length}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {documentation.photoUrls.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Belum ada foto untuk dokumentasi ini</p>
            </CardContent>
          </Card>
        )}

        {/* Share CTA */}
        <Card className="mt-6 bg-gradient-to-br from-indigo-600 to-indigo-700 border-0 text-white">
          <CardContent className="py-8 text-center">
            <Share2 className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-xl font-bold mb-2">Bagikan Dokumentasi Ini</h3>
            <p className="text-indigo-100 mb-6 max-w-md mx-auto">
              Sebarkan momen indah kegiatan masjid ke keluarga dan jamaah
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

      {/* Lightbox Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={() => setSelectedImageIndex(null)}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            {selectedImageIndex !== null && selectedImageIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 z-50 text-white hover:bg-white/20"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
            )}

            {selectedImageIndex !== null && selectedImageIndex < documentation.photoUrls.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 z-50 text-white hover:bg-white/20"
                onClick={handleNextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            )}

            {/* Image */}
            {selectedImageIndex !== null && (
              <div className="w-full h-full flex items-center justify-center p-4">
                <img
                  src={documentation.photoUrls[selectedImageIndex]}
                  alt={`${documentation.title} - Foto ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg">
                  {selectedImageIndex + 1} / {documentation.photoUrls.length}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}