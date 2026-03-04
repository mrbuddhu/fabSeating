import { readFile } from 'fs/promises'
import path from 'path'

function extractBody(html: string) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  return bodyMatch ? bodyMatch[1] : html
}

function stripNonArticleChrome(bodyHtml: string) {
  return (
    bodyHtml
      // Remove embedded chrome (we use the site header/footer instead)
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<header[\s\S]*?<\/header>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      // Remove progress bars / reading widgets
      .replace(
        /<div[^>]*\bid\s*=\s*"(?:prog|bar|progress-bar)"[^>]*>[\s\S]*?<\/div>/gi,
        '',
      )
      // Remove scripts (scroll reveal, progress, etc.)
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      // Avoid nested <main> in our page
      .replace(/<\/?main\b[^>]*>/gi, '')
  )
}

export async function loadBlogPostBodyHtml(htmlFile: string) {
  const filePath = path.join(process.cwd(), 'public', 'blog', htmlFile)
  const full = await readFile(filePath, 'utf8')

  const body = extractBody(full)
  const cleaned = stripNonArticleChrome(body).trim()

  return cleaned
}

