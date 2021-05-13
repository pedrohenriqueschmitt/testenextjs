import { useEffect } from 'react'
import { useRouter } from 'next/router'

const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

export default function FacebookPixel({ children }) {
  const router = useRouter()
  useEffect(() => {
    if (!pixelId) return
    let fb
    function onRouteChange() {
      fb.pageView()
      console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
    }
    import('react-facebook-pixel')
      .then((module) => (fb = module.default))
      .then(() => {
        console.log(pixelId+'sssssssssssssssssssssssssssssssssssssssssss');
        fb.init(pixelId, {
          autoConfig: true,
          debug: true,
        })
        fb.pageView()
      })
    router.events.on('routeChangeComplete', onRouteChange)
    return () => router.events.off('routeChangeComplete', onRouteChange)
  }, [router.events])
  return children
}