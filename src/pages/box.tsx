import dynamic from 'next/dynamic'
import { R3FComponent } from '@/types'
import Dom from '@/components/layout/dom'

const Box = dynamic(() => import('@/components/canvas/box/Box'), {
  ssr: false,
})

const R3F: R3FComponent = () => {
  return (
    <>
      <Box route='/' />
    </>
  )
}

const DOM = () => {
  return (
    <Dom>
      <div>Hello</div>
    </Dom>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Fuego',
    },
  }
}
