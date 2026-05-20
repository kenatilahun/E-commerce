import React from "react";
import {
  ShoppingCart,
  Search,
  Star,
  ArrowRight,
  Heart,
  Zap,
  Shield,
  RotateCcw,
  CheckCircle2,
  Menu,
  Truck,
} from "lucide-react";

export function EcommerceHero() {
  return (
    <div className="min-h-screen bg-[#080c14] overflow-hidden relative text-white font-sans selection:bg-[#00a3ff]/30 flex flex-col">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(1deg); }
          }
          @keyframes float-fast {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(-1deg); }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.05); }
          }
          .animate-float-slow {
            animation: float-slow 8s ease-in-out infinite;
          }
          .animate-float-fast {
            animation: float-fast 4s ease-in-out infinite;
          }
          .animate-pulse-glow {
            animation: pulse-glow 6s ease-in-out infinite;
          }
          .glass-panel {
            background: rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          }
          .text-glow {
            text-shadow: 0 0 20px rgba(0, 163, 255, 0.5);
          }
        `,
        }}
      />

      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00a3ff]/20 blur-[120px] mix-blend-screen pointer-events-none animate-pulse-glow" />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#7c3aed]/15 blur-[120px] mix-blend-screen pointer-events-none animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-[#00e5ff]/10 blur-[100px] mix-blend-screen pointer-events-none animate-pulse-glow"
        style={{ animationDelay: "4s" }}
      />

      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#00a3ff] flex items-center justify-center shadow-[0_0_20px_rgba(0,163,255,0.4)]">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-2xl font-black tracking-widest">NEXUS</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition-colors">
            Products
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Laptops
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Phones
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Audio
          </a>
          <a
            href="#"
            className="text-[#00e5ff] hover:text-white transition-colors"
          >
            Deals
          </a>
        </div>

        <div className="flex items-center gap-6 text-gray-300">
          <button className="hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-white transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="relative hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#00a3ff] rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-[0_0_10px_rgba(0,163,255,0.5)]">
              3
            </span>
          </button>
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 py-8 max-w-[1440px] mx-auto w-full flex-1">
        <div className="w-full lg:w-[45%] flex flex-col items-start gap-6 z-20 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00a3ff]/30 bg-[#00a3ff]/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
            <span className="text-xs font-semibold tracking-wider text-[#00e5ff] uppercase">
              Black Friday Deals - Up to 60% OFF
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#00a3ff] text-glow">
              Tech Is Here.
            </span>
          </h1>

          <p className="text-lg text-gray-400 font-light leading-relaxed max-w-lg">
            Explore our latest collection of cutting-edge laptops, smartphones,
            and audio devices crafted for the modern world.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button className="group relative px-8 py-4 rounded-xl bg-[#00a3ff] text-white font-semibold overflow-hidden shadow-[0_0_30px_rgba(0,163,255,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,163,255,0.6)]">
              <span className="relative z-10 flex items-center gap-2">
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00e5ff] to-[#00a3ff] opacity-0 group-hover:opacity-100 transition-opacity z-0" />
            </button>

            <button className="px-8 py-4 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors backdrop-blur-sm">
              View Deals
            </button>
          </div>

          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10 w-full max-w-md">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#080c14] bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00a3ff]/30 to-[#7c3aed]/30" />
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="Customer"
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[#00e5ff]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-sm font-bold text-white ml-1">4.9</span>
              </div>
              <span className="text-xs text-gray-400 font-medium mt-0.5">
                50,000+ Happy Customers
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[55%] relative h-[500px] lg:h-[600px] mt-12 lg:mt-0 flex items-center justify-center perspective-1000">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative z-20 w-full max-w-[700px] animate-float-slow flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] bg-[#00a3ff]/30 blur-[80px] rounded-full" />
              <img
                src="/__mockup/images/laptop-hero.png"
                alt="Nexus Premium Laptop"
                className="w-full h-auto object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,163,255,0.2)]"
              />
            </div>

            <div
              className="absolute top-[10%] right-[0%] w-[180px] z-30 animate-float-fast rotate-[15deg] drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
              style={{ animationDelay: "1s" }}
            >
              <img
                src="/__mockup/images/phone-hero.png"
                alt="Nexus Smartphone"
                className="w-full h-auto object-contain"
              />
            </div>

            <div
              className="absolute bottom-[20%] left-[0%] w-[160px] z-30 animate-float-fast -rotate-[15deg] drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
              style={{ animationDelay: "2s" }}
            >
              <img
                src="/__mockup/images/headphones-hero.png"
                alt="Nexus Headphones"
                className="w-full h-auto object-contain"
              />
            </div>

            <div
              className="absolute top-[5%] right-[20%] glass-panel rounded-2xl p-4 animate-float-slow shadow-xl z-40 flex flex-col items-start border-t border-white/20"
              style={{ animationDelay: "0.5s" }}
            >
              <span className="text-gray-400 text-xs font-semibold mb-1">
                MacBook Pro M4
              </span>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-white">$1,299</span>
                <span className="text-sm text-gray-500 line-through mb-1">
                  $1,999
                </span>
              </div>
            </div>

            <div
              className="absolute top-[15%] left-[10%] glass-panel rounded-full px-4 py-2 animate-float-fast shadow-lg z-40 flex items-center gap-2 border border-[#00e5ff]/30"
              style={{ animationDelay: "1.5s" }}
            >
              <Zap className="w-4 h-4 text-[#00e5ff]" />
              <span className="text-sm font-semibold text-white">
                Fast Delivery - 24hr
              </span>
            </div>

            <div
              className="absolute top-[50%] left-[-5%] glass-panel rounded-full px-4 py-2 animate-float-slow shadow-lg z-40 flex items-center gap-2"
              style={{ animationDelay: "2.5s" }}
            >
              <Shield className="w-4 h-4 text-[#7c3aed]" />
              <span className="text-sm font-semibold text-white">
                2-Year Warranty
              </span>
            </div>

            <div
              className="absolute bottom-[5%] left-[15%] glass-panel rounded-2xl p-3 animate-float-fast shadow-xl z-40 flex items-center gap-3 border border-white/10"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-10 h-10 rounded-full bg-[#00a3ff]/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-[#00e5ff] fill-[#00e5ff]" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">4.9*</div>
                <div className="text-xs text-gray-400">12.4k reviews</div>
              </div>
            </div>

            <button
              className="absolute bottom-[15%] right-[10%] w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_10px_30px_rgba(255,255,255,0.2)] animate-float-slow z-40"
              style={{ animationDelay: "0.8s" }}
            >
              <ShoppingCart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </main>

      <div className="relative z-20 border-t border-white/10 bg-white/5 backdrop-blur-xl w-full mt-auto">
        <div className="max-w-[1440px] mx-auto px-8 py-5 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#00e5ff]" />
            <span className="text-sm font-medium text-gray-300">
              Free Express Shipping
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#7c3aed]" />
            <span className="text-sm font-medium text-gray-300">
              2-Year Warranty
            </span>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-[#00a3ff]" />
            <span className="text-sm font-medium text-gray-300">
              30-Day Returns
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#00e5ff]" />
            <span className="text-sm font-medium text-gray-300">
              Certified Authentic
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EcommerceHero;
