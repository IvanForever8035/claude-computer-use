import type { Register } from 'claude-code'

const server = 'plugin:computer-use:desktop'

export const register: Register = (on) => {
  // The backend decides whether anything is safe to restore: it only acts when an
  // activation by this plugin recorded the terminal and the app still holds focus.
  on('turn.complete', async ($, e, next) => {
    const answer = await next(e)
    try {
      await $.mcp.call(server, 'desktop_finish', {})
    } catch {
      // A disconnected backend must not affect the completed answer.
    }
    return answer
  })
}
