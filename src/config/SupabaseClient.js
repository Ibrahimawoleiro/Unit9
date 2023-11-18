
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wengszbypmrgnsuqhukq.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlbmdzemJ5cG1yZ25zdXFodWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwNzA2MDQsImV4cCI6MjAxNDY0NjYwNH0.cbhfQ8nEas9hedFqhTZ2PawDUmEchvytH6hl0nySGmE"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase