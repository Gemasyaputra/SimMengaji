import { useState } from "react";
import { useNavigate } from "react-router";
import { BookOpen, Lock, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock users untuk demo
  const mockUsers = [
    { email: "superadmin@simmengaji.com", password: "admin123", role: "super_admin", name: "Super Admin" },
    { email: "admin@alikhlas.com", password: "admin123", role: "mosque_admin", name: "Admin Masjid Al-Ikhlas", mosqueId: 1 },
    { email: "budi@alikhlas.com", password: "guru123", role: "teacher", name: "Ustadz Budi", mosqueId: 1 },
    { email: "ortu@example.com", password: "ortu123", role: "parent", name: "Orang Tua Santri" }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        login(user);
        toast.success(`Selamat datang, ${user.name}!`);
        
        // Redirect based on role
        switch (user.role) {
          case "super_admin":
            navigate("/super-admin");
            break;
          case "mosque_admin":
            navigate("/admin");
            break;
          case "teacher":
            navigate("/teacher");
            break;
          case "parent":
            navigate("/report/al-ikhlas-jkt-rizky-ramadhan");
            break;
          default:
            navigate("/");
        }
      } else {
        toast.error("Email atau password salah!");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickLogin = (userEmail: string) => {
    const user = mockUsers.find(u => u.email === userEmail);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SimMengaji</h1>
          <p className="text-gray-600">Sistem Monitoring Mengaji</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Masuk ke akun Anda untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Login"}
              </Button>
            </form>

            {/* Demo Quick Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Akun</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-sm"
                  onClick={() => handleQuickLogin("admin@alikhlas.com")}
                >
                  <span className="mr-2">👨‍💼</span> Admin Masjid
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-sm"
                  onClick={() => handleQuickLogin("budi@alikhlas.com")}
                >
                  <span className="mr-2">👨‍🏫</span> Pengajar/Ustadz
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-sm"
                  onClick={() => handleQuickLogin("ortu@example.com")}
                >
                  <span className="mr-2">👨‍👩‍👧</span> Orang Tua
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          © 2026 SimMengaji. Platform Monitoring Mengaji Digital
        </p>
      </div>
    </div>
  );
}
