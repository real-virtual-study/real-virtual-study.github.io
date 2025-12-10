import { useEffect, useState, useRef } from 'react';

// FIX 1: Removed 'parameters' from the interface to stop the unused prop warning
interface RevisitComponentProps {
    next: (response?: Record<string, unknown>) => void;
}

// Full list of videos
const videoList: string[] = [
  '_real_virtual_study/assets/sample-stimuli/lemon_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/hairdryer_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/pen_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/hanger_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/example-video.mp4',
  '_real_virtual_study/assets/sample-stimuli/apple_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/computer-mouse_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/screwdriver_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/keys_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/cup_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/toothbrush_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/candle_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/paint-palette_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/cup_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/candle_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/hairdryer_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/book_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/usb-drive_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/clock_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/book_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/screwdriver_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/tin-can_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/calculator_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/banana_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/screwdriver_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/usb-drive_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/hanger_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/cup_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/computer-mouse_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/calculator_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/candle_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/computer-mouse_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/pen_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/lighter_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/paint-palette_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/box-cutter_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/scissors_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/sunglasses_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/rubber-duck_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/apple_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/apple_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/book_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/pen_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/usb-drive_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/serving-spoon_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/tin-can_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/hairdryer_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/box-cutter_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/sunglasses_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/scissors_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/lighter_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/sunglasses_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/keys_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/box-cutter_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/lemon_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/banana_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/lighter_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/toothbrush_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/serving-spoon_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/lemon_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/banana_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/paint-palette_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/tin-can_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/rubber-duck_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/rubber-duck_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/calculator_15.mp4',
  '_real_virtual_study/assets/sample-stimuli/clock_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/keys_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/hanger_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/toothbrush_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/serving-spoon_65.mp4',
  '_real_virtual_study/assets/sample-stimuli/clock_100.mp4',
  '_real_virtual_study/assets/sample-stimuli/scissors_100.mp4',
];

// FIX 2: We rename 'next' to '_next'. The underscore tells ESLint "Ignore that this is unused".
export default function Preloader({ next: _next }: RevisitComponentProps) {
  const [loaded, setLoaded] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const downloadStarted = useRef(false);

  useEffect(() => {
    if (downloadStarted.current) return;
    downloadStarted.current = true;

    videoList.forEach((url) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error('HTTP error');
          setLoaded((prev) => prev + 1);
        })
        .catch((e) => {
          console.error(`Failed to load: ${url}`, e);
          setErrors((prev) => prev + 1);
        });
    });
  }, []);

  const total = videoList.length;
  const rawPercentage = total > 0 ? (loaded / total) * 100 : 0;
  const progress = Math.min(Math.round(rawPercentage), 100);
  const isComplete = (loaded + errors) >= total && total > 0;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '20px',
      textAlign: 'center',
    }}
    >
      <h2 style={{ marginBottom: '20px', fontWeight: 'normal' }}>
        Wait for the next button to be activated to continue, files are loading...
      </h2>

      <div style={{
        width: '100%',
        maxWidth: '400px',
        height: '10px',
        background: '#e0e0e0',
        borderRadius: '5px',
        overflow: 'hidden',
        marginBottom: '10px',
      }}
      >
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: isComplete ? '#10b981' : '#3b82f6',
          transition: 'width 0.3s ease-out',
        }}
        />
      </div>

      <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '30px' }}>
        {progress}
        %
      </p>
    </div>
  );
}
