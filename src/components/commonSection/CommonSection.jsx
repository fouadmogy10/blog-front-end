import React from 'react'
import BredCramb from '../Breadcrumbs'

const CommonSection = ({Documents ,BlogTitle ,href}) => {
  return (
    <section className='flex m-5  rounded-[50px] items-center justify-center min-h-[400px] bc'>
        <BredCramb Documents={Documents} BlogTitle={BlogTitle} href={href}/>
    </section>
  )
}

export default CommonSection