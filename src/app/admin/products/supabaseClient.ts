import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ifoflzrcnegmzmprtiwy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmb2ZsenJjbmVnbXptcHJ0aXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTQzMzUsImV4cCI6MjA1OTc5MDMzNX0.HqVJCxorhLhsQpUmwhLwqXpSE7cY30gx_ZKK5b_DCrQ";

export const supabase = createClient(supabaseUrl, supabaseKey);
