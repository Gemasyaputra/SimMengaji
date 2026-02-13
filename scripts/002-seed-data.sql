-- Seed data for SimMengaji app

-- Insert mosque
INSERT INTO mosques (id, name, address, logo_url) VALUES
  (1, 'Masjid Al-Ikhlas', 'Jl. Raya No. 1, Kota Bandung', NULL)
ON CONFLICT (id) DO NOTHING;

-- Insert users (admin, teachers, parents)
-- Using emails that would match Google SSO
INSERT INTO users (id, name, email, role, avatar_url, mosque_id) VALUES
  (1, 'Ahmad Fauzi', 'admin@simmengaji.com', 'admin', NULL, 1),
  (2, 'Ustadz Rahmat', 'ustadz.rahmat@simmengaji.com', 'teacher', NULL, 1),
  (3, 'Ustadzah Siti', 'ustadzah.siti@simmengaji.com', 'teacher', NULL, 1),
  (4, 'Budi Santoso', 'budi.santoso@simmengaji.com', 'parent', NULL, 1),
  (5, 'Dewi Lestari', 'dewi.lestari@simmengaji.com', 'parent', NULL, 1)
ON CONFLICT (id) DO NOTHING;

-- Insert halaqah (study groups)
INSERT INTO halaqah (id, name, teacher_id, mosque_id, schedule) VALUES
  (1, 'Halaqah Al-Fatihah', 2, 1, 'Senin & Kamis, 16:00-17:30'),
  (2, 'Halaqah An-Naba', 3, 1, 'Selasa & Jumat, 16:00-17:30'),
  (3, 'Halaqah Al-Baqarah', 2, 1, 'Rabu & Sabtu, 08:00-09:30')
ON CONFLICT (id) DO NOTHING;

-- Insert students
INSERT INTO students (id, name, parent_id, halaqah_id, mosque_id, date_of_birth, enrollment_date, status) VALUES
  (1, 'Muhammad Rizki', 4, 1, 1, '2015-03-15', '2024-01-10', 'active'),
  (2, 'Aisyah Putri', 4, 2, 1, '2016-07-22', '2024-01-10', 'active'),
  (3, 'Fatimah Zahra', 5, 1, 1, '2015-11-05', '2024-02-01', 'active'),
  (4, 'Umar Hadi', 5, 2, 1, '2014-09-18', '2024-01-15', 'active'),
  (5, 'Khadijah Amira', 5, 3, 1, '2016-01-30', '2024-03-01', 'active'),
  (6, 'Ali Rahman', 4, 3, 1, '2015-06-12', '2024-02-15', 'active'),
  (7, 'Zainab Husna', 4, 1, 1, '2017-04-08', '2024-04-01', 'active'),
  (8, 'Hasan Basri', 5, 2, 1, '2016-12-25', '2024-01-20', 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert bacaan_records (Quran reading records)
INSERT INTO bacaan_records (student_id, teacher_id, surah_name, ayat_from, ayat_to, score, notes, record_date) VALUES
  -- Muhammad Rizki records
  (1, 2, 'Al-Fatihah', 1, 7, 'A', 'Bacaan lancar, tajwid baik', '2025-01-15'),
  (1, 2, 'Al-Baqarah', 1, 5, 'A-', 'Perlu perbaikan mad', '2025-01-20'),
  (1, 2, 'Al-Baqarah', 6, 10, 'B+', 'Tajwid cukup baik', '2025-01-27'),
  (1, 2, 'Al-Baqarah', 11, 20, 'A', 'Sangat baik', '2025-02-03'),
  (1, 2, 'Al-Baqarah', 21, 25, 'A-', 'Lancar', '2025-02-10'),
  (1, 2, 'Ali Imran', 1, 10, 'B+', 'Perlu latihan lagi', '2025-02-17'),
  (1, 2, 'Ali Imran', 11, 20, 'A', 'Excellent', '2025-02-24'),
  (1, 2, 'An-Nisa', 1, 5, 'A', 'Bacaan sangat baik', '2025-03-03'),
  -- Aisyah Putri records
  (2, 3, 'Al-Fatihah', 1, 7, 'A', 'Sangat lancar', '2025-01-14'),
  (2, 3, 'An-Nas', 1, 6, 'A', 'Hafalan sempurna', '2025-01-21'),
  (2, 3, 'Al-Falaq', 1, 5, 'A-', 'Baik', '2025-01-28'),
  (2, 3, 'Al-Ikhlas', 1, 4, 'A', 'Sempurna', '2025-02-04'),
  (2, 3, 'Al-Lahab', 1, 5, 'B+', 'Cukup baik', '2025-02-11'),
  (2, 3, 'An-Nasr', 1, 3, 'A', 'Lancar', '2025-02-18'),
  -- Fatimah Zahra records
  (3, 2, 'Al-Fatihah', 1, 7, 'A', 'Sangat baik', '2025-01-16'),
  (3, 2, 'Al-Baqarah', 1, 10, 'B+', 'Perlu latihan tajwid', '2025-01-23'),
  (3, 2, 'Al-Baqarah', 11, 20, 'A-', 'Meningkat', '2025-02-06'),
  (3, 2, 'Al-Baqarah', 21, 30, 'A', 'Sangat baik', '2025-02-13'),
  -- Umar Hadi records
  (4, 3, 'Al-Fatihah', 1, 7, 'A', 'Lancar', '2025-01-15'),
  (4, 3, 'Al-Baqarah', 1, 15, 'A-', 'Baik', '2025-01-22'),
  (4, 3, 'Al-Baqarah', 16, 30, 'B+', 'Cukup', '2025-02-05'),
  (4, 3, 'Ali Imran', 1, 10, 'A', 'Meningkat pesat', '2025-02-19'),
  (4, 3, 'Ali Imran', 11, 25, 'A', 'Excellent', '2025-03-05'),
  -- Khadijah Amira records
  (5, 2, 'Al-Fatihah', 1, 7, 'A', 'Bagus', '2025-03-05'),
  (5, 2, 'An-Nas', 1, 6, 'B+', 'Cukup baik', '2025-03-12'),
  -- Ali Rahman records
  (6, 2, 'Al-Fatihah', 1, 7, 'A-', 'Baik', '2025-02-20'),
  (6, 2, 'Al-Baqarah', 1, 5, 'B+', 'Perlu latihan', '2025-02-27'),
  (6, 2, 'Al-Baqarah', 6, 15, 'A', 'Meningkat', '2025-03-06'),
  -- Zainab Husna records
  (7, 2, 'Al-Fatihah', 1, 7, 'A', 'Sangat lancar', '2025-04-05'),
  (7, 2, 'An-Nas', 1, 6, 'A', 'Bagus', '2025-04-12'),
  -- Hasan Basri records
  (8, 3, 'Al-Fatihah', 1, 7, 'B+', 'Cukup', '2025-01-22'),
  (8, 3, 'An-Nas', 1, 6, 'A-', 'Meningkat', '2025-02-05'),
  (8, 3, 'Al-Falaq', 1, 5, 'A', 'Bagus', '2025-02-19');

-- Insert hafalan_records (memorization records)
INSERT INTO hafalan_records (student_id, teacher_id, surah_name, ayat_from, ayat_to, status, score, notes, record_date) VALUES
  (1, 2, 'Al-Fatihah', 1, 7, 'memorized', 'A', 'Hafal sempurna', '2025-01-20'),
  (1, 2, 'An-Nas', 1, 6, 'memorized', 'A', 'Lancar', '2025-02-03'),
  (1, 2, 'Al-Falaq', 1, 5, 'memorized', 'A-', 'Baik', '2025-02-17'),
  (1, 2, 'Al-Ikhlas', 1, 4, 'memorized', 'A', 'Sempurna', '2025-03-03'),
  (1, 2, 'Al-Lahab', 1, 5, 'in_progress', 'B+', 'Sedang proses', '2025-03-10'),
  (2, 3, 'Al-Fatihah', 1, 7, 'memorized', 'A', 'Hafal sempurna', '2025-01-21'),
  (2, 3, 'An-Nas', 1, 6, 'memorized', 'A', 'Sangat baik', '2025-02-04'),
  (2, 3, 'Al-Falaq', 1, 5, 'memorized', 'A', 'Sempurna', '2025-02-18'),
  (2, 3, 'Al-Ikhlas', 1, 4, 'memorized', 'A', 'Lancar', '2025-03-04'),
  (2, 3, 'Al-Lahab', 1, 5, 'memorized', 'A-', 'Baik', '2025-03-18'),
  (2, 3, 'An-Nasr', 1, 3, 'memorized', 'A', 'Excellent', '2025-04-01'),
  (3, 2, 'Al-Fatihah', 1, 7, 'memorized', 'A', 'Hafal', '2025-01-23'),
  (3, 2, 'An-Nas', 1, 6, 'memorized', 'A-', 'Baik', '2025-02-13'),
  (3, 2, 'Al-Falaq', 1, 5, 'in_progress', 'B+', 'Proses', '2025-03-06'),
  (4, 3, 'Al-Fatihah', 1, 7, 'memorized', 'A', 'Lancar', '2025-01-22'),
  (4, 3, 'An-Nas', 1, 6, 'memorized', 'A', 'Baik', '2025-02-05'),
  (4, 3, 'Al-Falaq', 1, 5, 'memorized', 'A-', 'Cukup', '2025-02-19'),
  (4, 3, 'Al-Ikhlas', 1, 4, 'memorized', 'A', 'Sempurna', '2025-03-05'),
  (5, 2, 'Al-Fatihah', 1, 7, 'memorized', 'A', 'Bagus', '2025-03-12'),
  (6, 2, 'Al-Fatihah', 1, 7, 'memorized', 'A-', 'Hafal', '2025-02-27'),
  (6, 2, 'An-Nas', 1, 6, 'in_progress', 'B+', 'Proses', '2025-03-13'),
  (7, 2, 'Al-Fatihah', 1, 7, 'memorized', 'A', 'Lancar', '2025-04-12'),
  (8, 3, 'Al-Fatihah', 1, 7, 'memorized', 'B+', 'Cukup baik', '2025-02-05'),
  (8, 3, 'An-Nas', 1, 6, 'memorized', 'A-', 'Meningkat', '2025-02-26');

-- Insert ibadah_records (worship practice records)
INSERT INTO ibadah_records (student_id, teacher_id, ibadah_type, detail, score, notes, record_date) VALUES
  (1, 2, 'shalat', 'Shalat Dzuhur - Gerakan dan bacaan', 'A', 'Gerakan sempurna', '2025-01-18'),
  (1, 2, 'shalat', 'Shalat Ashar - Praktik lengkap', 'A', 'Sangat baik', '2025-02-01'),
  (1, 2, 'wudhu', 'Praktik wudhu lengkap', 'A-', 'Urutan benar', '2025-02-15'),
  (1, 2, 'doa', 'Doa sebelum makan', 'A', 'Hafal lancar', '2025-03-01'),
  (1, 2, 'adzan', 'Praktik adzan', 'B+', 'Cukup baik', '2025-03-08'),
  (2, 3, 'shalat', 'Shalat Maghrib - Praktik', 'A', 'Gerakan benar', '2025-01-20'),
  (2, 3, 'wudhu', 'Wudhu lengkap', 'A', 'Sempurna', '2025-02-03'),
  (2, 3, 'doa', 'Doa sebelum tidur', 'A', 'Hafal', '2025-02-17'),
  (2, 3, 'doa', 'Doa masuk masjid', 'A-', 'Baik', '2025-03-03'),
  (3, 2, 'shalat', 'Shalat Subuh', 'A-', 'Baik', '2025-01-25'),
  (3, 2, 'wudhu', 'Praktik wudhu', 'A', 'Benar', '2025-02-08'),
  (3, 2, 'doa', 'Doa keluar rumah', 'B+', 'Cukup', '2025-02-22'),
  (4, 3, 'shalat', 'Shalat Isya', 'A', 'Sempurna', '2025-01-28'),
  (4, 3, 'wudhu', 'Wudhu', 'A', 'Baik', '2025-02-11'),
  (4, 3, 'doa', 'Doa setelah shalat', 'A', 'Lancar', '2025-02-25'),
  (4, 3, 'shalat', 'Shalat Dhuha', 'A-', 'Baik', '2025-03-11'),
  (5, 2, 'shalat', 'Shalat Dzuhur', 'A', 'Bagus', '2025-03-15'),
  (5, 2, 'wudhu', 'Wudhu', 'B+', 'Cukup', '2025-03-22'),
  (6, 2, 'shalat', 'Shalat Ashar', 'A-', 'Baik', '2025-03-01'),
  (6, 2, 'doa', 'Doa makan', 'A', 'Lancar', '2025-03-08'),
  (7, 2, 'shalat', 'Shalat Maghrib', 'A', 'Sempurna', '2025-04-10'),
  (8, 3, 'shalat', 'Shalat Subuh', 'B+', 'Cukup', '2025-02-08'),
  (8, 3, 'wudhu', 'Wudhu', 'A-', 'Baik', '2025-02-22');

-- Insert attendance_records
INSERT INTO attendance_records (student_id, halaqah_id, attendance_date, status, notes) VALUES
  -- Muhammad Rizki - mostly present
  (1, 1, '2025-01-13', 'present', NULL), (1, 1, '2025-01-16', 'present', NULL),
  (1, 1, '2025-01-20', 'present', NULL), (1, 1, '2025-01-23', 'present', NULL),
  (1, 1, '2025-01-27', 'present', NULL), (1, 1, '2025-01-30', 'present', NULL),
  (1, 1, '2025-02-03', 'present', NULL), (1, 1, '2025-02-06', 'absent', 'Sakit'),
  (1, 1, '2025-02-10', 'present', NULL), (1, 1, '2025-02-13', 'present', NULL),
  (1, 1, '2025-02-17', 'present', NULL), (1, 1, '2025-02-20', 'present', NULL),
  (1, 1, '2025-02-24', 'present', NULL), (1, 1, '2025-02-27', 'present', NULL),
  (1, 1, '2025-03-03', 'present', NULL), (1, 1, '2025-03-06', 'late', 'Terlambat 10 menit'),
  -- Aisyah Putri
  (2, 2, '2025-01-14', 'present', NULL), (2, 2, '2025-01-17', 'present', NULL),
  (2, 2, '2025-01-21', 'present', NULL), (2, 2, '2025-01-24', 'present', NULL),
  (2, 2, '2025-01-28', 'present', NULL), (2, 2, '2025-01-31', 'present', NULL),
  (2, 2, '2025-02-04', 'present', NULL), (2, 2, '2025-02-07', 'present', NULL),
  (2, 2, '2025-02-11', 'absent', 'Izin keluarga'), (2, 2, '2025-02-14', 'present', NULL),
  (2, 2, '2025-02-18', 'present', NULL), (2, 2, '2025-02-21', 'present', NULL),
  (2, 2, '2025-02-25', 'present', NULL), (2, 2, '2025-02-28', 'present', NULL),
  -- Fatimah Zahra
  (3, 1, '2025-01-13', 'present', NULL), (3, 1, '2025-01-16', 'present', NULL),
  (3, 1, '2025-01-20', 'present', NULL), (3, 1, '2025-01-23', 'absent', 'Sakit'),
  (3, 1, '2025-01-27', 'present', NULL), (3, 1, '2025-01-30', 'present', NULL),
  (3, 1, '2025-02-03', 'present', NULL), (3, 1, '2025-02-06', 'present', NULL),
  (3, 1, '2025-02-10', 'present', NULL), (3, 1, '2025-02-13', 'present', NULL),
  -- Umar Hadi
  (4, 2, '2025-01-14', 'present', NULL), (4, 2, '2025-01-17', 'present', NULL),
  (4, 2, '2025-01-21', 'present', NULL), (4, 2, '2025-01-24', 'present', NULL),
  (4, 2, '2025-01-28', 'present', NULL), (4, 2, '2025-01-31', 'late', 'Terlambat'),
  (4, 2, '2025-02-04', 'present', NULL), (4, 2, '2025-02-07', 'present', NULL),
  (4, 2, '2025-02-11', 'present', NULL), (4, 2, '2025-02-14', 'present', NULL),
  (4, 2, '2025-02-18', 'present', NULL), (4, 2, '2025-02-21', 'present', NULL),
  (4, 2, '2025-02-25', 'present', NULL), (4, 2, '2025-02-28', 'absent', 'Izin'),
  -- Others - smaller attendance sets
  (5, 3, '2025-03-05', 'present', NULL), (5, 3, '2025-03-08', 'present', NULL),
  (5, 3, '2025-03-12', 'present', NULL), (5, 3, '2025-03-15', 'present', NULL),
  (5, 3, '2025-03-19', 'present', NULL), (5, 3, '2025-03-22', 'absent', 'Sakit'),
  (6, 3, '2025-02-19', 'present', NULL), (6, 3, '2025-02-22', 'present', NULL),
  (6, 3, '2025-02-26', 'present', NULL), (6, 3, '2025-03-01', 'present', NULL),
  (6, 3, '2025-03-05', 'present', NULL), (6, 3, '2025-03-08', 'present', NULL),
  (7, 1, '2025-04-03', 'present', NULL), (7, 1, '2025-04-07', 'present', NULL),
  (7, 1, '2025-04-10', 'present', NULL), (7, 1, '2025-04-14', 'present', NULL),
  (8, 2, '2025-01-21', 'present', NULL), (8, 2, '2025-01-24', 'present', NULL),
  (8, 2, '2025-01-28', 'present', NULL), (8, 2, '2025-01-31', 'present', NULL),
  (8, 2, '2025-02-04', 'absent', 'Sakit'), (8, 2, '2025-02-07', 'present', NULL),
  (8, 2, '2025-02-11', 'present', NULL), (8, 2, '2025-02-14', 'present', NULL);

-- Insert achievements
INSERT INTO achievements (student_id, title, description, badge_type, awarded_date) VALUES
  (1, 'Khatam Juz 30', 'Menyelesaikan bacaan seluruh Juz 30', 'gold', '2025-02-28'),
  (1, 'Rajin Mengaji', 'Hadir 15 kali berturut-turut tanpa absen', 'silver', '2025-02-20'),
  (1, 'Hafiz Cilik', 'Menghafal 4 surah pendek dengan lancar', 'gold', '2025-03-03'),
  (2, 'Bintang Hafalan', 'Menghafal 6 surah pendek dengan sempurna', 'gold', '2025-04-01'),
  (2, 'Rajin Mengaji', 'Hadir 14 kali berturut-turut', 'silver', '2025-02-25'),
  (2, 'Teladan Ibadah', 'Praktik ibadah selalu mendapat nilai A', 'bronze', '2025-03-03'),
  (3, 'Peningkatan Terbaik', 'Nilai meningkat konsisten selama 3 bulan', 'silver', '2025-02-13'),
  (4, 'Rajin Mengaji', 'Kehadiran konsisten', 'silver', '2025-02-25'),
  (4, 'Hafiz Cilik', 'Menghafal 4 surah pendek', 'gold', '2025-03-05'),
  (6, 'Peningkatan Terbaik', 'Nilai bacaan meningkat pesat', 'bronze', '2025-03-06');

-- Insert documentations
INSERT INTO documentations (title, description, image_url, event_date, mosque_id, created_by) VALUES
  ('Wisuda Tahfidz Semester 1', 'Acara wisuda tahfidz untuk santri yang telah menyelesaikan target hafalan semester pertama.', '/images/wisuda.jpg', '2025-02-15', 1, 1),
  ('Lomba Tartil Quran', 'Perlombaan tartil Al-Quran antar halaqah dalam rangka memperingati Nuzulul Quran.', '/images/lomba.jpg', '2025-03-17', 1, 1),
  ('Kunjungan Orang Tua', 'Acara pertemuan orang tua santri untuk membahas perkembangan belajar anak.', '/images/kunjungan.jpg', '2025-01-25', 1, 1),
  ('Peringatan Isra Miraj', 'Peringatan Isra Miraj 1446 H dengan ceramah dan penampilan santri.', '/images/isra-miraj.jpg', '2025-01-27', 1, 1),
  ('Buka Puasa Bersama', 'Acara buka puasa bersama seluruh santri, pengajar, dan orang tua.', '/images/bukber.jpg', '2025-03-15', 1, 1);

-- Reset sequences
SELECT setval('mosques_id_seq', (SELECT MAX(id) FROM mosques));
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('halaqah_id_seq', (SELECT MAX(id) FROM halaqah));
SELECT setval('students_id_seq', (SELECT MAX(id) FROM students));
SELECT setval('achievements_id_seq', (SELECT MAX(id) FROM achievements));
SELECT setval('documentations_id_seq', (SELECT MAX(id) FROM documentations));
