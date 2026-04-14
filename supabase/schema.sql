create table if not exists profiles (
  id uuid primary key,
  full_name text not null,
  phone text,
  role text default 'patient' check (role in ('patient', 'admin', 'doctor')),
  due_date date,
  created_at timestamptz default now()
);

create table if not exists doctors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  specialty text not null,
  bio text,
  years_experience int,
  consultation_fee numeric(10, 2) not null default 0,
  created_at timestamptz default now()
);

create table if not exists schedules (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid not null references doctors(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  slot_capacity int not null default 1,
  status text default 'available' check (status in ('available', 'blocked', 'completed'))
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null,
  doctor_id uuid not null references doctors(id),
  schedule_id uuid references schedules(id),
  visit_type text not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled')),
  appointment_at timestamptz not null,
  notes text,
  created_at timestamptz default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid unique references appointments(id) on delete cascade,
  stripe_payment_intent text,
  amount numeric(10, 2) not null,
  status text default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid,
  appointment_id uuid references appointments(id) on delete cascade,
  channel text not null check (channel in ('email', 'sms', 'whatsapp', 'dashboard')),
  title text not null,
  body text not null,
  priority text default 'medium' check (priority in ('low', 'medium', 'high')),
  sent_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists medical_records (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null,
  appointment_id uuid references appointments(id) on delete set null,
  record_type text not null,
  summary text not null,
  file_path text,
  created_at timestamptz default now()
);
