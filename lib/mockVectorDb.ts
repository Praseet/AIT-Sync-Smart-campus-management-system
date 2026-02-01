import { SearchResult } from "../types";

// Simulated Knowledge Base (The "Vector Store")
const KNOWLEDGE_BASE = [
  { id: 'kb-1', source: 'Hostel Rules v2024', content: 'Hostel gates close strictly at 10:30 PM for all students. Late entry requires a warden pass.' },
  { id: 'kb-2', source: 'Hostel Rules v2024', content: 'Mess timings are: Breakfast 7:30-9:00 AM, Lunch 12:30-2:00 PM, Dinner 7:30-9:00 PM.' },
  { id: 'kb-3', source: 'Placement Policy', content: 'Students with a CGPA below 6.0 are not eligible for Tier-1 companies (Google, Microsoft).' },
  { id: 'kb-4', source: 'Placement Policy', content: 'Placement drive for Google starts on Nov 15th. Eligibility: No active backlogs.' },
  { id: 'kb-5', source: 'Faculty Directory', content: 'Dr. Rajesh Kumar (CS Dept) sits in Block A, Room 201. He is usually available from 10 AM to 12 PM.' },
  { id: 'kb-6', source: 'Faculty Directory', content: 'Prof. Anita Desai handles Digital Logic. Her lab is in Block B, Lab 2.' },
  { id: 'kb-7', source: 'Campus Map', content: 'The Library is located next to the Admin Block. Open 24x7 during exam weeks.' },
  { id: 'kb-8', source: 'Admin Procedures', content: 'To apply for leave, submit Form 4B on the portal 2 days in advance.' },
  { id: 'kb-9', source: 'Events', content: 'Hackathon 2024 registration ends tomorrow. Grand prize is 1 Lakh INR.' },
  { id: 'kb-10', source: 'Academics', content: 'Mid-term exams for 3rd year start next Monday. Schedule is available in the Notices tab.' },
];

/**
 * Simulates a Vector Search (Semantic Similarity)
 * In a real app, this would call OpenAI embeddings API + Pinecone/Milvus.
 * Here, we use simple keyword overlapping and random "similarity scores" to mock the effect.
 */
export const searchKnowledgeBase = async (query: string): Promise<SearchResult[]> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerQuery = query.toLowerCase();
  const keywords = lowerQuery.split(' ').filter(k => k.length > 3); // Filter short words

  const results = KNOWLEDGE_BASE.map(doc => {
    let score = 0;
    const lowerContent = doc.content.toLowerCase();
    
    // Simple matching logic
    if (lowerContent.includes(lowerQuery)) score += 0.5; // Exact phrase match
    keywords.forEach(word => {
      if (lowerContent.includes(word)) score += 0.2;
    });

    // Add some randomness to simulate "AI" variance
    if (score > 0) score += Math.random() * 0.1;

    return {
      id: doc.id,
      content: doc.content,
      source: doc.source,
      similarity: parseFloat(score.toFixed(2))
    };
  })
  .filter(r => r.similarity > 0.1) // Filter irrelevant
  .sort((a, b) => b.similarity - a.similarity)
  .slice(0, 3); // Top 3 chunks

  return results;
};

/**
 * Simulates LLM Generation
 */
export const generateBotResponse = async (query: string, context: SearchResult[]): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // "Typing" delay

  if (context.length === 0) {
    return "I couldn't find specific information about that in my knowledge base. Could you try rephrasing or asking something else about the campus?";
  }

  // Simple template-based response generation based on the top context
  const mainContext = context[0];
  
  const responses = [
    `Based on the ${mainContext.source}, ${mainContext.content}`,
    `According to campus records (${mainContext.source}): ${mainContext.content}`,
    `I found this: ${mainContext.content}`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};