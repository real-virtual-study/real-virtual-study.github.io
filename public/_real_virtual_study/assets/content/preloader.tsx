import { useEffect, useState } from 'react';

// Define props for TypeScript to avoid errors
interface RevisitComponentProps {
    parameters?: Record<string, any>;
    next: (response?: any) => void;
}

// Full list of videos (paths adjusted relative to public root)
const videoList: string[] = [
    "_real_virtual_study/assets/sample-stimuli/lemon_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/hairdryer_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/pen_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/hanger_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/example-video.mp4",
    "_real_virtual_study/assets/sample-stimuli/apple_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/computer-mouse_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/screwdriver_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/keys_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/cup_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/toothbrush_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/candle_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/paint-palette_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/cup_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/candle_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/hairdryer_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/book_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/usb-drive_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/clock_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/book_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/screwdriver_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/tin-can_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/calculator_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/banana_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/screwdriver_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/usb-drive_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/hanger_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/cup_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/computer-mouse_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/calculator_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/candle_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/computer-mouse_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/pen_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/lighter_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/paint-palette_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/box-cutter_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/scissors_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/sunglasses_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/rubber-duck_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/apple_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/apple_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/book_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/pen_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/usb-drive_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/serving-spoon_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/tin-can_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/hairdryer_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/box-cutter_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/sunglasses_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/scissors_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/lighter_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/sunglasses_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/keys_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/box-cutter_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/lemon_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/banana_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/lighter_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/toothbrush_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/serving-spoon_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/lemon_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/banana_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/paint-palette_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/tin-can_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/rubber-duck_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/rubber-duck_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/calculator_15.mp4",
    "_real_virtual_study/assets/sample-stimuli/clock_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/keys_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/hanger_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/toothbrush_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/serving-spoon_65.mp4",
    "_real_virtual_study/assets/sample-stimuli/clock_100.mp4",
    "_real_virtual_study/assets/sample-stimuli/scissors_100.mp4"
];

export default function Preloader({ next }: RevisitComponentProps) {
    const [loaded, setLoaded] = useState<number>(0);
    const [errors, setErrors] = useState<number>(0);

    useEffect(() => {
        // Initiate fetch for every video in the list
        videoList.forEach((url) => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) throw new Error("HTTP error");
                    setLoaded((prev) => prev + 1);
                })
                .catch((e) => {
                    console.error(`Failed to load: ${url}`, e);
                    setErrors((prev) => prev + 1);
                });
        });
    }, []);

    const total = videoList.length;
    // Progress only counts successful loads for the bar, but logic accounts for errors to avoid getting stuck
    const progress = total > 0 ? Math.round((loaded / total) * 100) : 0;
    const isComplete = (loaded + errors) === total && total > 0;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'system-ui, sans-serif'
        }}>
            <h1 style={{ marginBottom: '10px' }}>Loading Study Assets...</h1>
            <p style={{ color: '#666', marginBottom: '20px' }}>
                Please wait while we prepare the videos.
            </p>

            {/* Progress Bar Container */}
            <div style={{
                width: '400px',
                height: '24px',
                background: '#e0e0e0',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
            }}>
                {/* Progress Fill */}
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: '#3b82f6', // Nice blue color
                    transition: 'width 0.3s ease-out'
                }} />
            </div>

            <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                {loaded} / {total} videos loaded {errors > 0 && <span style={{color:'red'}}>({errors} failed)</span>}
            </p>

            {/* Start Button - appears when finished */}
            <div style={{ height: '50px', marginTop: '20px' }}>
                {isComplete && (
                    <button
                        onClick={() => next()}
                        style={{
                            padding: '12px 30px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: 'white',
                            backgroundColor: '#10b981', // Green
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                    >
                        Start Experiment
                    </button>
                )}
            </div>
        </div>
    );
}