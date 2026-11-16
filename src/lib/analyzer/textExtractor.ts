import mammoth from "mammoth";

export async function extractTextFromFile(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "txt" || extension === "md") {
    return await file.text();
  }

  if (extension === "docx") {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return cleanExtractedText(result.value);
  }

  if (extension === "pdf") {
    // PDF extraction fallback: reads arrayBuffer and extracts ASCII/UTF-8 textual streams
    // This provides fast, zero-dependency client-side PDF parsing safe on Vercel without node canvas binary issues
    const arrayBuffer = await file.arrayBuffer();
    const text = extractTextFromPdfBuffer(arrayBuffer);
    if (text && text.trim().length > 30) {
      return cleanExtractedText(text);
    }
    // If raw extraction got very little, attempt readable ASCII chunks
    const fallbackText = extractAsciiChunks(arrayBuffer);
    return cleanExtractedText(fallbackText);
  }

  // Generic fallback
  return await file.text();
}

function cleanExtractedText(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractTextFromPdfBuffer(buffer: ArrayBuffer): string {
  const uint8 = new Uint8Array(buffer);
  let rawStr = "";
  const chunkSize = 65536;
  for (let i = 0; i < uint8.length; i += chunkSize) {
    const chunk = uint8.subarray(i, i + chunkSize);
    rawStr += String.fromCharCode.apply(null, Array.from(chunk));
  }

  // Find PDF text objects within BT (begin text) and ET (end text) blocks
  const textMatches: string[] = [];
  const btRegex = /BT([\s\S]*?)ET/g;
  let match;
  while ((match = btRegex.exec(rawStr)) !== null) {
    const block = match[1];
    // Find text inside parentheses: (text) Tj or ' or "
    const tjRegex = /\(([^)]+)\)\s*(?:Tj|'|")/g;
    let textMatch;
    while ((textMatch = tjRegex.exec(block)) !== null) {
      const decoded = textMatch[1]
        .replace(/\\([()\\])/g, "$1")
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "")
        .replace(/\\t/g, " ");
      textMatches.push(decoded);
    }

    // TJ array syntax: [ (part 1) 20 (part 2) ] TJ
    const tjArrayRegex = /\[([^\]]+)\]\s*TJ/g;
    let arrayMatch;
    while ((arrayMatch = tjArrayRegex.exec(block)) !== null) {
      const items = arrayMatch[1];
      const partRegex = /\(([^)]+)\)/g;
      let part;
      let combined = "";
      while ((part = partRegex.exec(items)) !== null) {
        combined += part[1];
      }
      if (combined) {
        textMatches.push(combined);
      }
    }
  }

  if (textMatches.length > 0) {
    return textMatches.join(" ");
  }

  return "";
}

function extractAsciiChunks(buffer: ArrayBuffer): string {
  const uint8 = new Uint8Array(buffer);
  let result = "";
  let currentWord = "";

  for (let i = 0; i < uint8.length; i++) {
    const byte = uint8[i];
    // Printable ASCII or newline/tab
    if ((byte >= 32 && byte <= 126) || byte === 10 || byte === 13) {
      currentWord += String.fromCharCode(byte);
    } else {
      if (currentWord.length >= 3) {
        result += currentWord + " ";
      }
      currentWord = "";
    }
  }
  if (currentWord.length >= 3) {
    result += currentWord;
  }
  return result;
}
