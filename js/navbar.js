import { supabase } from "./supabase.js"

export async function setupNavbar() {
  const { data } = await supabase.auth.getSession()
  const user = data.session?.user

  const myAeroblox = document.getElementById("myAeroblox")
  const logo = document.getElementById("logo")

  function goHome() {
    if (user) {
      window.location.href = "/LoggedIn/home.html"
    } else {
      window.location.href = "/index.html"
    }
  }

  if (logo) logo.onclick = goHome

  if (myAeroblox) {
    myAeroblox.onclick = () => {
      if (user) {
        window.location.href = "/LoggedIn/home.html"
      } else {
        window.location.href = "/signup.html"
      }
    }
  }

  const hi = document.getElementById("hiUser")
  if (hi && user) {
    hi.innerText = `Hi, ${user.email}`
  }
}
