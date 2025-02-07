import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors have different dimensions')
  }
  let dotProduct = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }
  normA = Math.sqrt(normA)
  normB = Math.sqrt(normB)
  return dotProduct / (normA * normB)
}

export function findRelevantChunks(queryEmbedding, embeddingsArray, topK = 3) {
  // embeddingsArray = [{ chunk, embedding: [0.0123, ...] }, ...]
  const scoredChunks = embeddingsArray.map((item) => {
    const sim = cosineSimilarity(queryEmbedding, item.embedding)
    return { ...item, similarity: sim }
  })

  // sort descending by similarity
  scoredChunks.sort((a, b) => b.similarity - a.similarity)

  // return the top K
  return scoredChunks.slice(0, topK)
}
