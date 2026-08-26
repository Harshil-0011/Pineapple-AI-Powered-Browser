import { contextBridge, ipcRenderer } from 'electron';
import { Tab, PagePerception, AgentAction } from '../shared/types';

contextBridge.exposeInMainWorld('pineapple', {
  createTab: (url?: string): Promise<Tab> => ipcRenderer.invoke('tab:create', url),
  closeTab: (id: string): Promise<void> => ipcRenderer.invoke('tab:close', id),
  switchTab: (id: string): Promise<void> => ipcRenderer.invoke('tab:switch', id),
  navigateTab: (id: string, url: string): Promise<void> => ipcRenderer.invoke('tab:navigate', id, url),
  goBack: (id: string): Promise<void> => ipcRenderer.invoke('tab:goBack', id),
  goForward: (id: string): Promise<void> => ipcRenderer.invoke('tab:goForward', id),
  reloadTab: (id: string): Promise<void> => ipcRenderer.invoke('tab:reload', id),
  getPerception: (id: string): Promise<PagePerception> => ipcRenderer.invoke('tab:getPerception', id),
  executeAction: (id: string, action: AgentAction): Promise<boolean> => ipcRenderer.invoke('tab:executeAction', id, action),
  processAgentRequest: (message: string, perception?: PagePerception) => ipcRenderer.invoke('agent:processRequest', message, perception),
  updateViewportBounds: (bounds: { x: number; y: number; width: number; height: number }): Promise<void> => ipcRenderer.invoke('viewport:updateBounds', bounds),
  onTabUpdated: (callback: (tab: Tab) => void) => {
    const handler = (_: any, tab: Tab) => callback(tab);
    ipcRenderer.on('tab:updated', handler);
    return () => ipcRenderer.removeListener('tab:updated', handler);
  },
  onTabsChanged: (callback: (tabs: Tab[], activeTabId: string) => void) => {
    const handler = (_: any, tabs: Tab[], activeTabId: string) => callback(tabs, activeTabId);
    ipcRenderer.on('tabs:changed', handler);
    return () => ipcRenderer.removeListener('tabs:changed', handler);
  },
});
