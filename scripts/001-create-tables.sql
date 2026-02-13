-- Drop existing tables if any (in reverse dependency order)
DROP TABLE IF EXISTS worship_assessments CASCADE;
DROP TABLE IF EXISTS memorization_logs CASCADE;
DROP TABLE IF EXISTS reading_logs CASCADE;
DROP TABLE IF EXISTS documentations CASCADE;
DROP TABLE IF EXISTS master_prayer_readings CASCADE;
DROP TABLE IF EXISTS master_daily_doas CASCADE;
DROP TABLE IF EXISTS master_surahs CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS mosques CASCADE;

-- 1. Tabel Masjid
CREATE TABLE mosques (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Pengguna (Admin & Ustadz)
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    mosque_id BIGINT REFERENCES mosques(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL DEFAULT '',
    role VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Santri
CREATE TABLE students (
    id BIGSERIAL PRIMARY KEY,
    mosque_id BIGINT NOT NULL REFERENCES mosques(id) ON DELETE CASCADE,
    assigned_teacher_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    full_name VARCHAR(100) NOT NULL,
    parent_phone VARCHAR(20),
    student_slug VARCHAR(255) UNIQUE NOT NULL,
    current_jilid VARCHAR(10) DEFAULT '1',
    current_page INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Master Data: Surat Al-Quran
CREATE TABLE master_surahs (
    id BIGSERIAL PRIMARY KEY,
    surah_name VARCHAR(100) NOT NULL,
    total_verses INT NOT NULL,
    surah_order INT NOT NULL
);

-- 5. Master Data: Doa Harian
CREATE TABLE master_daily_doas (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50)
);

-- 6. Master Data: Bacaan Sholat
CREATE TABLE master_prayer_readings (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    step_order INT
);

-- 7. Log Mengaji (Iqro / Al-Quran)
CREATE TABLE reading_logs (
    id BIGSERIAL PRIMARY KEY,
    mosque_id BIGINT NOT NULL REFERENCES mosques(id),
    student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    teacher_id BIGINT NOT NULL REFERENCES users(id),
    date DATE DEFAULT CURRENT_DATE,
    material_type VARCHAR(20) NOT NULL,
    volume_info VARCHAR(50),
    start_point VARCHAR(20),
    end_point VARCHAR(20),
    quality_score VARCHAR(5),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Log Hafalan (Tahfidz)
CREATE TABLE memorization_logs (
    id BIGSERIAL PRIMARY KEY,
    mosque_id BIGINT NOT NULL REFERENCES mosques(id),
    student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    teacher_id BIGINT NOT NULL REFERENCES users(id),
    surah_id BIGINT NOT NULL REFERENCES master_surahs(id),
    verse_start INT,
    verse_end INT,
    memorization_type VARCHAR(20) NOT NULL,
    fluency_level VARCHAR(20),
    notes TEXT,
    date DATE DEFAULT CURRENT_DATE
);

-- 9. Penilaian Ibadah (Assessment)
CREATE TABLE worship_assessments (
    id BIGSERIAL PRIMARY KEY,
    mosque_id BIGINT NOT NULL REFERENCES mosques(id),
    student_id BIGINT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    teacher_id BIGINT REFERENCES users(id),
    assessment_category VARCHAR(50) NOT NULL,
    target_doa_id BIGINT REFERENCES master_daily_doas(id),
    target_prayer_id BIGINT REFERENCES master_prayer_readings(id),
    status VARCHAR(20) NOT NULL,
    score INT,
    notes TEXT,
    assessed_at DATE DEFAULT CURRENT_DATE
);

-- 10. Tabel Dokumentasi
CREATE TABLE documentations (
    id BIGSERIAL PRIMARY KEY,
    mosque_id BIGINT NOT NULL REFERENCES mosques(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    photo_urls TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
