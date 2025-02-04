import { useLoaderData } from 'react-router-dom'

export default function Webhooks() {
  // You can use loader functions for data fetching
  const data = useLoaderData()

  return (
    <div>
      <h1>Webhooks Management</h1>
      {/* Your webhook content */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

// Example loader function (for data fetching)
export async function webhooksLoader() {
  const response = await fetch(process.env.HTTP_URL!+'/api/webhooks')
  return response.json()
}
