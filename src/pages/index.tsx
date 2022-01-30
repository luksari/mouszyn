import dynamic from 'next/dynamic'
import { R3FComponent } from '@/types'
import Dom from '@/components/layout/dom'

const Shader = dynamic(() => import('@/components/canvas/shader/Shader'), {
  ssr: false,
})

const R3F: R3FComponent = () => {
  return (
    <>
      <Shader />
    </>
  )
}
const DOM = () => {
  return (
    <Dom>
      <h1>Hello</h1>
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
      title: 'Home',
    },
  }
}
