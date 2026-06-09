import { supabase } from "./supabase.js"

const id = new URLSearchParams(window.location.search).get("id")

const info = document.getElementById("gameInfo")
const commentsDiv = document.getElementById("comments")

async function loadGame() {
  const { data } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single()

  info.innerHTML = `
    <h2>${data.name}</h2>
    <p>${data.description}</p>
    <p>IP: ${data.ip}</p>
  `
}

async function loadComments() {
  const { data } = await supabase
    .from("comments")
    .select("*")
    .eq("game_id", id)

  commentsDiv.innerHTML = ""

  data.forEach(c => {
    commentsDiv.innerHTML += `<p><b>${c.username}</b>: ${c.content}</p>`
  })
}

document.getElementById("postBtn").onclick = async () => {
  const text = document.getElementById("commentBox").value

  await supabase.from("comments").insert({
    game_id: id,
    username: "Guest",
    content: text
  })

  loadComments()
}

loadGame()
loadComments()
