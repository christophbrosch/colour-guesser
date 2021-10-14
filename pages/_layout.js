// components/layout.js

import Footer from "components/common/footer"

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}
