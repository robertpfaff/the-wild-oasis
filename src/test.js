
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://swsduwfgaciylwefjsay.supabase.co'
const supabaseKey = 'sb_publishable_cpbCNudOElia0S19I2T2mg_zdHzRUPr'
const supabaseClient = createClient(supabaseUrl, supabaseKey)

let { data, error } = await supabaseClient.auth.signInWithPassword({
  email: 'robert@robertpfaff.net',
  password: 'Adam2326!455'
})

const jwt_expiration = function() {
  const t = data.session.access_token;
  const p = t.split('.')[1];
  const payload = JSON.parse(Buffer.from(p.replace(/-/g,'+').replace(/_/g,'/'),'base64').toString());
  return payload.exp;
}();

const unixTimestamp = jwt_expiration;
const date = new Date(unixTimestamp * 1000);

const session_access_token = data.session.access_token;

// Convert to local time string
console.log()
console.log()
console.log("JWT Expiration:", date.toLocaleString())
console.log()
console.log()
console.log("ClientData:", data)
console.log()
console.log()
console.log("Client Error:", error)
console.log()
console.log()
console.log("JWT Session Access Token:", session_access_token)
console.log()
console.log()