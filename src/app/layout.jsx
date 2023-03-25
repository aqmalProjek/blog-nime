import Footer from './Footer'
import './globals.css'
import Header from './Header'
import Provider from './provider'
import Sidebar from './Sidebar'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='w-full'>
        <Provider>
          <>
          <Header />
          <div className="flex w-full border-white justify-start lg:justify-center mt-20">

          <Sidebar />
         {children}
          </div>
          <Footer />
          </>
        </Provider>
        
      
      </body>
    </html>
  )
}
