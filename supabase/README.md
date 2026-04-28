# Database Setup & Migrations

This directory contains Supabase database migrations for the SaaS app.

## Prerequisites

1. **Supabase Project**: Create a project at [supabase.com](https://supabase.com)
2. **Supabase CLI**: Install the Supabase CLI
   ```bash
   npm install -g supabase
   ```

## Environment Setup

1. Copy `.env.example` to `.env.local` in the project root
2. Update the following variables with your Supabase project credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

## Running Migrations

### Option 1: Using Supabase CLI (Recommended)

1. **Link your project**:
   ```bash
   supabase link --project-ref your-project-ref
   ```

2. **Push migrations to Supabase**:
   ```bash
   supabase db push
   ```

### Option 2: Manual SQL Execution

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of each migration file in order:
   - `20240427000000_initial_schema.sql`
   - `20240427000001_v2_schema_expansion.sql`
4. Execute each migration

## Migration Files

- **`20240427000000_initial_schema.sql`**: Initial database schema
  - Creates core tables: tenants, profiles, projects, documents, notifications, audit_logs, api_keys, billing_invoices
  - Sets up Row Level Security (RLS) policies
  - Creates trigger for automatic profile creation on user signup

- **`20240427000001_v2_schema_expansion.sql`**: Schema expansion
  - Adds additional columns to existing tables
  - Creates new tables: tasks, comments, billing_subscriptions
  - Adds performance indexes
  - Sets up updated_at triggers

## Verifying Migrations

After running migrations, verify the setup:

1. Check that all tables exist in the Supabase dashboard under **Table Editor**
2. Verify RLS policies are enabled under **Authentication > Policies**
3. Test the connection by running the app:
   ```bash
   npm run dev
   ```

## Auth Driver Configuration

The app supports two auth modes:

- **`mock`**: Uses local seed users (default for development)
- **`http`**: Uses Supabase authentication and database

To enable database mode, set in `.env.local`:
```env
NEXT_PUBLIC_AUTH_DRIVER=http
```

## Troubleshooting

### Migration Errors

If you encounter errors during migration:

1. Check that your Supabase project is active
2. Verify your credentials in `.env.local`
3. Ensure you're running migrations in order
4. Check the Supabase logs in the dashboard

### Connection Issues

If the app can't connect to the database:

1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
2. Check that your Supabase project is not paused
3. Ensure RLS policies allow access to your data

### Empty Data

If pages show "No data available":

1. This is expected behavior when the database is empty
2. Use the UI to create test data (projects, team members, etc.)
3. Or insert seed data manually via SQL Editor

## Seed Data (Optional)

To populate the database with test data, you can create a seed script or manually insert data via the Supabase SQL Editor.

Example seed for a test user:
```sql
-- Insert a test profile (user must exist in auth.users first)
INSERT INTO public.profiles (id, name, email, role)
VALUES (
  'your-user-id-from-auth',
  'Test User',
  'test@example.com',
  'admin'
);
```

## Next Steps

After migrations are complete:

1. Sign up a user via the app's signup page
2. The profile will be automatically created via the trigger
3. Start creating projects, teams, and other data through the UI
4. All data will be persisted to Supabase
