// Define interfaces to avoid "any" errors
interface StudyContext {
    customParameters?: Record<string, string>;
}

interface Assignment {
    participantId: number;
    group: number;
}

const assignments: Assignment[] = [
  { participantId: 1, group: 1 },
  { participantId: 2, group: 2 },
  { participantId: 3, group: 3 },
  { participantId: 4, group: 4 },
  { participantId: 5, group: 1 },
  { participantId: 6, group: 2 },
  { participantId: 7, group: 3 },
  { participantId: 8, group: 4 },
];

const videoList: Record<string, string[]> = {
  1: ['assets/videos/group1/apple_15.mp4'],
  2: ['assets/videos/group2/apple_65.mp4'],
  3: ['assets/videos/group3/apple_100.mp4'],
  4: ['assets/videos/group4/banana_15.mp4'],
};

function hashString(str: string): number {
  let hash = 0;
  // Fix: Use i += 1 instead of i++ (no-plusplus rule)
  for (let i = 0; i < str.length; i += 1) {
    // Fix: Allow bitwise operator only for this line
    // eslint-disable-next-line no-bitwise
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function deterministicShuffle<T>(array: T[], seed: string): T[] {
  const result = array.slice();
  let random = hashString(seed);
  // Fix: Use i -= 1 instead of i-- (no-plusplus rule)
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = random % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
    // eslint-disable-next-line no-bitwise
    random = (random * 31 + i) >>> 0;
  }
  return result;
}

// Fix: Removed "unused function" error by ensuring it is exported clearly
// Fix: Use StudyContext interface instead of 'any'
export function dynamicVideos(context: StudyContext) {
  // Fix: Use console.warn because console.log is banned
  console.warn('--- DYNAMIC BLOCK TRIGGERED ---');

  const customParameters = context.customParameters || {};
  const prolificId = customParameters.PROLIFIC_PID || 'TEST_DEV_ID';

  console.warn('Using Prolific ID:', prolificId);

  const index = hashString(prolificId) % assignments.length;
  const row = assignments[index];
  const group = String(row.group);

  console.warn('Assigned Group:', group);

  let videos = videoList[group];

  if (!videos) {
    console.error(`ERROR: No videos found for group ${group}`);
    return [];
  }

  videos = deterministicShuffle(videos, prolificId);

  const videoTrials = videos.map((videoPath, i) => ({
    id: `video_${group}_${i + 1}`,
    type: 'video',
    path: videoPath,
    description: 'Sample video stimulus',
    instruction: 'Please watch the video.',
    nextButtonLocation: 'sidebar',
    response: [
      {
        id: `video_${group}_${i + 1}_sidebar`,
        type: 'textOnly',
        location: 'sidebar',
        prompt: 'Click Next when done.',
      },
    ],
  }));

  console.warn(`Generated ${videoTrials.length} trials.`);
  return videoTrials;
}
