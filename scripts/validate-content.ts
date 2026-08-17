import { experience } from '../src/content/experience';
import { projects } from '../src/content/projects';

function sentenceCount(text: string): number {
  return text
    .split(/[。！？.!?]/)
    .map((part) => part.trim())
    .filter(Boolean).length;
}

for (const item of experience) {
  if (item.kind !== 'internship') {
    continue;
  }

  if (!item.bullets || item.bullets.length > 4) {
    throw new Error(`${item.org} has too many bullets or missing bullets`);
  }

  for (const bullet of item.bullets) {
    if (sentenceCount(bullet) > 2) {
      throw new Error(`${item.org} bullet is too long: ${bullet}`);
    }
  }
}

if (!projects.some((project) => project.slug === 'design-award-meta-search')) {
  throw new Error('Missing featured project: design-award-meta-search');
}
