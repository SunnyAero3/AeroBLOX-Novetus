import { supabase } from "./supabase.js"

export async function getUser() {
  const { data } = await supabase.auth.getSession()
  return data.session?.user || null
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    window.location.href = "login.html"
  }
  return user
}

export async function redirectIfLoggedIn() {
  const user = await getUser()
  if (user) {
    window.location.href = "LoggedIn/home.html"
  }
}

export async function logout() {
  await supabase.auth.signOut()
  window.location.href = "index.html"
}
