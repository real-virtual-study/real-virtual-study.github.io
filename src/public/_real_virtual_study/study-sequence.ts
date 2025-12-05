// assets/study-sequence.ts

// 1. Your Master List of ALL trials
const allTrials = [
  // --- Group A Trials ---
  {
    id: 'trial1A', group: 'A', object: 'banana', source: 'real', path: 'banana_100.mp4',
  },
  {
    id: 'trial2A', group: 'A', object: 'banana', source: 'virtual', path: 'banana_15.mp4',
  },

  // --- Group B Trials ---
  {
    id: 'trial1B', group: 'B', object: 'apple', source: 'real', path: 'apple_65.mp4',
  },
  {
    id: 'trial2B', group: 'B', object: 'apple', source: 'virtual', path: 'apple_100.mp4',
  },

  // ... Group C, D ...
];

// 2. The Generator Function accepting arguments
export default async function* studySequence(context: any, props: any) {
  // "props.group" comes from your study.json
  const targetGroup = props.group;

  // Filter the list to only get trials for this group
  const selectedTrials = allTrials.filter((t) => t.group === targetGroup);

  for (const trial of selectedTrials) {
    // --- A. The Video ---
    yield {
      baseComponent: 'base-video-trial',
      path: `_real_virtual_study/assets/sample-stimuli/${trial.path}`,
    };

    // --- B. The Recognition Question ---
    yield {
      baseComponent: 'recognition-question',
      parameters: {
        correct_object: trial.object,
      },
    };

    // --- C. The Feedback (Conditional) ---
    yield {
      order: 'fixed',
      components: [
        {
          baseComponent: 'base-feedback',
          parameters: { correct_object: trial.object },
        },
      ],
      skip: {
        check: 'response',
        id: 'recog-q',
        value: trial.object,
      },
    };

    // --- D. Identification Question (from your previous script) ---
    yield {
      baseComponent: 'identification-question',
      // Add parameters here if this question also needs dynamic data
    };
  }
}
