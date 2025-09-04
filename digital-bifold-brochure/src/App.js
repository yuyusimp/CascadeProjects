import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const GlobalStyle = createGlobalStyle`
  body { background: #f8fafc; }
`;

const BrochureContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
`;

const BifoldWrapper = styled.div`
  perspective: 2200px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bifold = styled.div`
  width: 1100px;
  max-width: 98vw;
  height: 650px;
  background: transparent;
  border-radius: 28px;
  box-shadow: 0 12px 48px rgba(40,60,120,0.17);
  display: flex;
  overflow: visible;
  position: relative;
  transform-style: preserve-3d;
  @media (max-width: 1300px) {
    width: 98vw;
    height: 480px;
  }
  @media (max-width: 800px) {
    width: 99vw;
    height: 320px;
  }
`;

const BrochureSpine = styled.div`
  width: 10px;
  height: 97%;
  background: linear-gradient(90deg, #bfc9d1 0%, #e5e9f2 100%);
  box-shadow: 0 0 10px 2px #bfc9d1;
  position: absolute;
  left: 50%;
  top: 1.5%;
  transform: translateX(-50%);
  border-radius: 6px;
  z-index: 2;
`;

const Page = styled(motion.div)`
  flex: 1;
  padding: 3.5rem 2.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({bg}) => bg || '#fff'};
  box-shadow: 0 6px 32px rgba(40,60,120,0.11), 0 0px 60px rgba(99,102,241,0.04) inset;
  border-radius: 22px;
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s;
  &:after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(120deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.04) 100%);
    pointer-events: none;
    border-radius: 22px;
  }
`;

const NavButton = styled.button`
  margin: 2rem 1rem 0 1rem;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
  border: none;
  border-radius: 32px;
  padding: 0.9rem 2.2rem;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1px;
  box-shadow: 0 2px 12px rgba(99,102,241,0.13);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, opacity 0.2s;
  opacity: ${({disabled}) => disabled ? 0.4 : 1};
  pointer-events: ${({disabled}) => disabled ? 'none' : 'auto'};
  &:hover {
    background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
    transform: translateY(-2px) scale(1.03);
  }
`;
const NavButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: #374151;
`;
const SubHeading = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: #6366f1;
  margin-bottom: 1.5rem;
`;
const Paragraph = styled.p`
  color: #374151;
  font-size: 1.08rem;
  line-height: 1.7;
`;
const BrochureImg = styled.img`
  width: 100%;
  max-width: 220px;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(99,102,241,0.10);
  margin-bottom: 1.2rem;
  align-self: center;
`;

// Flipping animation for the whole bifold
const bifoldFlipVariants = {
  next: {
    rotateY: [0, -100, 0],
    transition: { times: [0, 0.6, 1], duration: 1, ease: "easeInOut" },
  },
  back: {
    rotateY: [0, 100, 0],
    transition: { times: [0, 0.6, 1], duration: 1, ease: "easeInOut" },
  },
  idle: {
    rotateY: 0,
    transition: { duration: 0.3 },
  },
};

const leftPageVariants = {
  initial: { rotateY: 0, z: 0, boxShadow: "0 12px 48px rgba(40,60,120,0.17)" },
  animate: { rotateY: 0, z: 0, boxShadow: "0 12px 48px rgba(40,60,120,0.17)", transition: { duration: 0.7, type: "spring" } },
  exit: { rotateY: -70, z: 0, opacity: 0.7, boxShadow: "0 2px 12px rgba(40,60,120,0.07)", transition: { duration: 0.7 } },
};
const rightPageVariants = {
  initial: { rotateY: 0, z: 0, boxShadow: "0 12px 48px rgba(40,60,120,0.17)" },
  animate: { rotateY: 0, z: 0, boxShadow: "0 12px 48px rgba(40,60,120,0.17)", transition: { duration: 0.7, type: "spring" } },
  exit: { rotateY: 70, z: 0, opacity: 0.7, boxShadow: "0 2px 12px rgba(40,60,120,0.07)", transition: { duration: 0.7 } },
};

const brochurePages = [
  {
    key: "front",
    left: {
      bg: "#f1f5f9",
      content: (
        <>
          <BrochureImg src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Nature" />
          <Heading>Welcome to Aurora Tours</Heading>
          <SubHeading>Discover. Explore. Experience.</SubHeading>
          <Paragraph>
            Step into a world of adventure with Aurora Tours. From breathtaking landscapes to immersive cultural experiences, our bifold brochure is your gateway to unforgettable journeys.
          </Paragraph>
        </>
      ),
    },
    right: {
      bg: "#fff",
      content: (
        <>
          <Heading style={{color:'#6366f1'}}>Your Next Adventure Awaits</Heading>
          <Paragraph>
            <b>Exclusive Offers:</b> Get up to 30% off on early bookings!<br/><br/>
            <b>Destinations:</b> Norway, Iceland, New Zealand, Canada, and more.<br/><br/>
            <b>Why Choose Us?</b> Personalized itineraries, expert guides, and 24/7 support.
          </Paragraph>
        </>
      ),
    },
  },
  {
    key: "inside",
    left: {
      bg: "#fff",
      content: (
        <>
          <BrochureImg src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Travel" />
          <Heading>Our Top Experiences</Heading>
          <Paragraph>
            • Northern Lights Expeditions<br/>
            • Fjord Cruises<br/>
            • Glacier Hikes<br/>
            • Wildlife Safaris<br/>
            • City Culture Tours
          </Paragraph>
        </>
      ),
    },
    right: {
      bg: "#f1f5f9",
      content: (
        <>
          <Heading>Contact & Booking</Heading>
          <Paragraph>
            <b>Website:</b> www.auroratours.com<br/>
            <b>Email:</b> info@auroratours.com<br/>
            <b>Phone:</b> +1 555 123 4567<br/><br/>
            <span style={{color:'#6366f1',fontWeight:600}}>Book your dream trip today!</span>
          </Paragraph>
        </>
      ),
    },
  },
];

export default function App() {
  const [page, setPage] = useState(0);
  const [flip, setFlip] = useState(null); // 'next' | 'back' | null
  const [isFlipping, setIsFlipping] = useState(false);

  // Handler for Next button
  const handleNext = () => {
    if (isFlipping) return;
    setFlip('next');
    setIsFlipping(true);
    setTimeout(() => {
      setPage((p) => (p + 1) % brochurePages.length);
      setFlip(null);
      setIsFlipping(false);
    }, 1200); // Duration matches flip animation
  };

  // Handler for Back button
  const handleBack = () => {
    if (isFlipping) return;
    setFlip('back');
    setIsFlipping(true);
    setTimeout(() => {
      setPage((p) => (p - 1 + brochurePages.length) % brochurePages.length);
      setFlip(null);
      setIsFlipping(false);
    }, 1200);
  };

  // For realistic book flip, we render the next spread underneath and animate only the right page (for Next), or left page (for Back)
  const nextPageIdx = (page + 1) % brochurePages.length;
  const prevPageIdx = (page - 1 + brochurePages.length) % brochurePages.length;

  return (
    <>
      <GlobalStyle />
      <BrochureContainer>
        <BifoldWrapper>
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
            {/* Underneath: next spread for Next, prev spread for Back, else nothing */}
            {flip === 'next' && (
              <Bifold
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <Page
                  bg={brochurePages[nextPageIdx].left.bg}
                  style={{
                    borderRight: '3.5px solid #bfc9d1',
                    zIndex: 2,
                    transformOrigin: '100% 50%',
                    boxShadow: '0 12px 48px rgba(40,60,120,0.17)',
                  }}
                >
                  {brochurePages[nextPageIdx].left.content}
                </Page>
                <BrochureSpine />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`right-fade-${nextPageIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    style={{
                      flex: 1,
                      borderLeft: "3.5px solid #bfc9d1",
                      zIndex: 4,
                      minWidth: 0,
                      minHeight: 0,
                      borderRadius: 22,
                      overflow: "hidden",
                    }}
                    onAnimationComplete={() => {
                      setPage(nextPageIdx);
                      setFlip(null);
                      setIsFlipping(false);
                    }}
                  >
                    <Page bg={brochurePages[nextPageIdx].right.bg}>
                      {brochurePages[nextPageIdx].right.content}
                    </Page>
                  </motion.div>
                </AnimatePresence>
              </Bifold>
            )}
            {flip === 'back' && (
              <Bifold
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`left-fade-${prevPageIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    style={{
                      flex: 1,
                      borderRight: "3.5px solid #bfc9d1",
                      zIndex: 4,
                      minWidth: 0,
                      minHeight: 0,
                      borderRadius: 22,
                      overflow: "hidden",
                    }}
                    onAnimationComplete={() => {
                      setPage(prevPageIdx);
                      setFlip(null);
                      setIsFlipping(false);
                    }}
                  >
                    <Page bg={brochurePages[prevPageIdx].left.bg}>
                      {brochurePages[prevPageIdx].left.content}
                    </Page>
                  </motion.div>
                </AnimatePresence>
                <BrochureSpine />
                <Page
                  bg={brochurePages[prevPageIdx].right.bg}
                  style={{
                    borderLeft: '3.5px solid #bfc9d1',
                    zIndex: 2,
                    transformOrigin: '0% 50%',
                    boxShadow: '0 12px 48px rgba(40,60,120,0.17)',
                  }}
                >
                  {brochurePages[prevPageIdx].right.content}
                </Page>
              </Bifold>
            )}
            {/* Top: current spread, with animated page flip */}
            <Bifold style={{position: 'relative', zIndex: 3}}>
              {/* Left page stays static for Next, animates for Back */}
              <AnimatePresence initial={false}>
                {!(flip === 'back') && (
                  <Page
                    key={"left-static-"+page}
                    bg={brochurePages[page].left.bg}
                    style={{
                      borderRight: '3.5px solid #bfc9d1',
                      zIndex: 3,
                      transformOrigin: '100% 50%',
                      boxShadow: '0 12px 48px rgba(40,60,120,0.17)',
                    }}
                  >
                    {brochurePages[page].left.content}
                  </Page>
                )}
                {flip === 'back' && (
                  <Page
                    key={`left-flip-${page}`}
                    bg={brochurePages[prevPageIdx].left.bg}
                    style={{
                      flex: 1,
                      borderRight: "3.5px solid #bfc9d1",
                      zIndex: 4,
                      minWidth: 0,
                      minHeight: 0,
                      borderRadius: 22,
                      overflow: "hidden",
                    }}
                  >
                    {brochurePages[prevPageIdx].left.content}
                  </Page>
                )}
              </AnimatePresence>
              <BrochureSpine />
              {/* Right page stays static for Back, animates for Next */}
              <AnimatePresence initial={false}>
                {!(flip === 'next') && (
                  <Page
                    key={"right-static-"+page}
                    bg={brochurePages[page].right.bg}
                    style={{
                      borderLeft: '3.5px solid #bfc9d1',
                      zIndex: 3,
                      transformOrigin: '0% 50%',
                      boxShadow: '0 12px 48px rgba(40,60,120,0.17)',
                    }}
                  >
                    {brochurePages[page].right.content}
                  </Page>
                )}
                {flip === 'next' && (
                  <Page
                    key={`right-flip-${page}`}
                    bg={brochurePages[nextPageIdx].right.bg}
                    style={{
                      flex: 1,
                      borderLeft: "3.5px solid #bfc9d1",
                      zIndex: 4,
                      minWidth: 0,
                      minHeight: 0,
                      borderRadius: 22,
                      overflow: "hidden",
                    }}
                  >
                    {brochurePages[nextPageIdx].right.content}
                  </Page>
                )}
              </AnimatePresence>
            </Bifold>
          </div>
          <NavButtonRow>
            <NavButton onClick={handleBack} disabled={isFlipping || page === 0}>Back</NavButton>
            <NavButton onClick={handleNext} disabled={isFlipping}>Next</NavButton>
          </NavButtonRow>
        </BifoldWrapper>
      </BrochureContainer>
    </>
  );
}
