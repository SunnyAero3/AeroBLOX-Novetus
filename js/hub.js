import { supabase } from "./supabase.js"

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("games")

  async function loadGames() {

    const { data, error } = await supabase
      .from("games")
      .select("*")
      .order("likes", { ascending: false })

    if (error) {
      console.log("Supabase error:", error)
      container.innerHTML = "<p>Failed to load games</p>"
      return
    }

    if (!data || data.length === 0) {
      container.innerHTML = "<p>No games found</p>"
      return
    }

    container.innerHTML = ""

    data.forEach(g => {
      const div = document.createElement("div")
      div.className = "game"

      div.innerHTML = `
        <h3>${g.name}</h3>
        <p>${g.description}</p>
        <p>👍 ${g.likes} 👎 ${g.dislikes}</p>

        <button onclick="like('${g.id}')">Like</button>
        <button onclick="dislike('${g.id}')">Dislike</button>
        <button onclick="play('${g.id}')">Play</button>
      `

      container.appendChild(div)
    })
  }

  window.like = async (id) => {
    const { data } = await supabase
      .from("games")
      .select("likes")
      .eq("id", id)
      .single()

    await supabase
      .from("games")
      .update({ likes: data.likes + 1 })
      .eq("id", id)

    loadGames()
  }

  window.dislike = async (id) => {
    const { data } = await supabase
      .from("games")
      .select("dislikes")
      .eq("id", id)
      .single()

    await supabase
      .from("games")
      .update({ dislikes: data.dislikes + 1 })
      .eq("id", id)

    loadGames()
  }

  window.play = (id) => {
    window.location.href = "game.html?id=" + id
  }

  loadGames()
})
