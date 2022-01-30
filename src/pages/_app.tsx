import { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import React, { ReactElement, useEffect } from 'react'
import Header from '@/config'
import Dom from '@/components/layout/dom'
import '@/styles/index.css'
import dynamic from 'next/dynamic'
import { R3FComponentProps } from '@/types'
import { partition } from 'lodash'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

const Balance = ({ child }: { child: ReactElement<R3FComponentProps>[] }) => {
  const [r3fComponents, domComponents] = partition(
    child,
    (c) => c.props.r3f === true
  )

  return (
    <>
      <Dom>{domComponents}</Dom>
      <LCanvas>{r3fComponents}</LCanvas>
    </>
  )
}

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  const child = Component(pageProps).props.children

  return (
    <>
      <Header title={pageProps.title} />
      {child && child.length > 1 ? (
        <Balance child={child} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}

export default App
