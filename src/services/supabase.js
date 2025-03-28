import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://kqcnbskzonslscatafxy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxY25ic2t6b25zbHNjYXRhZnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODY0NDUsImV4cCI6MjA1ODY2MjQ0NX0.Ql8JQPkd7vcsAsmFod0MaiVlOQcLVY_GHwDncF-nZKw'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase