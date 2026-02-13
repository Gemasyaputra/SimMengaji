-- Seed data for SimMengaji app
-- Matches schema from 001-create-tables.sql exactly

-- Insert mosque
INSERT INTO mosques (id, name, address, slug) VALUES
  (1, 'Masjid Al-Ikhlas', 'Jl. Raya No. 1, Kota Bandung', 'masjid-al-ikhlas')
ON CONFLICT (id) DO NOTHING;

-- Insert users (admin & teachers)
INSERT INTO users (id, mosque_id, full_name, email, password_hash, role, phone_number, avatar_url) VALUES
  (1, 1, 'Ahmad Fauzi', 'admin@simmengaji.com', '', 'admin', '081234567890', NULL),
  (2, 1, 'Ustadz Rahmat', 'ustadz.rahmat@simmengaji.com', '', 'teacher', '081234567891', NULL),
  (3, 1, 'Ustadzah Siti', 'ustadzah.siti@simmengaji.com', '', 'teacher', '081234567892', NULL)
ON CONFLICT (id) DO NOTHING;

-- Insert master surahs
INSERT INTO master_surahs (id, surah_name, total_verses, surah_order) VALUES
  (1, 'Al-Fatihah', 7, 1),
  (2, 'Al-Baqarah', 286, 2),
  (3, 'Ali Imran', 200, 3),
  (4, 'An-Nisa', 176, 4),
  (5, 'An-Nas', 6, 114),
  (6, 'Al-Falaq', 5, 113),
  (7, 'Al-Ikhlas', 4, 112),
  (8, 'Al-Lahab', 5, 111),
  (9, 'An-Nasr', 3, 110),
  (10, 'Al-Kafirun', 6, 109),
  (11, 'Al-Kautsar', 3, 108),
  (12, 'Al-Maun', 7, 107),
  (13, 'Quraisy', 4, 106),
  (14, 'Al-Fil', 5, 105),
  (15, 'Al-Humazah', 9, 104)
ON CONFLICT (id) DO NOTHING;

-- Insert master daily doas
INSERT INTO master_daily_doas (id, title, category) VALUES
  (1, 'Doa Sebelum Makan', 'makan'),
  (2, 'Doa Sesudah Makan', 'makan'),
  (3, 'Doa Sebelum Tidur', 'tidur'),
  (4, 'Doa Bangun Tidur', 'tidur'),
  (5, 'Doa Masuk Masjid', 'masjid'),
  (6, 'Doa Keluar Masjid', 'masjid'),
  (7, 'Doa Keluar Rumah', 'harian'),
  (8, 'Doa Masuk Kamar Mandi', 'harian'),
  (9, 'Doa Kedua Orang Tua', 'harian'),
  (10, 'Doa Setelah Adzan', 'shalat')
ON CONFLICT (id) DO NOTHING;

-- Insert master prayer readings
INSERT INTO master_prayer_readings (id, title, step_order) VALUES
  (1, 'Niat Shalat', 1),
  (2, 'Takbiratul Ihram', 2),
  (3, 'Doa Iftitah', 3),
  (4, 'Surah Al-Fatihah', 4),
  (5, 'Bacaan Ruku', 5),
  (6, 'Bacaan Iktidal', 6),
  (7, 'Bacaan Sujud', 7),
  (8, 'Bacaan Duduk Antara Dua Sujud', 8),
  (9, 'Tasyahud Awal', 9),
  (10, 'Tasyahud Akhir', 10),
  (11, 'Salam', 11)
ON CONFLICT (id) DO NOTHING;

-- Insert students
INSERT INTO students (id, mosque_id, assigned_teacher_id, full_name, parent_phone, student_slug, current_jilid, current_page) VALUES
  (1, 1, 2, 'Muhammad Rizki', '081300000001', 'muhammad-rizki-1', '3', 45),
  (2, 1, 3, 'Aisyah Putri', '081300000002', 'aisyah-putri-2', '2', 30),
  (3, 1, 2, 'Fatimah Zahra', '081300000003', 'fatimah-zahra-3', '3', 20),
  (4, 1, 3, 'Umar Hadi', '081300000004', 'umar-hadi-4', '4', 10),
  (5, 1, 2, 'Khadijah Amira', '081300000005', 'khadijah-amira-5', '1', 15),
  (6, 1, 2, 'Ali Rahman', '081300000006', 'ali-rahman-6', '2', 25),
  (7, 1, 2, 'Zainab Husna', '081300000007', 'zainab-husna-7', '1', 8),
  (8, 1, 3, 'Hasan Basri', '081300000008', 'hasan-basri-8', '2', 18)
ON CONFLICT (id) DO NOTHING;

-- Insert reading_logs (Iqro / Al-Quran reading records)
INSERT INTO reading_logs (mosque_id, student_id, teacher_id, date, material_type, volume_info, start_point, end_point, quality_score, notes) VALUES
  -- Muhammad Rizki (student 1, teacher 2)
  (1, 1, 2, '2025-01-15', 'iqro', 'Jilid 3', '1', '5', 'A', 'Bacaan lancar, tajwid baik'),
  (1, 1, 2, '2025-01-20', 'iqro', 'Jilid 3', '6', '10', 'A-', 'Perlu perbaikan mad'),
  (1, 1, 2, '2025-01-27', 'iqro', 'Jilid 3', '11', '15', 'B+', 'Tajwid cukup baik'),
  (1, 1, 2, '2025-02-03', 'iqro', 'Jilid 3', '16', '20', 'A', 'Sangat baik'),
  (1, 1, 2, '2025-02-10', 'iqro', 'Jilid 3', '21', '25', 'A-', 'Lancar'),
  (1, 1, 2, '2025-02-17', 'iqro', 'Jilid 3', '26', '30', 'B+', 'Perlu latihan lagi'),
  (1, 1, 2, '2025-02-24', 'iqro', 'Jilid 3', '31', '35', 'A', 'Excellent'),
  (1, 1, 2, '2025-03-03', 'quran', 'Al-Fatihah', '1', '7', 'A', 'Bacaan sangat baik'),
  -- Aisyah Putri (student 2, teacher 3)
  (1, 2, 3, '2025-01-14', 'iqro', 'Jilid 2', '1', '5', 'A', 'Sangat lancar'),
  (1, 2, 3, '2025-01-21', 'iqro', 'Jilid 2', '6', '10', 'A', 'Hafalan sempurna'),
  (1, 2, 3, '2025-01-28', 'iqro', 'Jilid 2', '11', '15', 'A-', 'Baik'),
  (1, 2, 3, '2025-02-04', 'iqro', 'Jilid 2', '16', '20', 'A', 'Sempurna'),
  (1, 2, 3, '2025-02-11', 'iqro', 'Jilid 2', '21', '25', 'B+', 'Cukup baik'),
  (1, 2, 3, '2025-02-18', 'iqro', 'Jilid 2', '26', '30', 'A', 'Lancar'),
  -- Fatimah Zahra (student 3, teacher 2)
  (1, 3, 2, '2025-01-16', 'iqro', 'Jilid 3', '1', '5', 'A', 'Sangat baik'),
  (1, 3, 2, '2025-01-23', 'iqro', 'Jilid 3', '6', '10', 'B+', 'Perlu latihan tajwid'),
  (1, 3, 2, '2025-02-06', 'iqro', 'Jilid 3', '11', '15', 'A-', 'Meningkat'),
  (1, 3, 2, '2025-02-13', 'iqro', 'Jilid 3', '16', '20', 'A', 'Sangat baik'),
  -- Umar Hadi (student 4, teacher 3)
  (1, 4, 3, '2025-01-15', 'quran', 'Al-Fatihah', '1', '7', 'A', 'Lancar'),
  (1, 4, 3, '2025-01-22', 'quran', 'Al-Baqarah', '1', '5', 'A-', 'Baik'),
  (1, 4, 3, '2025-02-05', 'quran', 'Al-Baqarah', '6', '10', 'B+', 'Cukup'),
  (1, 4, 3, '2025-02-19', 'quran', 'Ali Imran', '1', '5', 'A', 'Meningkat pesat'),
  (1, 4, 3, '2025-03-05', 'quran', 'Ali Imran', '6', '10', 'A', 'Excellent'),
  -- Khadijah, Ali, Zainab, Hasan
  (1, 5, 2, '2025-03-05', 'iqro', 'Jilid 1', '1', '5', 'A', 'Bagus'),
  (1, 5, 2, '2025-03-12', 'iqro', 'Jilid 1', '6', '10', 'B+', 'Cukup baik'),
  (1, 6, 2, '2025-02-20', 'iqro', 'Jilid 2', '1', '5', 'A-', 'Baik'),
  (1, 6, 2, '2025-02-27', 'iqro', 'Jilid 2', '6', '10', 'B+', 'Perlu latihan'),
  (1, 6, 2, '2025-03-06', 'iqro', 'Jilid 2', '11', '15', 'A', 'Meningkat'),
  (1, 7, 2, '2025-04-05', 'iqro', 'Jilid 1', '1', '3', 'A', 'Sangat lancar'),
  (1, 7, 2, '2025-04-12', 'iqro', 'Jilid 1', '4', '8', 'A', 'Bagus'),
  (1, 8, 3, '2025-01-22', 'iqro', 'Jilid 2', '1', '5', 'B+', 'Cukup'),
  (1, 8, 3, '2025-02-05', 'iqro', 'Jilid 2', '6', '10', 'A-', 'Meningkat'),
  (1, 8, 3, '2025-02-19', 'iqro', 'Jilid 2', '11', '18', 'A', 'Bagus');

-- Insert memorization_logs (Tahfidz)
INSERT INTO memorization_logs (mosque_id, student_id, teacher_id, surah_id, verse_start, verse_end, memorization_type, fluency_level, notes, date) VALUES
  -- Muhammad Rizki
  (1, 1, 2, 1, 1, 7, 'setoran_baru', 'lancar', 'Hafal sempurna', '2025-01-20'),
  (1, 1, 2, 5, 1, 6, 'setoran_baru', 'lancar', 'Lancar', '2025-02-03'),
  (1, 1, 2, 6, 1, 5, 'setoran_baru', 'cukup_lancar', 'Baik', '2025-02-17'),
  (1, 1, 2, 7, 1, 4, 'setoran_baru', 'lancar', 'Sempurna', '2025-03-03'),
  (1, 1, 2, 8, 1, 5, 'muroja_ah', 'kurang_lancar', 'Sedang proses', '2025-03-10'),
  -- Aisyah Putri
  (1, 2, 3, 1, 1, 7, 'setoran_baru', 'lancar', 'Hafal sempurna', '2025-01-21'),
  (1, 2, 3, 5, 1, 6, 'setoran_baru', 'lancar', 'Sangat baik', '2025-02-04'),
  (1, 2, 3, 6, 1, 5, 'setoran_baru', 'lancar', 'Sempurna', '2025-02-18'),
  (1, 2, 3, 7, 1, 4, 'setoran_baru', 'lancar', 'Lancar', '2025-03-04'),
  (1, 2, 3, 8, 1, 5, 'setoran_baru', 'cukup_lancar', 'Baik', '2025-03-18'),
  (1, 2, 3, 9, 1, 3, 'setoran_baru', 'lancar', 'Excellent', '2025-04-01'),
  -- Fatimah Zahra
  (1, 3, 2, 1, 1, 7, 'setoran_baru', 'lancar', 'Hafal', '2025-01-23'),
  (1, 3, 2, 5, 1, 6, 'setoran_baru', 'cukup_lancar', 'Baik', '2025-02-13'),
  (1, 3, 2, 6, 1, 5, 'muroja_ah', 'kurang_lancar', 'Proses', '2025-03-06'),
  -- Umar Hadi
  (1, 4, 3, 1, 1, 7, 'setoran_baru', 'lancar', 'Lancar', '2025-01-22'),
  (1, 4, 3, 5, 1, 6, 'setoran_baru', 'lancar', 'Baik', '2025-02-05'),
  (1, 4, 3, 6, 1, 5, 'setoran_baru', 'cukup_lancar', 'Cukup', '2025-02-19'),
  (1, 4, 3, 7, 1, 4, 'setoran_baru', 'lancar', 'Sempurna', '2025-03-05'),
  -- Others
  (1, 5, 2, 1, 1, 7, 'setoran_baru', 'lancar', 'Bagus', '2025-03-12'),
  (1, 6, 2, 1, 1, 7, 'setoran_baru', 'cukup_lancar', 'Hafal', '2025-02-27'),
  (1, 6, 2, 5, 1, 6, 'muroja_ah', 'kurang_lancar', 'Proses', '2025-03-13'),
  (1, 7, 2, 1, 1, 7, 'setoran_baru', 'lancar', 'Lancar', '2025-04-12'),
  (1, 8, 3, 1, 1, 7, 'setoran_baru', 'cukup_lancar', 'Cukup baik', '2025-02-05'),
  (1, 8, 3, 5, 1, 6, 'setoran_baru', 'cukup_lancar', 'Meningkat', '2025-02-26');

-- Insert worship_assessments (Ibadah practice)
INSERT INTO worship_assessments (mosque_id, student_id, teacher_id, assessment_category, target_doa_id, target_prayer_id, status, score, notes, assessed_at) VALUES
  -- Muhammad Rizki
  (1, 1, 2, 'bacaan_shalat', NULL, 1, 'kompeten', 90, 'Gerakan sempurna', '2025-01-18'),
  (1, 1, 2, 'bacaan_shalat', NULL, 5, 'kompeten', 85, 'Sangat baik', '2025-02-01'),
  (1, 1, 2, 'bacaan_shalat', NULL, 7, 'kompeten', 80, 'Urutan benar', '2025-02-15'),
  (1, 1, 2, 'doa_harian', 1, NULL, 'kompeten', 95, 'Hafal lancar', '2025-03-01'),
  (1, 1, 2, 'doa_harian', 3, NULL, 'belum_kompeten', 70, 'Cukup baik', '2025-03-08'),
  -- Aisyah Putri
  (1, 2, 3, 'bacaan_shalat', NULL, 4, 'kompeten', 90, 'Gerakan benar', '2025-01-20'),
  (1, 2, 3, 'bacaan_shalat', NULL, 7, 'kompeten', 95, 'Sempurna', '2025-02-03'),
  (1, 2, 3, 'doa_harian', 3, NULL, 'kompeten', 90, 'Hafal', '2025-02-17'),
  (1, 2, 3, 'doa_harian', 5, NULL, 'kompeten', 85, 'Baik', '2025-03-03'),
  -- Fatimah Zahra
  (1, 3, 2, 'bacaan_shalat', NULL, 2, 'kompeten', 80, 'Baik', '2025-01-25'),
  (1, 3, 2, 'bacaan_shalat', NULL, 5, 'kompeten', 90, 'Benar', '2025-02-08'),
  (1, 3, 2, 'doa_harian', 7, NULL, 'belum_kompeten', 70, 'Cukup', '2025-02-22'),
  -- Umar Hadi
  (1, 4, 3, 'bacaan_shalat', NULL, 10, 'kompeten', 95, 'Sempurna', '2025-01-28'),
  (1, 4, 3, 'bacaan_shalat', NULL, 5, 'kompeten', 90, 'Baik', '2025-02-11'),
  (1, 4, 3, 'doa_harian', 10, NULL, 'kompeten', 85, 'Lancar', '2025-02-25'),
  (1, 4, 3, 'bacaan_shalat', NULL, 3, 'kompeten', 80, 'Baik', '2025-03-11'),
  -- Others
  (1, 5, 2, 'bacaan_shalat', NULL, 4, 'kompeten', 90, 'Bagus', '2025-03-15'),
  (1, 5, 2, 'bacaan_shalat', NULL, 7, 'belum_kompeten', 65, 'Cukup', '2025-03-22'),
  (1, 6, 2, 'bacaan_shalat', NULL, 2, 'kompeten', 80, 'Baik', '2025-03-01'),
  (1, 6, 2, 'doa_harian', 1, NULL, 'kompeten', 90, 'Lancar', '2025-03-08'),
  (1, 7, 2, 'bacaan_shalat', NULL, 4, 'kompeten', 95, 'Sempurna', '2025-04-10'),
  (1, 8, 3, 'bacaan_shalat', NULL, 2, 'belum_kompeten', 70, 'Cukup', '2025-02-08'),
  (1, 8, 3, 'bacaan_shalat', NULL, 5, 'kompeten', 80, 'Baik', '2025-02-22');

-- Insert documentations
INSERT INTO documentations (id, mosque_id, title, description, slug, photo_urls) VALUES
  (1, 1, 'Wisuda Tahfidz Semester 1', 'Acara wisuda tahfidz untuk santri yang telah menyelesaikan target hafalan semester pertama. Dihadiri oleh orang tua dan para pengajar.', 'wisuda-tahfidz-semester-1', ARRAY['/images/wisuda-1.jpg', '/images/wisuda-2.jpg']),
  (2, 1, 'Lomba Tartil Quran', 'Perlombaan tartil Al-Quran antar kelompok dalam rangka memperingati Nuzulul Quran.', 'lomba-tartil-quran', ARRAY['/images/lomba-1.jpg']),
  (3, 1, 'Kunjungan Orang Tua', 'Acara pertemuan orang tua santri untuk membahas perkembangan belajar anak.', 'kunjungan-orang-tua', ARRAY['/images/kunjungan-1.jpg']),
  (4, 1, 'Peringatan Isra Miraj', 'Peringatan Isra Miraj 1446 H dengan ceramah dan penampilan santri.', 'peringatan-isra-miraj', ARRAY['/images/isra-miraj-1.jpg']),
  (5, 1, 'Buka Puasa Bersama', 'Acara buka puasa bersama seluruh santri, pengajar, dan orang tua.', 'buka-puasa-bersama', ARRAY['/images/bukber-1.jpg'])
ON CONFLICT (id) DO NOTHING;

-- Reset sequences
SELECT setval('mosques_id_seq', (SELECT MAX(id) FROM mosques));
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('students_id_seq', (SELECT MAX(id) FROM students));
SELECT setval('master_surahs_id_seq', (SELECT MAX(id) FROM master_surahs));
SELECT setval('master_daily_doas_id_seq', (SELECT MAX(id) FROM master_daily_doas));
SELECT setval('master_prayer_readings_id_seq', (SELECT MAX(id) FROM master_prayer_readings));
SELECT setval('documentations_id_seq', (SELECT MAX(id) FROM documentations));
