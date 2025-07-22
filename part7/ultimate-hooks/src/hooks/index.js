import { useEffect, useState } from "react"
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(!baseUrl) return;

    setLoading(true);
    axios.get(baseUrl)
    .then((res) => {
        const formatData = res.data.map((resource, i) => ({
            ...resource,
            id: resource.id ? resource.id : i,
        }))
        setResources(formatData)
    })
    .catch((error) => {
        console.log('Error fetching resources', error)
    }).finally(() => {
        setLoading(false);
    })
  },[baseUrl])

  const create = (resource) => {



    axios.post(baseUrl, resource);
    setResources(resources.concat(resource))
  }

  const service = {
    create,
    loading,
  }

  return [
    resources, service
  ]
}