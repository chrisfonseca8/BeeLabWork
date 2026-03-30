import { useState } from "react";

// Layout Components
import Ticker from "./components/layout/ticker";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

// Section Components
import Hero from "./components/sections/hero";
import About from "./components/sections/about";
import Timeline from "./components/sections/timeline";
import Speakers from "./components/sections/speakers";
import CallToAction from "./components/sections/callToAction";

// UI Components
import SpeakerModal from "./components/ui/SpeakerModal";

export default function App() {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      
      <Ticker />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Timeline onSelectSpeaker={setSelectedSpeaker} />
        <Speakers onSelectSpeaker={setSelectedSpeaker} />
        <CallToAction />
      </main>

      <Footer />

      <SpeakerModal 
        speaker={selectedSpeaker} 
        onClose={() => setSelectedSpeaker(null)} 
      />
    </>
  );
}