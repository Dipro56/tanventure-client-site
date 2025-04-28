import FeaturedDestinations from "@/components/featured-destinations/FeaturedDestinations";
import HeroSection from "@/components/hero-section/HeroSection";
import ReviewRecommendation from "@/components/review-recommendation/ReviewRecommendation";
import TravelInspirationSection from "@/components/travel-inspiration-section/TravelInspirationSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <FeaturedDestinations />
      <ReviewRecommendation />
      <TravelInspirationSection />
    </main>
  );
}
