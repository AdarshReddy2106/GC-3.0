import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
  stagger = true
}) => {
  const ref = useRef(null);
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element || !text) return;

    const startPct = (1 - threshold) * 100;
    const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');
    const mv = mm ? parseFloat(mm[1]) : 0;
    const mu = mm ? mm[2] || 'px' : 'px';
    const sign = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
    const start = `top ${startPct}%${sign}`;

    const chars = element.querySelectorAll('.split-char');
    const totalChars = chars.length;

    gsap.fromTo(
      chars,
      from,
      {
        ...to,
        duration,
        ease,
        stagger: stagger ? delay / 1000 : 0,
        scrollTrigger: {
          trigger: element,
          start,
          once: true,
          toggleActions: 'play none none none'
        },
        onUpdate: function() {
          const progress = this.progress();
          const currentAnimated = Math.floor(progress * totalChars);
          setAnimatedCount(currentAnimated);
        },
        onComplete: () => {
          setAnimatedCount(totalChars);
          if (onLetterAnimationComplete) {
            onLetterAnimationComplete();
          }
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [text, delay, duration, ease, from, to, threshold, rootMargin, stagger, onLetterAnimationComplete]);

  const renderText = () => {
    if (splitType === 'chars') {
      return text.split('').map((char, index) => (
        <span key={index} className="split-char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }
    return text;
  };

  return (
    <div ref={ref} className={className} style={{ textAlign }}>
      {renderText()}
    </div>
  );
};

export default SplitText;
