/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React, {Suspense} from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <>
    {/*@TODO replace with loading spinner or smth*/}

    <Suspense fallback={"Loading the admin panel..."} >
      <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
        {children}
      </RootLayout>
    </Suspense>
  </>
)

export default Layout
