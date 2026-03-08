'use client';

import { useState, useMemo } from 'react';

type ScheduledPost = {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  title: string;
  content?: string;
};

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 6h à 22h
const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function formatDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function getWeekDates(weekStart: Date): Date[] {
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function getWeekStart(d: Date): Date {
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Lundi = début de semaine
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export default function CalendrierPage() {
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [events, setEvents] = useState<ScheduledPost[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ScheduledPost | null>(null);
  const [formData, setFormData] = useState({ date: '', time: '09:00', title: '' });

  const weekDates = useMemo(() => getWeekDates(weekStart), [weekStart]);

  const goPrevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  };

  const goNextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };

  const goToday = () => {
    setWeekStart(getWeekStart(new Date()));
  };

  const openModal = (date?: string, hour?: number) => {
    setEditingEvent(null);
    const d = date || formatDateKey(weekDates[0]);
    const t = hour !== undefined ? `${hour.toString().padStart(2, '0')}:00` : '09:00';
    setFormData({ date: d, time: t, title: '' });
    setModalOpen(true);
  };

  const openEditModal = (e: ScheduledPost) => {
    setEditingEvent(e);
    setFormData({ date: e.date, time: e.time, title: e.title });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEvent(null);
  };

  const saveEvent = () => {
    if (!formData.title.trim()) return;
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id
            ? { ...ev, ...formData, time: formData.time }
            : ev
        )
      );
    } else {
      setEvents((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          date: formData.date,
          time: formData.time,
          title: formData.title.trim(),
        },
      ]);
    }
    closeModal();
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    closeModal();
  };

  const getEventsForSlot = (dateKey: string, hour: number) => {
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    return events.filter(
      (e) => e.date === dateKey && e.time.startsWith(`${hour.toString().padStart(2, '0')}:`)
    );
  };

  const weekLabel = () => {
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 6);
    return `${weekStart.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} – ${end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Calendrier</h1>
        <p className="text-neutral-600">Planifie tes publications LinkedIn.</p>
      </div>

      {/* Navigation */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrevWeek}
            className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNextWeek}
            className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            ›
          </button>
          <button
            type="button"
            onClick={goToday}
            className="ml-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Aujourd&apos;hui
          </button>
          <span className="ml-4 font-semibold text-neutral-800">{weekLabel()}</span>
        </div>
        <button
          type="button"
          onClick={() => openModal()}
          className="rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2d6ad4]"
        >
          + Nouvelle publication
        </button>
      </div>

      {/* Calendar grid */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="min-w-[700px]">
          {/* Header: time column + days */}
          <div className="grid grid-cols-[60px_1fr] border-b border-neutral-200">
            <div className="border-r border-neutral-200 bg-neutral-50 p-2 text-center text-xs font-medium text-neutral-500">
              Horaire
            </div>
            <div className="grid grid-cols-7 divide-x divide-neutral-200">
              {weekDates.map((d) => (
                <div
                  key={d.toISOString()}
                  className="p-2 text-center"
                >
                  <span className="block text-xs font-medium text-neutral-500">
                    {DAYS[d.getDay() === 0 ? 6 : d.getDay() - 1]}
                  </span>
                  <span
                    className={`block text-lg font-semibold ${
                      formatDateKey(d) === formatDateKey(new Date())
                        ? 'rounded-full bg-[#377CF3] text-white'
                        : 'text-neutral-800'
                    }`}
                  >
                    {d.getDate()}
                  </span>
                  <span className="block text-xs text-neutral-400">
                    {d.toLocaleDateString('fr-FR', { month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rows: hours */}
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-[60px_1fr] border-b border-neutral-100 last:border-b-0"
            >
              <div className="border-r border-neutral-200 bg-neutral-50/50 py-1 pr-2 text-right text-xs text-neutral-500">
                {hour}h00
              </div>
              <div className="grid grid-cols-7 divide-x divide-neutral-100">
                {weekDates.map((d) => {
                  const dateKey = formatDateKey(d);
                  const slotEvents = getEventsForSlot(dateKey, hour);
                  return (
                    <div
                      key={dateKey}
                      className="min-h-[48px] cursor-pointer p-1 hover:bg-[#377CF3]/5 transition-colors"
                      onClick={() => openModal(dateKey, hour)}
                    >
                      {slotEvents.map((ev) => (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(ev);
                          }}
                          className="mb-1 w-full rounded-lg bg-[#377CF3]/10 px-2 py-1.5 text-left text-xs font-medium text-neutral-900 hover:bg-[#377CF3]/20 truncate"
                        >
                          {ev.title}
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal création / édition */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-neutral-800">
              {editingEvent ? 'Modifier la publication' : 'Planifier une publication'}
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Choisis la date, l&apos;heure et le titre de ta publication LinkedIn.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-600">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-800 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-600">Heure</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData((p) => ({ ...p, time: e.target.value }))}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-800 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-600">Titre / sujet</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Ex : Post sur l'effectuation"
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-800 placeholder:text-neutral-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {editingEvent && (
                <button
                  type="button"
                  onClick={() => deleteEvent(editingEvent.id)}
                  className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Supprimer
                </button>
              )}
              <div className="flex-1" />
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={saveEvent}
                disabled={!formData.title.trim()}
                className="rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2d6ad4] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingEvent ? 'Enregistrer' : 'Planifier'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
