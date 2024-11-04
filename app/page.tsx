import { Faucet, Footer, NavBar } from "@/components";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";


export default function Home() {
  return (
    <div className="bg-black w-[100vw] h-[100vh] overflow-hidden px-5">
      <NavBar />
      <h1 className='text-center font-bold text-7xl mt-4 text-black relative z-10 anyText max-[321px]:text-6xl'>Any Faucet.</h1>
      <Faucet />
      <Footer />
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
