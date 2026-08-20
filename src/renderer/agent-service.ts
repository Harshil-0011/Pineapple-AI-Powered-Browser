import { PagePerception, AgentAction, ChatMessage, AIConfig } from '../shared/types';

export class AgentService {
  private config: AIConfig = { provider: 'mock' };

  public setConfig(config: AIConfig) {
    this.config = config;
  }

  public async processRequest(
    userMessage: string,
    perception?: PagePerception
  ): Promise<{ text: string; action?: AgentAction }> {
    if (this.config.provider === 'mock') {
      return this.generateMockResponse(userMessage, perception);
    }
    return { text: `Provider ${this.config.provider} is configured. Outputting response for: "${userMessage}"` };
  }

  private generateMockResponse(
    userMessage: string,
    perception?: PagePerception
  ): { text: string; action?: AgentAction } {
    const lower = userMessage.toLowerCase();

    if (lower.includes('search') || lower.includes('google') || lower.includes('go to')) {
      const targetUrl = lower.includes('github') ? 'https://github.com' : 'https://www.google.com';
      return {
        text: `I will navigate to ${targetUrl} for you.`,
        action: {
          type: 'navigate',
          url: targetUrl,
          reasoning: `User requested to navigate to ${targetUrl}`,
        },
      };
    }

    if (perception && perception.elements.length > 0 && (lower.includes('click') || lower.includes('press'))) {
      const firstEl = perception.elements[0];
      return {
        text: `Clicking on element [Ref ${firstEl.ref}] "${firstEl.text || firstEl.tagName}" on the active page.`,
        action: {
          type: 'click',
          ref: firstEl.ref,
          reasoning: `User requested a click action on ${firstEl.tagName}`,
        },
      };
    }

    return {
      text: `I see the active page "${perception?.title || 'Blank'}" with ${perception?.elements.length || 0} interactive controls. How can I assist you further?`,
    };
  }
}

export const agentService = new AgentService();
