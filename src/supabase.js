import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ewiohioklexlqtwpjnfw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3aW9oaW9rbGV4bHF0d3BqbmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MzUyNjcsImV4cCI6MjA2NjQxMTI2N30.qZwHAj3qsmfNi31Et6YlKwcmtGAm7Wb_Y_jeMVn6YS0'
export const supabase = createClient(supabaseUrl, supabaseKey)
