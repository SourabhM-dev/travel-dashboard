async function generateItinerary({ destination, days }){
  try{
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination, days })
    })
    return await res.json()
  }catch(e){
    console.error(e)
    return { error: e.message }
  }
}

export default { generateItinerary }
