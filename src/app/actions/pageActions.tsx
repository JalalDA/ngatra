'use server';
// import { prisma } from '@/lib/prisma';

interface PageInput {
  title: string;
  content: string;
}

export async function createNewPage({ title, content }: PageInput): Promise<void> {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

//   await prisma.page.create({
//     data: {
//       title,
//       slug,
//       content,
//     },
//   });
}
