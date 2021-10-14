import 'bootstrap/dist/css/bootstrap.min.css'

import Layout from './_layout'

import CustomModal from 'components/common/modal'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <CustomModal></CustomModal>
    </Layout>
  )
}

export default MyApp
