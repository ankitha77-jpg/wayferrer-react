import { Globe, Users, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function AnimatedCounter({ 
  end, 
  suffix = "", 
  duration = 2000 
}: { 
  end: number; 
  suffix?: string; 
  duration?: number; 
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startCount = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={countRef} className="text-4xl md:text-5xl font-bold text-primary">
      {count}{suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <AnimatedCounter end={100} suffix="+" />
            <div className="flex items-center justify-center space-x-2">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-gray-700">Countries Travelled To</span>
            </div>
          </div>
          <div className="space-y-4">
            <AnimatedCounter end={50} suffix="K+" />
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-gray-700">Travel Community</span>
            </div>
          </div>
          <div className="space-y-4">
            <AnimatedCounter end={100} suffix="+" />
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-gray-700">Trip Blog</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}