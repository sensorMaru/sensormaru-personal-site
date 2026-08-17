import { internships } from '../src/content/internships';
import { projects } from '../src/content/projects';

function sentenceCount(text: string): number {
  return text
    .split(/[。！？.!?]/)
    .map((part) => part.trim())
    .filter(Boolean).length;
}

for (const company of internships) {
  if (company.bullets.length > 4) {
    throw new Error(`${company.company} has too many bullets`);
  }

  for (const bullet of company.bullets) {
    if (sentenceCount(bullet) > 2) {
      throw new Error(`${company.company} bullet is too long: ${bullet}`);
    }
  }
}

if (!projects.some((project) => project.slug === 'design-award-meta-search')) {
  throw new Error('Missing featured project: design-award-meta-search');
}
