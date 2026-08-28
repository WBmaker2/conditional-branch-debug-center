import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../../src/app/App';
import { driveToReport } from '../../src/test/driveApp';

// 계획 §11: window.fetch, XMLHttpRequest, WebSocket, EventSource, sendBeacon 차단·감시,
// localStorage·sessionStorage·IndexedDB·document.cookie 쓰기 금지. 외부 요청 0건을 요구한다.
describe('런타임 경계: 네트워크·저장소·쿠키 쓰기 0건', () => {
  let networkCalls: string[];
  let storageWrites: string[];
  let cookieWrites: string[];

  beforeEach(() => {
    networkCalls = [];
    storageWrites = [];
    cookieWrites = [];

    vi.stubGlobal(
      'fetch',
      vi.fn((...args: unknown[]) => {
        networkCalls.push(`fetch:${JSON.stringify(args[0])}`);
        return Promise.reject(new Error('네트워크 금지'));
      }),
    );
    vi.stubGlobal(
      'XMLHttpRequest',
      vi.fn(function XMLHttpRequestCtor() {
        networkCalls.push('XMLHttpRequest');
      }),
    );
    vi.stubGlobal(
      'WebSocket',
      vi.fn(function WebSocketCtor() {
        networkCalls.push('WebSocket');
        return {};
      }),
    );
    vi.stubGlobal(
      'EventSource',
      vi.fn(function EventSourceCtor() {
        networkCalls.push('EventSource');
        return { close() {} };
      }),
    );
    Object.defineProperty(navigator, 'sendBeacon', {
      configurable: true,
      value: vi.fn(() => {
        networkCalls.push('sendBeacon');
        return true;
      }),
    });

    const makeStorage = (label: string) => ({
      getItem: vi.fn(() => null),
      setItem: vi.fn(() => {
        storageWrites.push(label);
      }),
      removeItem: vi.fn(),
      clear: vi.fn(() => {
        storageWrites.push(label);
      }),
      key: vi.fn(() => null),
      length: 0,
    });
    Object.defineProperty(window, 'localStorage', { configurable: true, value: makeStorage('local') });
    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      value: makeStorage('session'),
    });
    Object.defineProperty(window, 'indexedDB', {
      configurable: true,
      value: {
        open: vi.fn(() => {
          storageWrites.push('indexedDB');
          return {};
        }),
      },
    });

    let cookieValue = '';
    Object.defineProperty(document, 'cookie', {
      configurable: true,
      get: () => cookieValue,
      set: (value: string) => {
        cookieWrites.push(String(value));
        cookieValue = String(value);
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('입구부터 디버그 기록까지 네트워크 요청이 0건이다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await driveToReport(user);
    expect(networkCalls).toEqual([]);
  });

  it('재시작 확인까지 전체 흐름에서 저장소·쿠키 쓰기가 0건이다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await driveToReport(user);
    await user.click(screen.getByRole('button', { name: '처음부터 다시 하기' }));
    await user.click(screen.getByRole('button', { name: '네, 새로 시작해요' }));
    await user.click(screen.getByRole('button', { name: '업데이트 내역' }));
    await user.keyboard('{Escape}');
    expect(storageWrites).toEqual([]);
    expect(cookieWrites).toEqual([]);
  });
});
