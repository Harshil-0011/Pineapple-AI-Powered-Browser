import { app, BrowserWindow, BrowserView, ipcMain } from 'electron';
import * as path from 'path';
import { Tab, PagePerception, AgentAction } from '../shared/types';

interface TabView {
  id: string;
  url: string;
  title: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  view: BrowserView;
  isSleeping: boolean;
  lastActiveAt: number;
}

class PineappleBrowserMain {
  private mainWindow: BrowserWindow | null = null;
  private tabs: Map<string, TabView> = new Map();
  private activeTabId: string | null = null;
  private sidebarWidth: number = 380; // Left companion sidebar width in pixels

  public async init(): Promise<void> {
    await app.whenReady();
    this.createMainWindow();
    this.registerIPCHandlers();
    this.startMemorySaverLoop();

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createMainWindow();
      }
    });
  }

  private createMainWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      minWidth: 900,
      minHeight: 600,
      title: 'Pineapple AI Browser',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false,
      },
    });

    // In development or production, load the renderer entrypoint
    const isDev = !app.isPackaged && process.env.NODE_ENV !== 'production';
    if (isDev && process.env.VITE_DEV_SERVER_URL) {
      this.mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
      this.mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    }

    this.mainWindow.on('resize', () => {
      this.updateActiveViewBounds();
    });

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    // Create initial tab
    this.createTab('https://www.google.com');
  }

  private updateActiveViewBounds(): void {
    if (!this.mainWindow || !this.activeTabId) return;
    const tabView = this.tabs.get(this.activeTabId);
    if (!tabView) return;

    const [width, height] = this.mainWindow.getContentSize();
    // Top bar offset (for tab bar + address bar) = 85px
    const topBarHeight = 85;
    tabView.view.setBounds({
      x: this.sidebarWidth,
      y: topBarHeight,
      width: Math.max(100, width - this.sidebarWidth),
      height: Math.max(100, height - topBarHeight),
    });
  }

  private createTab(initialUrl: string = 'https://www.google.com'): Tab {
    const id = `tab_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const view = new BrowserView({
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
      },
    });

    const formattedUrl = this.formatUrl(initialUrl);

    const tabView: TabView = {
      id,
      url: formattedUrl,
      title: 'New Tab',
      isLoading: true,
      canGoBack: false,
      canGoForward: false,
      view,
      isSleeping: false,
      lastActiveAt: Date.now(),
    };

    this.tabs.set(id, tabView);

    view.webContents.on('did-start-loading', () => {
      tabView.isLoading = true;
      this.notifyTabUpdated(tabView);
    });

    view.webContents.on('did-finish-load', () => {
      tabView.isLoading = false;
      tabView.title = view.webContents.getTitle() || tabView.url;
      tabView.canGoBack = view.webContents.canGoBack();
      tabView.canGoForward = view.webContents.canGoForward();
      this.notifyTabUpdated(tabView);
      this.tagInteractiveElements(view);
    });

    view.webContents.on('page-title-updated', (_, title) => {
      tabView.title = title;
      this.notifyTabUpdated(tabView);
    });

    view.webContents.loadURL(formattedUrl);
    this.switchTab(id);
    this.notifyTabsChanged();

    return this.getPublicTab(tabView);
  }

  private switchTab(id: string): void {
    if (!this.mainWindow || !this.tabs.has(id)) return;

    // Remove active view if any
    if (this.activeTabId && this.tabs.has(this.activeTabId)) {
      const activeView = this.tabs.get(this.activeTabId)!;
      this.mainWindow.removeBrowserView(activeView.view);
    }

    this.activeTabId = id;
    const targetTab = this.tabs.get(id)!;
    targetTab.lastActiveAt = Date.now();

    // If target tab was sleeping, wake it up
    if (targetTab.isSleeping) {
      targetTab.isSleeping = false;
      targetTab.view.webContents.loadURL(targetTab.url);
    }

    this.mainWindow.addBrowserView(targetTab.view);
    this.updateActiveViewBounds();
    this.notifyTabsChanged();
  }

  private closeTab(id: string): void {
    if (!this.tabs.has(id)) return;
    const tabView = this.tabs.get(id)!;

    if (this.mainWindow && this.activeTabId === id) {
      this.mainWindow.removeBrowserView(tabView.view);
    }

    (tabView.view.webContents as any).destroy?.();
    this.tabs.delete(id);

    const tabIds = Array.from(this.tabs.keys());
    if (tabIds.length > 0) {
      this.switchTab(tabIds[tabIds.length - 1]);
    } else {
      this.activeTabId = null;
      this.createTab('https://www.google.com');
    }

    this.notifyTabsChanged();
  }

  private navigateTab(id: string, url: string): void {
    const tabView = this.tabs.get(id);
    if (!tabView) return;
    const formattedUrl = this.formatUrl(url);
    tabView.url = formattedUrl;
    tabView.view.webContents.loadURL(formattedUrl);
  }

  private formatUrl(input: string): string {
    const trimmed = input.trim();
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    if (trimmed.includes('.') && !trimmed.includes(' ')) {
      return `https://${trimmed}`;
    }
    return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
  }

  private tagInteractiveElements(view: BrowserView): void {
    const tagScript = `
      (function() {
        let count = 1;
        const elements = document.querySelectorAll('button, a, input, select, textarea, [role="button"], [role="link"]');
        elements.forEach((el) => {
          if (!el.hasAttribute('data-pineapple-ref')) {
            el.setAttribute('data-pineapple-ref', count.toString());
            count++;
          }
        });
      })();
    `;
    view.webContents.executeJavaScript(tagScript).catch(() => {});
  }

  private async getPagePerception(id: string): Promise<PagePerception> {
    const tabView = this.tabs.get(id);
    if (!tabView) {
      return { tabId: id, url: '', title: '', elements: [], serializedPrompt: 'Tab not found' };
    }

    const script = `
      (function() {
        const results = [];
        const elements = document.querySelectorAll('[data-pineapple-ref]');
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            results.push({
              ref: parseInt(el.getAttribute('data-pineapple-ref') || '0', 10),
              tagName: el.tagName.toLowerCase(),
              role: el.getAttribute('role') || el.tagName.toLowerCase(),
              text: (el.textContent || el.value || '').trim().slice(0, 100),
              value: el.value || undefined,
              bounds: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
            });
          }
        });
        return results;
      })();
    `;

    try {
      const elements = await tabView.view.webContents.executeJavaScript(script);
      const serialized = elements
        .map((e: any) => `[Ref ${e.ref}] <${e.tagName}> "${e.text}"`)
        .join('\n');

      return {
        tabId: id,
        url: tabView.url,
        title: tabView.title,
        elements,
        serializedPrompt: `Active Page: ${tabView.title}\nURL: ${tabView.url}\nInteractive Controls:\n${serialized}`,
      };
    } catch {
      return { tabId: id, url: tabView.url, title: tabView.title, elements: [], serializedPrompt: 'Failed to inspect page DOM' };
    }
  }

  private async executeAgentAction(id: string, action: AgentAction): Promise<boolean> {
    const tabView = this.tabs.get(id);
    if (!tabView) return false;

    if (action.type === 'navigate' && action.url) {
      this.navigateTab(id, action.url);
      return true;
    }

    if (action.type === 'click' && action.ref !== undefined) {
      const script = `
        (function() {
          const el = document.querySelector('[data-pineapple-ref="${action.ref}"]');
          if (el) {
            el.click();
            return true;
          }
          return false;
        })();
      `;
      return await tabView.view.webContents.executeJavaScript(script);
    }

    if (action.type === 'type' && action.ref !== undefined && action.text) {
      const script = `
        (function() {
          const el = document.querySelector('[data-pineapple-ref="${action.ref}"]');
          if (el) {
            el.focus();
            el.value = "${action.text.replace(/"/g, '\\"')}";
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
          }
          return false;
        })();
      `;
      return await tabView.view.webContents.executeJavaScript(script);
    }

    return true;
  }

  private startMemorySaverLoop(): void {
    // Check inactive tabs every 2 minutes. Sleep tabs idle for > 15 minutes.
    setInterval(() => {
      const now = Date.now();
      const SLEEP_THRESHOLD = 15 * 60 * 1000;
      this.tabs.forEach((tabView, id) => {
        if (id !== this.activeTabId && !tabView.isSleeping && now - tabView.lastActiveAt > SLEEP_THRESHOLD) {
          tabView.isSleeping = true;
          tabView.view.webContents.loadURL('about:blank');
          this.notifyTabUpdated(tabView);
        }
      });
    }, 2 * 60 * 1000);
  }

  private getPublicTab(tabView: TabView): Tab {
    return {
      id: tabView.id,
      url: tabView.url,
      title: tabView.title,
      isLoading: tabView.isLoading,
      canGoBack: tabView.canGoBack,
      canGoForward: tabView.canGoForward,
      isSleeping: tabView.isSleeping,
    };
  }

  private notifyTabUpdated(tabView: TabView): void {
    if (this.mainWindow) {
      this.mainWindow.webContents.send('tab:updated', this.getPublicTab(tabView));
    }
  }

  private notifyTabsChanged(): void {
    if (this.mainWindow) {
      const publicTabs = Array.from(this.tabs.values()).map((t) => this.getPublicTab(t));
      this.mainWindow.webContents.send('tabs:changed', publicTabs, this.activeTabId);
    }
  }

  private registerIPCHandlers(): void {
    ipcMain.handle('tab:create', (_, url) => this.createTab(url));
    ipcMain.handle('tab:close', (_, id) => this.closeTab(id));
    ipcMain.handle('tab:switch', (_, id) => this.switchTab(id));
    ipcMain.handle('tab:navigate', (_, id, url) => this.navigateTab(id, url));
    ipcMain.handle('tab:goBack', (_, id) => {
      const t = this.tabs.get(id);
      if (t && t.view.webContents.canGoBack()) t.view.webContents.goBack();
    });
    ipcMain.handle('tab:goForward', (_, id) => {
      const t = this.tabs.get(id);
      if (t && t.view.webContents.canGoForward()) t.view.webContents.goForward();
    });
    ipcMain.handle('tab:reload', (_, id) => {
      const t = this.tabs.get(id);
      if (t) t.view.webContents.reload();
    });
    ipcMain.handle('tab:getPerception', (_, id) => this.getPagePerception(id));
    ipcMain.handle('tab:executeAction', (_, id, action) => this.executeAgentAction(id, action));
  }
}

new PineappleBrowserMain().init();
