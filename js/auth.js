import { supabase } from "./supabase.js"

// check session
export async function getUser() {
  const { data } = await supabase.auth.getSession()
  return data.session?.user || null
}

// redirect if logged in (index.html)
export async function redirectIfLoggedIn() {
  const user = await getUser()
  if (user) {
    window.location.href = "/LoggedIn/home.html"
  }
}

// protect logged-in pages
export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    window.location.href = "/login.html"
  }
}

// logout
export async function logout() {
  await supabase.auth.signOut()
  window.location.href = "/index.html"
}
