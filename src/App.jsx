import { useState } from "react";

// Layout Components
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

// Section Components
import Hero from "./components/sections/hero";
import About from "./components/sections/about";
import Speakers from "./components/sections/speakers";
import CallToAction from "./components/sections/callToAction";

// Page Components
import SchedulePage from "./components/ui/ScheduleOverlay";

// UI Components
import SpeakerModal from "./components/ui/SpeakerModal";

export default function App() {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [currentPage, setCurrentPage] = useState("home"); // "home" | "schedule"

  const goToSchedule = () => {
    setCurrentPage("schedule");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToHome = (sectionId) => {
    setCurrentPage("home");
    if (sectionId && sectionId !== "home") {
      // Small delay so page renders before scrolling
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      
      <Navbar 
        onOpenSchedule={goToSchedule} 
        onNavigate={goToHome}
        currentPage={currentPage}
      />
      
      {currentPage === "home" ? (
        <main>
          <Hero />
          <About />
          <Speakers onSelectSpeaker={setSelectedSpeaker} />
          <CallToAction />
        </main>
      ) : (
        <SchedulePage
          onSelectSpeaker={(sp) => setSelectedSpeaker(sp)}
        />
      )}

      <Footer />

      <SpeakerModal 
        speaker={selectedSpeaker} 
        onClose={() => setSelectedSpeaker(null)} 
      />
    </>
  );
}