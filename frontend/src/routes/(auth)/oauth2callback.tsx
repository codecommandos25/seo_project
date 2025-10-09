import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/oauth2callback')({
  component: RouteComponent,
})

function RouteComponent() {
  // Get the code from URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const authorizationCode = urlParams.get('code')
  console.log('auth', authorizationCode)
  if (authorizationCode) {
    console.log('Authorization code:', authorizationCode)

    // Send to your backend (localhost:3000) for token exchange
    fetch(
      `http://13.234.181.212:8000/third-party-apis/get_access_token?code=${authorizationCode}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Token exchange successful:', data)
        console.log('Token exchange successful tok:', data.access_token)
        if (data.access_token && data.refresh_token) {
          localStorage.setItem('accessToken', data.access_token)
          localStorage.setItem('refreshToken', data.refresh_token)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  return <div>Hello "/(auth)/oauth2callback"!</div>
}
