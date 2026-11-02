/**
 * Shared order draft — the single source of truth for "what the visitor picked".
 *
 * Step 1 (`/catalog`) only writes empty quantity lines (`qty: ''`).
 * Step 2 (`/order`) is the ONLY place a quantity is ever entered.
 * Both pages read/write the same localStorage key through this module, so no
 * navigation, auto-quantity or implicit selection can creep back in.
 */
import { items } from './data';

export const STORAGE_KEY = 'nilebed-order-v1';

/** `selected` keeps the draft compatible with the guided /order review step. */
export type Line = { selected: boolean; qty: string; note: string };
export type Contact = { name: string; company: string; phone: string; notes: string };
export type Draft = {
  order: Record<string, Line>;
  contact: Contact;
  reference: string;
};

export const emptyContact: Contact = { name: '', company: '', phone: '', notes: '' };
const validIds = new Set(items.map((it) => it.id));

export function emptyLine(): Line {
  return { selected: true, qty: '', note: '' };
}

/** A short, human-readable order reference kept with the local draft. */
export function makeReference(): string {
  const d = new Date();
  const day = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const suffix = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0');
  return `NB-${day}-${suffix}`;
}

export function blankDraft(): Draft {
  return { order: {}, contact: { ...emptyContact }, reference: makeReference() };
}

function asLine(value: unknown): Line | null {
  if (!value || typeof value !== 'object') return null;
  const v = value as Record<string, unknown>;
  return {
    // Presence of a line always means the item is selected; writing the flag
    // explicitly keeps older drafts readable by the guided /order review step.
    selected: true,
    qty: typeof v.qty === 'string' ? v.qty.slice(0, 24) : '',
    note: typeof v.note === 'string' ? v.note.slice(0, 300) : '',
  };
}

/** Read the draft defensively: unknown/removed catalog ids are dropped. */
export function readDraft(): Draft {
  if (typeof window === 'undefined') return blankDraft();
  let draft = blankDraft();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Draft> | null;
      if (parsed?.order && typeof parsed.order === 'object') {
        for (const [id, value] of Object.entries(parsed.order)) {
          if (!validIds.has(id)) continue;
          const line = asLine(value);
          if (line) draft.order[id] = line;
        }
      }
      if (parsed?.contact && typeof parsed.contact === 'object') {
        const c = parsed.contact as Partial<Contact>;
        for (const key of ['name', 'company', 'phone', 'notes'] as const) {
          if (typeof c[key] === 'string') draft.contact[key] = c[key].slice(0, 500);
        }
      }
      if (typeof parsed?.reference === 'string' && parsed.reference.trim()) {
        draft.reference = parsed.reference.slice(0, 40);
      }
    }
  } catch {
    /* private mode / stale value — start clean */
  }
  return draft;
}

export function writeDraft(draft: Draft): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    /* storage full or disabled — the in-memory state still works */
  }
}

export function pickedIds(draft: Draft): string[] {
  return Object.keys(draft.order).filter((id) => validIds.has(id));
}

/** Add/remove a preliminary selection. Never assigns a quantity. */
export function togglePicked(draft: Draft, id: string): Draft {
  if (!validIds.has(id)) return draft;
  const order = { ...draft.order };
  if (Object.prototype.hasOwnProperty.call(order, id)) {
    delete order[id];
  } else {
    order[id] = emptyLine();
  }
  return { ...draft, order };
}

/** Backwards-compatible deep link: records the item only, with an empty qty. */
export function pickWithoutQuantity(draft: Draft, id: string): Draft {
  if (!validIds.has(id)) return draft;
  if (Object.prototype.hasOwnProperty.call(draft.order, id)) return draft;
  return { ...draft, order: { ...draft.order, [id]: emptyLine() } };
}
