// This script can be used to manage Supabase schema changes
// You can run it with: node supabase/supabase.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if migrations directory exists
const migrationsDir = path.join(__dirname, 'migrations');
if (!fs.existsSync(migrationsDir)) {
  console.log('Creating migrations directory...');
  fs.mkdirSync(migrationsDir, { recursive: true });
}

// Function to create a new migration file
function createMigration(name) {
  const timestamp = new Date().toISOString().replace(/[-:\.T]/g, '').slice(0, 14);
  const filename = `${timestamp}_${name}.sql`;
  const filepath = path.join(migrationsDir, filename);
  
  fs.writeFileSync(filepath, `-- Migration: ${name}\n\n-- Write your SQL here\n`);
  console.log(`Created migration file: ${filepath}`);
}

// Function to apply migrations to Supabase
function applyMigrations() {
  console.log('To apply migrations to Supabase:');
  console.log('1. Install Supabase CLI: https://supabase.com/docs/guides/cli');
  console.log('2. Login to Supabase: supabase login');
  console.log('3. Link your project: supabase link --project-ref your-project-ref');
  console.log('4. Apply migrations: supabase db push');
}

// Simple CLI
const command = process.argv[2];
const name = process.argv[3];

switch (command) {
  case 'new':
    if (!name) {
      console.error('Please provide a migration name');
      process.exit(1);
    }
    createMigration(name);
    break;
  case 'apply':
    applyMigrations();
    break;
  default:
    console.log('Usage:');
    console.log('  node supabase/supabase.js new <migration-name>');
    console.log('  node supabase/supabase.js apply');
    break;
} 