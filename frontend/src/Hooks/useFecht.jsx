import { useState,useEffect } from "react"

export const useFecht = (url) => {

  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try{
        const res = await fetch(url)
        const json = await res.json()

        setData(json)
      } catch (e) {
        console.error("Erro ao buscar dados", e)
      }
    }   
    getData()
  }, [url])

  return {}
}
