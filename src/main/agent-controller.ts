import { PagePerception, AgentAction } from '../shared/types';

export interface AgentProcessResult {
  text: string;
  action?: AgentAction;
}

export class MainAgentController {
  public async processRequest(
    userMessage: string,
    perception?: PagePerception
  ): Promise<AgentProcessResult> {
    const lower = userMessage.toLowerCase();

    if (lower.includes('search') || lower.includes('google') || lower.includes('go to')) {
      const targetUrl = lower.includes('github') ? 'https://github.com' : 'https://www.google.com';
      return {
        text: `Navigating browser view to ${targetUrl}`,
        action: {
          type: 'navigate',
          url: targetUrl,
          reasoning: `Main Process Agent executing navigation to ${targetUrl}`,
        },
      };
    }

    if (perception && perception.elements.length > 0 && (lower.includes('click') || lower.includes('press'))) {
      const firstEl = perception.elements[0];
      return {
        text: `Main process clicking interactive element [Ref ${firstEl.ref}] <${firstEl.tagName}>`,
        action: {
          type: 'click',
          ref: firstEl.ref,
          reasoning: `Main Process Agent executing click on element ${firstEl.ref}`,
        },
      };
    }

    return {
      text: `Backend Main Agent analyzed active page "${perception?.title || 'Blank'}" (${perception?.elements.length || 0} DOM references captured). Ready for commands.`,
    };
  }
}

export const mainAgentController = new MainAgentController();
