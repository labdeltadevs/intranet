import Header from './components/Header'
import NavCards from './components/NavCards'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-16">
        <NavCards />
      </main>
      <Footer />
    </>
  )
}
