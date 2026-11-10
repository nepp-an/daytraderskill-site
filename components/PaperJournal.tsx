'use client';

import { useRef, useState } from 'react';
import { ChecklistIcon, JournalIcon } from '@/components/icons';

const CHECKLIST = [
  'I confirmed this is a paper account, not a live account.',
  'I checked the data timestamp and the current spread.',
  'I wrote the entry, invalidation, and maximum loss before the session.',
  'The position size matches my written risk budget.',
  'I know which order type I am using and why.',
  'I will record the reason for every simulated order.',
  'I will stop when my written stop-trading rule is hit.',
  'I will review the journal before changing the plan.',
];

type JournalRow = {
  id: number;
  date: string;
  plan: string;
  result: string;
  notes: string;
};

const INITIAL_ROWS: JournalRow[] = [
  { id: 1, date: '', plan: '', result: '', notes: '' },
  { id: 2, date: '', plan: '', result: '', notes: '' },
  { id: 3, date: '', plan: '', result: '', notes: '' },
];

const MAX_ROWS = 8;

export function PaperJournal() {
  const [checked, setChecked] = useState<boolean[]>(() => CHECKLIST.map(() => false));
  const [rows, setRows] = useState<JournalRow[]>(INITIAL_ROWS);
  const [status, setStatus] = useState('');
  const nextId = useRef(INITIAL_ROWS.length + 1);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function toggle(index: number) {
    setChecked((current) => current.map((value, i) => (i === index ? !value : value)));
  }

  function updateRow(id: number, field: keyof Omit<JournalRow, 'id'>, value: string) {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  }

  function addRow() {
    if (rows.length >= MAX_ROWS) return;
    setRows((current) => [
      ...current,
      { id: nextId.current++, date: '', plan: '', result: '', notes: '' },
    ]);
  }

  function removeRow(id: number) {
    setRows((current) => (current.length <= 1 ? current : current.filter((row) => row.id !== id)));
  }

  function showStatus(message: string) {
    setStatus(message);
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(''), 3000);
  }

  function template() {
    const checklistLines = CHECKLIST.map(
      (item, index) => `[${checked[index] ? 'x' : ' '}] ${item}`,
    );
    const journalLines = rows.map((row, index) => {
      const date = row.date || 'YYYY-MM-DD';
      const plan = row.plan || '—';
      const result = row.result || '—';
      const notes = row.notes || '—';
      return `${index + 1}. ${date} | Plan: ${plan} | Paper result: ${result} | Notes: ${notes}`;
    });
    return [
      'Paper session checklist — DayTraderSkill.com',
      'Paper only. No real capital. Not financial advice.',
      '',
      'CHECKLIST',
      ...checklistLines,
      '',
      'JOURNAL',
      ...journalLines,
      '',
      'Stop rule: if I cannot explain the ticket, I do not place it.',
    ].join('\n');
  }

  async function copyTemplate() {
    const text = template();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
      }
      showStatus('Copied. Paste it into your notes or print the page.');
    } catch {
      showStatus('Copy failed. Select the table text or use Print instead.');
    }
  }

  const completed = checked.filter(Boolean).length;

  return (
    <section id="paper-journal" className="paper-journal" aria-labelledby="paper-journal-title">
      <p className="eyebrow">Browser-only · no login · no market data</p>
      <h2 id="paper-journal-title">Paper session checklist and journal</h2>
      <p>
        Use this before and after a simulated session. Nothing here connects to a broker, fetches a
        quote, or places an order. Copy the template into your notes, or print the journal and write
        on it by hand.
      </p>

      <div className="journal-toolbar">
        <button className="btn small" type="button" onClick={copyTemplate}>
          <ChecklistIcon size={15} /> Copy checklist + journal
        </button>
        <button className="btn small ghost" type="button" onClick={() => window.print()}>
          <JournalIcon size={15} /> Print journal
        </button>
        <span className="journal-status" role="status" aria-live="polite">
          {status || `${completed} of ${CHECKLIST.length} checks done`}
        </span>
      </div>

      <h3>First-session checklist</h3>
      <ul className="journal-checklist">
        {CHECKLIST.map((item, index) => (
          <li key={item}>
            <label className="journal-check">
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() => toggle(index)}
                aria-label={item}
              />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>

      <h3>Journal rows</h3>
      <div className="journal-scroll">
        <table className="journal-table">
          <caption className="muted">
            Record the plan before the session and the review after it. Paper results only.
          </caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Plan / setup</th>
              <th scope="col">Paper result</th>
              <th scope="col">Notes / review</th>
              <th scope="col" className="journal-row-action">
                <span className="muted">Row</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td>
                  <input
                    type="text"
                    value={row.date}
                    onChange={(event) => updateRow(row.id, 'date', event.target.value)}
                    placeholder="YYYY-MM-DD"
                    aria-label={`Journal row ${index + 1} date`}
                  />
                </td>
                <td>
                  <textarea
                    value={row.plan}
                    onChange={(event) => updateRow(row.id, 'plan', event.target.value)}
                    placeholder="Setup, entry, invalidation, size"
                    aria-label={`Journal row ${index + 1} plan`}
                  />
                </td>
                <td>
                  <textarea
                    value={row.result}
                    onChange={(event) => updateRow(row.id, 'result', event.target.value)}
                    placeholder="Simulated fill and outcome"
                    aria-label={`Journal row ${index + 1} paper result`}
                  />
                </td>
                <td>
                  <textarea
                    value={row.notes}
                    onChange={(event) => updateRow(row.id, 'notes', event.target.value)}
                    placeholder="Did I follow the process?"
                    aria-label={`Journal row ${index + 1} notes`}
                  />
                </td>
                <td className="journal-row-action">
                  <button
                    className="btn small ghost"
                    type="button"
                    onClick={() => removeRow(row.id)}
                    disabled={rows.length <= 1}
                    aria-label={`Remove journal row ${index + 1}`}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="journal-actions">
        <button
          className="btn small"
          type="button"
          onClick={addRow}
          disabled={rows.length >= MAX_ROWS}
        >
          Add journal row
        </button>
        <button className="btn small ghost" type="button" onClick={copyTemplate}>
          Copy as text
        </button>
      </div>

      <p className="journal-note">
        <strong>Paper only.</strong> A simulator can flatter a process: fills may be optimistic and
        costs may be simplified. Do not treat a good journal week as proof that live trading would
        work. The SEC’s{' '}
        <a href="https://www.sec.gov/reportspubs/investor-publications/investorpubsdaytipshtm.html" rel="noopener noreferrer" target="_blank">
          2005 day-trading bulletin
        </a>{' '}
        warns that many traders suffer severe losses in their first months.
      </p>
    </section>
  );
}
